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
import { convertDateToString, replacePathWithId, setColorLevel } from "@/lib/utils"
import { routerPaths } from "@/routes/path"
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Badge } from '@/components/ui/badge';
import Constants from '@/lib/Constants';

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
                data?.length === 0 ? null :
                    <>
                        {Array.isArray(data) && data.map((item: any, index: number) => {
                            return (
                                <Card className='cursor-pointer w-full my-6' onClick={() => {
                                    gotoCard(item?.set)
                                }}>
                                    <CardHeader >


                                    </CardHeader>
                                    <CardContent>
                                        <div className='grid grid-cols-12 gap-4'>
                                            <div className='col-span-3'>
                                                <img src={item?.set?.image} alt="set" className="max-w-full max-h-full object-cover" />
                                            </div>
                                            <div className='col-span-9 space-y-3'>
                                                <CardTitle>
                                                    <div>{item?.set?.name}</div>
                                                </CardTitle>
                                                <CardDescription className=' space-y-3'>
                                                    <div className='space-x-3'>
                                                        <Badge variant="default">{`${item?.set?.cards?.length} cards`}</Badge>
                                                        {item?.set?.level &&
                                                            <Badge
                                                                className={setColorLevel(Constants.LEVEL[item?.set?.level as number as 0 | 1 | 2 | 3].toString())}
                                                            >
                                                                {Constants.LEVEL[item?.set?.level as number as 0 | 1 | 2 | 3]?.toString()}
                                                            </Badge>
                                                        }
                                                    </div>
                                                    <div>{item?.set?.description}</div>
                                                </CardDescription>
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
                                            </div>
                                        </div>

                                    </CardContent>
                                    <CardFooter className='w-full flex flex-col'>
                                        <div className='flex justify-end items-end w-full'>
                                            <span className='text-sky-500 font-bold'>{Math.floor(item?.progressPercentage)}%</span>
                                        </div>
                                        <Progress value={item?.progressPercentage} className='w-full h-3' />

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