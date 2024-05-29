import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

const Banner = (props: any) => {
    const { isReverse, data } = props
    return (
        <div className="my-8">
            <div className="w-full grid grid-cols-1 py-6 md:py-0 md:grid-cols-12 h-auto items-start ">
                {!isReverse
                    ? (<>
                        <div className="col-span-1 md:col-span-6 h-full flex items-start">
                            <Card className="bg-transparent border-none shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-blue-500">{data?.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="bg-background p-8 rounded-sm dark:bg-inherit">
                                    {data?.description}
                                </CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        </div>
                        <div className="hidden md:block col-span-2"></div>
                        <div className="col-span-1 md:col-span-4 overflow-hidden rounded-md">
                            <AspectRatio
                            // ratio={3 / 4}
                            // className="object-contain transition-all hover:scale-105 flex items-center justify-center w-full"
                            >
                                <img src={data?.image} className="transition-all hover:scale-105 object-cover" />
                            </AspectRatio>
                        </div>
                    </>)
                    : (<>
                        <div className="col-span-1 md:col-span-4 overflow-hidden rounded-md">
                            <AspectRatio
                            // ratio={3 / 4}
                            // className="object-cover transition-all hover:scale-105 flex items-center justify-center w-full h-full"
                            >
                                <img src={data?.image} className="w-full h-full object-cover" />
                            </AspectRatio>
                        </div>
                        <div className="hidden md:block col-span-2"></div>
                        <div className="col-span-1 md:col-span-6 h-full flex items-start">
                            <Card className="bg-transparent border-none shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-blue-500">{data?.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="bg-background p-8 rounded-sm dark:bg-inherit">
                                    {data?.description}
                                </CardContent>
                                <CardFooter></CardFooter>

                            </Card>
                        </div>
                    </>)}

            </div>
        </div >
    )
}

export default Banner
