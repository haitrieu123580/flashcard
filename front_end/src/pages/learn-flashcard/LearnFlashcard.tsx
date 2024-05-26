import FlipCard from "@/components/flash-card/FlipCard"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume1 } from 'lucide-react';
import { ChevronLeft, ChevronRight, NotebookPen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SentencesExampleBox from "@/components/flash-card/SentencesExampleBox";
import NewsetSets from "@/components/home/newest-sets/NewsetSets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetByIdAction } from "@/redux/set/slice";
import { convertDateToString, replacePathWithId, speek } from "@/lib/utils";
import { routerPaths } from "@/routes/path";
import LoadingSpinner from "@/components/common/loading/loading-spinner/LoadingSpinner";
import LoadingPopup from "@/components/common/loading/loading-popup/LoadingPopup";
import { Progress } from "@/components/ui/progress"

import {
    getUserSetsListAction,
    addCardToMySetAction,
} from '@/redux/user-sets/slice';
import { getUserLearningSetProgressAction, updateUserProgressAction } from "@/redux/user-progress/slice";
import { getTestHistoryBySetIdAction } from "@/redux/user-tests/slice";
import { Separator } from "@/components/ui/separator";
const LearnFlashcard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentCard, setCurrentCard] = useState(0);
    const { data, isLoading } = useSelector((state: any) => state.Set);
    const { mySets } = useSelector((state: any) => state.UserSets)
    const { progress } = useSelector((state: any) => state.UserProgress)
    const { history } = useSelector((state: any) => state.UserTest)
    useEffect(() => {
        if (id) {
            getSetById(id);
        }
    }, [id])

    const getSetById = (id: string) => {
        setCurrentCard(0);
        scrollTo(0, 0);
        dispatch({
            type: getSetByIdAction.type,
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
        dispatch({
            type: getTestHistoryBySetIdAction.type,
            payload: {
                setId: id
            }
        })
    }
    const getUserSetsList = () => {
        dispatch({
            type: getUserSetsListAction.type,
        })
    }
    useEffect(() => {
        if (!mySets?.sets) {
            getUserSetsList()
        }
    }, [mySets])

    const showCard = (index: number) => {
        if (index >= data?.cards?.length || index < 0) {
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
            <Card className="w-full min-h-[500px] flex flex-col justify-between bg-transparent border-none !shadow-none">
                <CardTitle className="flex gap-2 items-end justify-between my-4">
                    <span>{data?.name}</span>
                    <Link to={replacePathWithId(routerPaths.TEST_MULTIPLE_CHOICE, String(id))} className="hover:cursor-pointer flex items-center gap-2"><NotebookPen /> Do the test</Link>
                </CardTitle>
                {Array.isArray(data?.cards) && data?.cards?.length ? data?.cards.map((card: any, index: number) => {
                    return (
                        <div key={index}>
                            {currentCard === index
                                && <>
                                    <CardContent className="w-full h-full md:h-1/2 p-0 grid grid-cols-1 md:grid-cols-6 gap-1">
                                        <div className="col-span-1 md:col-span-3 flex flex-col gap-2 h-fit">

                                            <FlipCard key={index} card={card} onFlip={onFlip} />
                                        </div>
                                        <div className="col-span-1"></div>
                                        <div className="col-span-1 md:col-span-2">
                                            <SentencesExampleBox example={card?.example} />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="grid grid-cols-1 md:grid-cols-6 gap-1 mt-4">
                                        <div className="col-span-1 md:col-span-3 flex justify-end gap-6 items-center">
                                            <Button variant={"ghost"} onClick={(e) => {
                                                e.preventDefault();
                                                showCard(index - 1)

                                            }}><ChevronLeft /></Button>
                                            <span>{`${currentCard + 1}/${data?.cards?.length}`}</span>
                                            <Button variant={"ghost"} onClick={(e) => {
                                                e.preventDefault();
                                                showCard(index + 1)
                                            }}><ChevronRight /></Button>
                                        </div>
                                        <div className="col-span-3"></div>
                                    </CardFooter>
                                </>}
                        </div>
                    )

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
                <div className="mx-6">
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <span className="font-bold text-blue-700">  Learning progress</span>
                            <span className="font-bold text-blue-700"> {progress?.progressPercentage}%</span>
                        </div>
                        <Progress value={progress?.progressPercentage || 0} className="w-full h-2" />
                    </div>

                </div>
            </Card>
            {(data?.cards?.length - progress?.studiedCards?.length > 0)
                && <>
                    <div className="m-6">
                        <CardTitle className="text-blue-400">
                            {`Not studied (
                        ${typeof (data?.cards?.length - progress?.studiedCards?.length) === 'number' && progress?.studiedCards?.length
                                    ? data?.cards?.length - progress?.studiedCards?.length
                                    : data?.cards?.length})`
                            }
                        </CardTitle>
                        <div className="flex justify-center items-start space-x-4 flex-wrap">
                            {
                                data?.cards?.filter((card: any) => !progress?.studiedCards?.includes(card.id)).map((card: any) => {
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
                </>
            }
            {
                (history?.tests?.length > 0) &&
                <div className="m-6">
                    <CardTitle className="text-blue-400">
                        Test History
                        <CardDescription className="text-lg">
                            <span>
                                You have done <span className="text-green-400">{history?.tests?.length}</span> tests,Your total correct percentage:
                            </span>
                            <span className="text-green-500">

                                {` ${history?.totalCorrectPercent}% `}
                            </span>
                        </CardDescription>
                    </CardTitle>
                    {history?.tests?.map((item: any, index: number) => {
                        return (
                            <Card className="p-6 my-4"
                                onClick={() => {
                                    navigate(replacePathWithId(routerPaths.USER_TEST_MULTIPLE_CHOICE_RESULT, item?.id)); //data is the test
                                }}
                            >

                                <CardHeader>
                                    <CardTitle>
                                        {`Correct questions: ${item?.score}/${item?.questions} (${((item?.score / item?.questions) * 100).toFixed(2)}%)`}
                                    </CardTitle>
                                    <CardDescription>
                                        Completed at: {convertDateToString(item?.completedAt)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Progress color="yellow"
                                        key={index}
                                        value={(item?.score / item?.questions) * 100}
                                        className="w-full h-2 my-6 "
                                        classNameIndicator="bg-primary"
                                    />
                                </CardContent>
                            </Card>

                        )
                    })}
                </div>
            }
            <div className="mt-10">
                <NewsetSets />
            </div>
        </div >
    )
}

export default LearnFlashcard