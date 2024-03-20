import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { _testAction } from "@/redux/test/slice";
import { toast } from "@/components/ui/use-toast";
const Home = () => {
    const dispath = useDispatch();
    const { isTest, message } = useSelector((state: any) => state.Test);
    const onClick = () => {
        dispath(_testAction());
        // ShowToastify.showErrorToast("Test");
        toast({
            // duration: 500,
            variant: 'default',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
        })
    }
    return (
        <div>
            Home
            <div>
                <Button onClick={onClick}>Test redux</Button>
            </div>
            {isTest && <div>{message}</div>}
        </div>
    )
}

export default Home
