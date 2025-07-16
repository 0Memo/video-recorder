import Header from "@/components/Header";


const Page = async ({ params } : ParamsWithSearch) => {
    const { id } = await params;
    
    return (
        <div className="wrapper page">
                <Header
                    title="Guillermo | Web Developer"
                    subHeader="guillaume.mehats@gmail.com"
                    userImg="/assets/images/test.png"
                />
                <h1 className="text-2xl font-karla ">
                    User ID: {id}
                </h1>
        </div>
    )
}

export default Page