import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

const Banner = (props: any) => {
    const { isReverse, data } = props
    return (
        <div>
            <div className="w-full grid grid-cols-1 py-6 md:py-0 md:grid-cols-12 h-auto items-center">
                {!isReverse
                    ? (<>
                        <div className="col-span-1 md:col-span-6 h-full flex items-center">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{data?.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {data?.description}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="hidden md:block col-span-2"></div>
                        <div className="col-span-1 md:col-span-4 overflow-hidden rounded-md">
                            <AspectRatio
                                // ratio={3 / 4}
                                className="object-contain transition-all hover:scale-105 flex items-center justify-center w-full"
                            >
                                <img src={data?.image} className="aspect-square" />
                            </AspectRatio>
                        </div>
                    </>)
                    : (<>
                        <div className="col-span-1 md:col-span-4 overflow-hidden rounded-md">
                            <AspectRatio
                                // ratio={3 / 4}
                                className="object-contain transition-all hover:scale-105 flex items-center justify-center w-full"
                            >
                                <img src={data?.image} />
                            </AspectRatio>
                        </div>
                        <div className="hidden md:block col-span-2"></div>
                        <div className="col-span-1 md:col-span-6 h-full flex items-center">
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
