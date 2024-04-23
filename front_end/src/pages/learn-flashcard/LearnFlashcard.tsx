import FlipCard from "@/components/flash-card/FlipCard"
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Volume1 } from 'lucide-react';
import { ChevronLeft, ChevronRight, NotebookPen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SentencesExampleBox from "@/components/flash-card/SentencesExampleBox";
import NewsetSets from "@/components/home/newest-sets/NewsetSets";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetByIdAction } from "@/redux/set/slice";
import { replacePathWithId, speek } from "@/lib/utils";
import { routerPaths } from "@/routes/path";
import LoadingSpinner from "@/components/common/loading-spinner/LoadingSpinner";
const LearnFlashcard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [currentCard, setCurrentCard] = useState(0);
    const { data, isLoading } = useSelector((state: any) => state.Set);
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
    }

    const showCard = (index: number) => {
        if (index >= data?.cards?.length || index < 0) {
            return;
        }
        setCurrentCard(index);
    }

    return (
        <div>
            {
                isLoading
                    ? <div className="w-full h-full flex justify-center items-center">
                        <LoadingSpinner />
                    </div>
                    : <>
                        <Card className="w-full min-h-[500px]  p-10 flex flex-col justify-between">
                            <CardTitle className="flex gap-2 items-end">
                                <span>{data?.name}</span>
                                <Link to={replacePathWithId(routerPaths.TEST_MULTIPLE_CHOICE, String(id))} className="hover:cursor-pointer flex items-center gap-2"><NotebookPen /></Link>
                            </CardTitle>
                            {Array.isArray(data?.cards) && data?.cards?.length ? data?.cards.map((card: any, index: number) => {
                                return (<>
                                    {currentCard === index
                                        && <>
                                            <CardContent className="w-full h-full md:h-1/2 p-0 grid grid-cols-1 md:grid-cols-6 gap-1">
                                                <div className="col-span-1 md:col-span-3 flex flex-col gap-2 h-fit">
                                                    <div className="flex justify-end hover:cursor-pointer" onClick={() => {
                                                        speek(card?.term)
                                                    }}>
                                                        <Volume1 />
                                                    </div>
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
                                                    <span>{`${currentCard + 1}/${data?.cards?.length}`}</span>
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
                    </>
            }
            <div className="mt-10">
                <NewsetSets />
            </div>
        </div>
    )
}

export default LearnFlashcard