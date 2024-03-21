import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

const Banner = (props: any) => {
    const { isReverse, data } = props
    return (
        <div>
            <div className="w-full grid grid-cols-12 h-auto items-center">
                {!isReverse
                    ? (<>
                        <div className="col-span-6 h-full flex items-center">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{data?.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {data?.description}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-span-2"></div>
                        <div className="overflow-hidden rounded-md col-span-4">
                            <AspectRatio
                                ratio={3 / 4}
                                className="h-auto w-auto object-cover transition-all hover:scale-105 flex items-center "
                            >
                                <img src={data?.image} />
                            </AspectRatio>
                        </div>
                    </>)
                    : (<>
                        <div className="overflow-hidden rounded-md col-span-4">
                            <AspectRatio
                                ratio={3 / 4}
                                className="h-auto w-auto object-cover transition-all hover:scale-105 flex items-center"
                            >
                                <img src={data?.image} />
                            </AspectRatio>
                        </div>
                        <div className="col-span-2"></div>
                        <div className="col-span-6 h-full flex items-center">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{data?.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {data?.description}
                                </CardContent>
                            </Card>
                        </div>
                    </>)}

            </div>
        </div >
    )
}

export default Banner
