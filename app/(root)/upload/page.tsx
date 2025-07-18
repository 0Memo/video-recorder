import FileInput from '@/components/FileInput'
import FormField from '@/components/FormField'
import React from 'react'

const page = () => {
    return (
        <main className='wrapper-md upload-page'>
            <h1 className='text-shadow-lg text-[#1d073a]'>Upload a video</h1>
            <FormField />
            <FileInput />
        </main>
    )
}

export default page