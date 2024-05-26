import FlipCard from "@/components/flash-card/FlipCard"
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, NotebookPen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SentencesExampleBox from "@/components/flash-card/SentencesExampleBox";
import NewsetSets from "@/components/home/newest-sets/NewsetSets";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replacePathWithId, speek } from "@/lib/utils";
import { routerPaths } from "@/routes/path";
import LoadingPopup from "@/components/common/loading/loading-popup/LoadingPopup";
import { Progress } from "@/components/ui/progress"
import {
    getUserSetsListAction,
    addCardToMySetAction,
    getUserSetByIdAction,
} from '@/redux/user-sets/slice';
import {
    getUserLearningSetProgressAction,
    updateUserProgressAction
} from "@/redux/user-progress/slice";
import { Separator } from "@/components/ui/separator";

const LearnFlashcard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [currentCard, setCurrentCard] = useState(0);
    // const { data, isLoading } = useSelector((state: any) => state.Set);
    const { mySets, set, isLoading } = useSelector((state: any) => state.UserSets)
    const { progress } = useSelector((state: any) => state.UserProgress)
    console.log("progress", progress)
    useEffect(() => {
        if (id) {
            getSetById(id);
        }
    }, [id])

    const getSetById = (id: string) => {
        setCurrentCard(0);
        scrollTo(0, 0);
        dispatch({
            type: getUserSetByIdAction.type,
            payload: {
                id: id,
                // onSuccess: () => {
                // },
                // onError: (error: string) => {
                // }
            }
        })
        dispatch({
            type: getUserLearningSetProgressAction.type,
            payload: {
                data: {
                    setId: id
                }
            }
        })
    }
    const getUserSetsList = () => {
        dispatch({
            type: getUserSetsListAction.type,
        })
    }
    useEffect(() => {
        if (mySets.length === 0) {
            getUserSetsList()
        }
    }, [mySets])

    const showCard = (index: number) => {
        if (index >= set?.cards?.length || index < 0) {
            return;
        }
        setCurrentCard(index);
    }
    const onFlip = (card: any) => {
        dispatch({
            type: updateUserProgressAction.type,
            payload: {
                data: {
                    setId: id,
                    cardId: card?.id
                }
            }
        })
    }
    return (
        <div>
            <LoadingPopup
                open={isLoading}
            />
            <Card className="w-full min-h-[500px]  p-10 flex flex-col justify-between border-none shadow-none">
                <CardTitle className="flex gap-2 items-end justify-between my-4">
                    <span>{set?.name}</span>
                    <Link to={replacePathWithId(routerPaths.TEST_MULTIPLE_CHOICE, String(id))} className="hover:cursor-pointer flex items-center gap-2"><NotebookPen /> Do the test</Link>
                </CardTitle>
                {Array.isArray(set?.cards) && set?.cards?.length ? set?.cards.map((card: any, index: number) => {
                    return (<>
                        {currentCard === index
                            && <>
                                <CardContent className="w-full h-full md:h-1/2 p-0 grid grid-cols-1 md:grid-cols-6 gap-1">
                                    <div className="col-span-1 md:col-span-3 flex flex-col gap-2 h-fit">

                                        <FlipCard key={index} onFlip={onFlip} card={card} />
                                    </div>
                                    <div className="col-span-1"></div>
                                    <div className="col-span-1 md:col-span-2">
                                        <SentencesExampleBox example={card?.example} />
                                    </div>
                                </CardContent>
                                <CardFooter className="grid grid-cols-1 md:grid-cols-6 gap-1">
                                    <div className="col-span-1 md:col-span-3 flex justify-end gap-6 items-center">
                                        <Button variant={"ghost"} onClick={(e) => {
                                            e.preventDefault();
                                            showCard(index - 1)

                                        }}><ChevronLeft /></Button>
                                        <span>{`${currentCard + 1}/${set?.cards?.length}`}</span>
                                        <Button variant={"ghost"} onClick={(e) => {
                                            e.preventDefault();
                                            showCard(index + 1)
                                        }}><ChevronRight /></Button>
                                    </div>
                                    <div className="col-span-3"></div>
                                </CardFooter>
                            </>}
                    </>)

                }) : <>
                    <CardContent className="w-full h-full md:h-1/2 p-0 grid grid-cols-1 md:grid-cols-6 gap-1">
                        <div className="col-span-1 md:col-span-3 flex flex-col gap-2 h-fit">
                            <div className="flex justify-end hover:cursor-pointer">
                            </div>
                        </div>
                        <div className="col-span-1">
                            Set is empty !!!
                        </div>
                    </CardContent>

                </>}
                <div className="w-full flex justify-between gap-2">
                    <span></span><Progress value={progress?.progressPercentage || 0} className="w-[90%] h-2" /> <span>{progress?.progressPercentage}%</span>
                </div>
            </Card>

            <div className=" m-8">
                <CardTitle className="text-blue-400">{`Not studied (${set?.cards?.length - progress?.studiedCards?.length})`}</CardTitle>
                <div className="grid grid-cols-3">
                    {
                        Array.isArray(set?.cards) && set?.cards?.filter((card: any) => !progress?.studiedCards?.includes(card?.id)).map((card: any) => {
                            return (
                                <Card className="my-4 w-fit col-span-1">
                                    <CardTitle></CardTitle>
                                    <CardContent className="w-fit mt-4" >
                                        <div className="flex h-5 items-center space-x-4 w-fit">
                                            <div>{card?.term}</div>
                                            <Separator orientation="vertical" />
                                            <div>{card?.define}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>

            <div className="mt-10">
                <NewsetSets />
            </div>
        </div>
    )
}

export default LearnFlashcard