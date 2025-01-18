import { IoIosTrash } from 'react-icons/io'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Input from '../components/Input'
import { useQuery, useMutation } from '@tanstack/react-query'
import { IconContext } from 'react-icons'
import Heading from '../components/Heading'

const Home = () => {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')

  const mutationAddEntry = useMutation((newTodo) => addTodo(newTodo))
  const mutationDeleteEntry = useMutation((id) => deleteTodo(id))

  const fetchData = async () => {
    const result = await fetch(
      `${process.env.CONTENTFUL_CDN}/spaces/${process.env.SPACE_ID}/environments/master/entries` +
        `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=todo`
    ).then((response) => response.json())

    return result
  }

  const addTodo = async (newTodo) => {
    const entry = uuidv4()
    const result = await fetch(
      `${process.env.HOST}/spaces/${process.env.SPACE_ID}/environments/master/entries/${entry}`,
      {
        method: 'PUT',
        body: JSON.stringify(newTodo),
        headers: {
          'X-Contentful-Content-Type': 'todo',
          'X-Contentful-Version': 1,
          Authorization: `Bearer ${process.env.CMA_ACCESS_TOKEN}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.ok
        } else {
          throw new Error('Adding a new todo has failed.')
        }
      })
      .catch((error) => console.log(`An error has occured: ${error}`))

    if (result) {
      await fetch(`${process.env.HOST}/spaces/${process.env.SPACE_ID}/environments/master/entries/${entry}/published`, {
        method: 'PUT',
        headers: {
          'X-Contentful-Content-Type': 'todo',
          'X-Contentful-Version': 1,
          Authorization: `Bearer ${process.env.CMA_ACCESS_TOKEN}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            refetch()
          } else {
            throw new Error('Publishing the added todo has failed.')
          }
        })
        .catch((error) => console.log(`An error has occured: ${error}`))
    } else {
      console.log('Adding of a new recipe has failed massively. Do something!')
    }
    setName('')
    setUrl('')
  }

  const deleteTodo = async (e) => {
    let entry
    if (e.target.parentNode.tagName == 'svg') {
      entry = e.target.parentNode.parentNode.id
    } else {
      entry = e.target.parentNode.id
    }
    const result = await fetch(
      `${process.env.HOST}/spaces/${process.env.SPACE_ID}/environments/master/entries/${entry}/published`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.CMA_ACCESS_TOKEN}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.ok
        } else {
          throw new Error('Unpublishing of the entry has failed.')
        }
      })
      .catch((error) => console.log(`An error has occured while unpublishing entry: ${error}`))

    if (result) {
      await fetch(`${process.env.HOST}/spaces/${process.env.SPACE_ID}/environments/master/entries/${entry}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.CMA_ACCESS_TOKEN}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            refetch()
          } else {
            throw new Error('Deletion of the todo has failed.')
          }
        })
        .catch((error) => console.log(`Error has occured while deleting entry: ${error}`))
    } else {
      console.log('The unpublishing of the entry has failed, do something!')
    }
  }

  const { isLoading, isError, data, error, refetch } = useQuery({ queryKey: ['data'], queryFn: fetchData })

  return (
    <div className='bg-kitchen-design bg-cover bg-center p-6 flex flex-col items-center'>
      <IconContext.Provider value={{ style: { width: '1.5em', height: '1.5em', color: 'white' } }}>
        <div className='flex flex-col justify-center min-h-screen gap-4 max-w-[600px] items-center  bg-white/30 rounded-3xl backdrop-blur-sm border border-zinc-100 p-2 md:p-8 mt-10'>
          <Heading title='Add new recipe to the list' />
          <div className='flex flex-col gap-4 w-full'>
            <Input name='name' onChange={setName} value={name} label='Name:' />
            <Input name='url' onChange={setUrl} value={url} label='Link:' />
            <button
              className='p-4 mt-3 bg-white/20 rounded-full font-semibold uppercase tracking-[2px] flex justify-center items-center text-white'
              onClick={() => mutationAddEntry.mutate({ fields: { name: { 'en-US': name }, url: { 'en-US': url } } })}
            >
              Add recipe to the list
            </button>
          </div>
          <h2 className='text-xl md:text-2xl text-white font-semibold font-playfair my-6 uppercase'>
            Recipes to be added:
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error: {error.message}</p>
          ) : data.items.length > 0 ? (
            data.items.map((item, index) => {
              return (
                <div key={index} className='flex w-full' id={item.sys.id}>
                  <a
                    href={item.fields.url}
                    className='text-white pb-2 border-b border-white w-full font-semibold text-lg'
                  >
                    {item.fields.name}
                  </a>
                  <IoIosTrash onClick={(e) => mutationDeleteEntry.mutate(e)} />
                </div>
              )
            })
          ) : (
            <p>There are no recipes to add atm.</p>
          )}
        </div>
      </IconContext.Provider>
    </div>
  )
}

export default Home
