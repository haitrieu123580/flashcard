import React from 'react'
import {

    getUserProgressAction
} from "@/redux/user-progress/slice";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom'
import { convertDateToString, replacePathWithId } from "@/lib/utils"
import { routerPaths } from "@/routes/path"
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

const CurrentLearning = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data } = useSelector((state: any) => state.UserProgress)
    React.useEffect(() => {
        dispatch({
            type: getUserProgressAction.type,
            payload: {

            }
        })
    }, [])
    const gotoCard = (set: any) => {
        if (set?.mySet) {
            navigate(replacePathWithId(routerPaths.LEARN_MY_SET, set?.id))
            return;
        }
        else { navigate(replacePathWithId(routerPaths.LEARN_FLASHCARD, set?.id)) }
    }
    return (
        <div>
            {
                // @ts-ignore
                data?.length === 0 ? null :
                    <Card className='my-4 !bg-transparent !shadow-none border-none'>
                        <CardTitle className='my-4 text-blue-500 px-4'>Recent</CardTitle>
                        <CardContent className='mt-4'>
                            <Carousel>
                                <CarouselContent>
                                    {Array.isArray(data) && data.map((item: any, index: number) => {
                                        return (
                                            <CarouselItem key={index} className="basis-1/1 sm:basis-1/1 md:basis-1/3" onClick={() => {
                                                gotoCard(item?.set)
                                            }}>
                                                <Card className='cursor-pointer'>
                                                    <CardHeader>
                                                        <CardTitle className=''>{item?.set?.name}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="overflow-hidden rounded-md ">
                                                            <AspectRatio
                                                                ratio={2 / 2}
                                                                className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square "
                                                            >
                                                                {
                                                                    !item?.set?.image
                                                                        ? <div className="w-full h-full bg-slate-100 flex justify-center items-center text-white text-2xl"></div>
                                                                        : <img src={item?.set?.image} alt="set" className="w-full h-full max-w-full max-h-full object-cover" />
                                                                }

                                                            </AspectRatio>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className='w-full flex flex-col'>
                                                        <div className='w-full'>
                                                            <div className='flex justify-end items-end w-full'>{Math.floor(item?.progressPercentage)}%</div>
                                                            <Progress value={item?.progressPercentage} className='w-full h-2' />
                                                        </div>
                                                        <div className='flex gap-2 w-full my-4'>
                                                            <Avatar>
                                                                <AvatarImage src={item?.set?.user?.avatar} className="object-cover" />
                                                                <AvatarFallback>{item?.set?.username?.toString()?.[0]}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap block">{item?.set?.created_by}</span>
                                                                <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap block">{convertDateToString(item?.set?.created_at)}</span>
                                                            </div>
                                                        </div>

                                                    </CardFooter>
                                                </Card>
                                            </CarouselItem>
                                        )
                                    })
                                    }
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </CardContent>
                    </Card>
            }

        </div >
    )
}

export default CurrentLearning