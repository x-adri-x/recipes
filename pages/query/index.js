import { useQuery, useMutation, QueryClient, setQueryData } from "@tanstack/react-query"
import styles from '../../styles/TodoList.module.css'
import { IoIosTrash } from 'react-icons/io'


const queryClient = new QueryClient()

const Query = () => {

    const mutation = useMutation((e) => deleteTodo(e))
    
    const deleteTodo = async(e) => {
        let entry
        if(e.target.parentNode.tagName == 'svg') {
            entry = e.target.parentNode.parentNode.id
        } else {
            entry = e.target.parentNode.id
        }
        await unPublish(entry)
        
        await fetch(`${process.env.HOST}/spaces/${process.env.SPACE_ID}/environments/master/entries/${entry}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${process.env.CMA_ACCESS_TOKEN}`, 
            },
        })
        refetch()
        
        // await fetch(`${process.env.HOST}/spaces/${process.env.SPACE_ID}/environments/master/entries/${entry}/published`, {
        //     method: 'DELETE',
        //     headers: {
        //       'Authorization': `Bearer ${process.env.CMA_ACCESS_TOKEN}`, 
        //   },
        //   })
        //   .then((response) => {
        //     if(response.ok){
        //       return response.json()
        //     } else {
        //       throw new Error('Failed to fetch data.')
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })

        //   await fetch(`${process.env.HOST}/spaces/${process.env.SPACE_ID}/environments/master/entries/${entry}`, {
        //     method: 'DELETE',
        //     headers: {
        //       'Authorization': `Bearer ${process.env.CMA_ACCESS_TOKEN}`, 
        //   },
        //   })
        //   .then((response) => {
        //     if(response.ok){
        //       return response.json()
        //     } else {
        //       throw new Error('Failed to fetch data.')
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
    }

    const unPublish = async(entry) => {
        

        await fetch(`${process.env.HOST}/spaces/${process.env.SPACE_ID}/environments/master/entries/${entry}/published`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${process.env.CMA_ACCESS_TOKEN}`, 
            },
        })
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error('Failed to fetch data.')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }


    const {isLoading, isError, data, error, refetch} = useQuery(['data'], () => fetch(`${process.env.CONTENTFUL_CDN}/spaces/${process.env.SPACE_ID}/environments/master/entries`
    + `?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=todo`).then(response => response.json()))
    
    if(isLoading){
        return <p>Loading...</p>
    }
    if(isError){
        return <p>Error: {error.message}</p>
    }
    return(
        <div>
            {data.items.length > 0 
            ? 
            data.items.map((item, index) => {
                return (
                    <div key = {index} className = {styles.container} id = {item.sys.id}>
                        <a href = {item.fields.url}>{item.fields.name}</a>
                        <IoIosTrash size = '2em' onClick = {(e) => mutation.mutate(e)}/>
                    </div>)
            }
            )
            : <p>There are no recipes to add atm.</p>
            }
        </div>
    )
}

export default Query