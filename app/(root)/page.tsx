import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import React from 'react'

const Page = () => {
  const createdAt = new Date("2025-05-01T06:25:54.437");

  return (
    <main className="wrapper page">
      <Header title="All videos" subHeader="Public Library" />
      <h1 className="text-2xl font-karla text-shadow-lg">Welcome to MemoCast</h1>
      <VideoCard
        id="1"
        title="SnapChat Message - 30 June 2025"
        thumbnail="/assets/samples/thumbnail(1).png"
        createdAt={createdAt}
        userImg="/assets/images/test.png"
        username="Guillermo"
        views={10}
        visibility="public"
        duration={156}
      />
    </main>
  );
}

export default Page