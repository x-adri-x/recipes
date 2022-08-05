import styles from '../styles/404.module.css'
import Image from 'next/image'
import dinosaurImage from '../public/404_redirect_image.png'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Custom404() {
    const Router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            Router.push('/main')
        }, 3000)
    })

    return (
      <div className = {styles.container}>
          <div className = {styles.content}>
              <div>
                <h1>404 - Page not found</h1>
                <p>Oops, looks like you&apos;re lost, let me redirect you in a few seconds ...</p>
                <Image src = {dinosaurImage} alt = 'running dinosaur'/>
              </div>
          </div>
      </div> 
    )
  }