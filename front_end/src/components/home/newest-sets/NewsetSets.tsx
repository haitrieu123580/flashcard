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

const NewsetSets = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-end">
                        <span>Newest Sets</span>
                        <Button variant={"link"} className="p-0 h-fit text-cyan-900 dark:text-rose-500">
                            <Link to={routerPaths.PUBLIC_SETS}>See more</Link>
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem className="basis-1/5"><SetItem /></CarouselItem>
                            <CarouselItem className="basis-1/5"><SetItem /></CarouselItem>
                            <CarouselItem className="basis-1/5"><SetItem /></CarouselItem>
                            <CarouselItem className="basis-1/5"><SetItem /></CarouselItem>
                            <CarouselItem className="basis-1/5"><SetItem /></CarouselItem>
                            <CarouselItem className="basis-1/5"><SetItem /></CarouselItem>

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