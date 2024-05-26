import NewsetSets from "@/components/home/newest-sets/NewsetSets";
import Banner from "@/components/home/banner/Banner";
import { homePageData } from "@/lib/Data";
import CurrentLearning from "@/components/current-learning/CurrentLearning";
const Home = () => {
    return (
        <div>
            <CurrentLearning />
            <NewsetSets />
            {
                homePageData.map((data, index) => (
                    <div className="my-6" key={index}>
                        {index % 2 === 0
                            ? (
                                <> <Banner data={data} /></>
                            )
                            : (<><Banner isReverse={true} data={data} /> </>)}
                    </div>
                ))
            }
        </div >
    )
}

export default Home
