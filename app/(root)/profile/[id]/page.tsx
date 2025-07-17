import VideoCard from "../../../../components/VideoCard";
import Header from "../../../../components/Header";
import { dummyCards } from "../../../../constants";


const Page = async ({ params } : ParamsWithSearch) => {
    const { id } = await params;
    
    return (
        <div className="wrapper page">
                <Header
                    title="Guillermo | Web Developer"
                    subHeader="guillaume.mehats@gmail.com"
                    userImg="/assets/images/test.png"
                />

                <section className="video-grid">
                    {dummyCards.map((card) => (
                        <VideoCard key={card.id} {...card} />
                    ))}
                </section>
        </div>
    )
}

export default Page