import VideoCard from "../../../../components/VideoCard";
import Header from "../../../../components/Header";
import { dummyCards } from "../../../../constants";


const Page = async ({ params } : ParamsWithSearch) => {
    const { id } = await params;
    
    return (
        <div
            className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8
            flex flex-col min-h-screen pt-12.5 pb-20 gap-9"
        >
                <Header
                    title="Guillermo | Web Developer"
                    subHeader="guillaume.mehats@gmail.com"
                    userImg="/assets/images/test.png"
                />

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {dummyCards.map((card) => (
                        <VideoCard key={card.id} {...card} />
                    ))}
                </section>
        </div>
    )
}

export default Page