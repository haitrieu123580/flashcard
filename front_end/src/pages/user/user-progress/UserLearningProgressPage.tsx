import React from 'react'
import {

    getUserProgressAction
} from "@/redux/user-progress/slice";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from '@/components/ui/badge';

const UserLearningProgressPage = () => {
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
            <CardTitle className='my-4 text-sky-500 dark:text-primary'>Your learning progress</CardTitle>

            {
                // @ts-ignore

                data?.length === 0 ? null :
                    <>
                        {Array.isArray(data) && data.map((item: any, index: number) => {
                            return (
                                <Card className='cursor-pointer w-full my-6' onClick={() => {
                                    gotoCard(item?.set)
                                }}>
                                    <CardHeader className='grid grid-cols-12 gap-4'>
                                        <div className='col-span-3'>
                                            <AspectRatio
                                                ratio={4 / 3}
                                                className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square "
                                            >
                                                {
                                                    !item?.set?.image
                                                        ? <div className="w-full h-full bg-slate-100 flex justify-center items-center"></div>
                                                        : <img src={item?.set?.image} alt="set" className="max-w-full max-h-full object-cover" />
                                                }

                                            </AspectRatio>
                                        </div>
                                        <div className='col-span-9 space-y-3'>
                                            <CardTitle>
                                                <div>{item?.set?.name}</div>

                                            </CardTitle>
                                            <CardDescription className=' space-y-3'>
                                                <Badge variant="default">{`${item?.set?.cards?.length} cards`}</Badge>
                                                <div>{item?.set?.description}</div>
                                            </CardDescription>
                                        </div>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="overflow-hidden rounded-md ">

                                        </div>
                                        <div className='flex justify-end items-end w-full'>
                                            <span className='text-sky-500 font-bold'>{Math.floor(item?.progressPercentage)}%</span>
                                        </div>
                                        <Progress value={item?.progressPercentage} className='w-full h-3' />
                                    </CardContent>
                                    <CardFooter className='w-full flex flex-col my'>
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
                            )
                        })
                        }
                    </>
            }

        </div >
    )
}

export default UserLearningProgressPage