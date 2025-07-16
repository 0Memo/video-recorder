import Header from '@/components/Header'
import React from 'react'

const Page = () => {
  return (
    <main
      className='wrapper page'
    >
      <Header
        title="All videos"
        subHeader="Public Library" 
      />
      <h1
        className="text-2xl font-karla"
      >
        Welcome to MemoCast
      </h1>
    </main>
  )
}

export default Page