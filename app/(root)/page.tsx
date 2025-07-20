import Header from '../../components/Header'
import VideoCard from '../../components/VideoCard'
import { dummyCards } from '../../constants';

const Page = () => {

  return (
    <main className="wrapper page">
      <Header title="All videos" subHeader="Public Library" />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
    </main>
  );
}

export default Page