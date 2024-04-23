import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SetItem from "./SetItem"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router-dom"
import { routerPaths } from "@/routes/path"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDispatch, useSelector } from 'react-redux';
import { getAllSetsAction } from '@/redux/public-sets/slice'
import Constants from "@/lib/Constants"
import { useNavigate } from 'react-router-dom'
import { replacePathWithId } from "@/lib/utils"

const NewsetSets = (props: any) => {
    const { className } = props
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state: any) => state.Sets)
    const getSets = () => {
        dispatch({
            type: getAllSetsAction.type,
            payload: {
                page_size: 6,
                page_index: 1,
                filter: Constants.SORT_BY[0].key,
            }
        })
    }
    useEffect(() => {
        getSets()
    }, [])
    const gotoCard = (id: string = "") => {
        navigate(replacePathWithId(routerPaths.LEARN_FLASHCARD, id))
    }
    return (
        <>
            <Card className={cn("w-full h-full", className)}>
                <CardHeader>
                    <CardTitle className="flex justify-between items-end">
                        <span>Lastest Sets</span>
                        <Button variant={"link"} className="p-0 h-fit text-cyan-900 dark:text-rose-500">
                            <Link to={routerPaths.PUBLIC_SETS}>See more</Link>
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Carousel>
                        <CarouselContent>
                            {Array.isArray(data) && data.map((set, index) => {
                                return <CarouselItem key={index} className="basis-1/1 sm:basis-1/2 md:basis-1/5"><SetItem data={set} onClick={gotoCard} /></CarouselItem>
                            })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </CardContent>
            </Card>
        </>

    )
}

export default NewsetSets