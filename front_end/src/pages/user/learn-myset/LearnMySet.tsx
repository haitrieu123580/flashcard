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
import {
    getUserSetsListAction,
    addCardToMySetAction,
    getUserSetByIdAction,
} from '@/redux/user-sets/slice';
import LoadingPopup from "@/components/common/loading/loading-popup/LoadingPopup";
const LearnFlashcard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [currentCard, setCurrentCard] = useState(0);
    // const { data, isLoading } = useSelector((state: any) => state.Set);
    const { mySets, set, isLoading } = useSelector((state: any) => state.UserSets)

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

    return (
        <div>
            <LoadingPopup
                open={isLoading}
            />
            <Card className="w-full min-h-[500px]  p-10 flex flex-col justify-between">
                <CardTitle className="flex gap-2 items-end my-2">
                    <span>{set?.name}</span>
                    <Link to={replacePathWithId(routerPaths.TEST_MULTIPLE_CHOICE, String(id))} className="hover:cursor-pointer flex items-center gap-2"><NotebookPen /></Link>
                </CardTitle>
                {Array.isArray(set?.cards) && set?.cards?.length ? set?.cards.map((card: any, index: number) => {
                    return (<>
                        {currentCard === index
                            && <>
                                <CardContent className="w-full h-full md:h-1/2 p-0 grid grid-cols-1 md:grid-cols-6 gap-1">
                                    <div className="col-span-1 md:col-span-3 flex flex-col gap-2 h-fit">

                                        <FlipCard key={index} term={card?.term} define={card?.define} card={card} />
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
                    <CardFooter className="grid grid-cols-1 md:grid-cols-6 gap-1">

                    </CardFooter>
                </>}
            </Card>
            <div className="mt-10">
                <NewsetSets />
            </div>
        </div>
    )
}

export default LearnFlashcard