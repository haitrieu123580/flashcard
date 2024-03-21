import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { _testAction } from "@/redux/test/slice";
import { toast } from "@/components/ui/use-toast";
import NewsetSets from "@/components/home/newest-sets/NewsetSets";
import Banner from "@/components/home/banner/Banner";
import { homePageData } from "@/utils/Data";
import { Separator } from "@/components/ui/separator";
const Home = () => {
    const dispath = useDispatch();

    return (
        <div>
            <NewsetSets />
            {
                homePageData.map((data, index) => (
                    <div className="my-6" key={index}>
                        <Separator />
                        {index % 2 === 0
                            ? (
                                <> <Banner data={data} /></>
                            )
                            : (<><Banner isReverse={true} data={data} /> </>)}
                    </div>
                ))
            }
            {/* <div className="my-2">
                <Banner />
            </div>
            <div className="my-2">
                <Banner isReverse={true} />
            </div> */}
        </div >
    )
}

export default Home
