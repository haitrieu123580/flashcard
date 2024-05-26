import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Constants from "@/lib/Constants";
import { cn, isFunction, replacePathWithId } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LoadingPopup from "@/components/common/loading/loading-popup/LoadingPopup";
import { Progress } from "@/components/ui/progress";
import CommonPopup from "@/components/common/popup/CommonPopup";
import {
    getTestBySetIdAction,
    submitAnswersAction
} from "@/redux/test/slice";
import { createQuestionsBySetIdAction, getUserTestResultAction, saveUserAnswerAction } from "@/redux/user-tests/slice";
import AuthError from "@/components/auth-error/AuthError";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { routerPaths } from "@/routes/path";
import { CardDescription } from "@/components/ui/card";

const MultipleChoiceTestResultPage = () => {
    const { id } = useParams<{ id: string }>(); //test id
    const { result } = useSelector((state: any) => state.UserTest);
    console.log(result);
    const dispatch = useDispatch();
    const getTestBySetId = (id: string) => {
        dispatch({
            type: getUserTestResultAction.type,
            payload: {
                testId: id,
                onSuccess: (data: any) => { },
                onError: (error: any) => { }
            }
        });
    };

    useEffect(() => {
        if (id) {
            getTestBySetId(id);
        }
    }, [id]);

    return (
        <div>
            <CardTitle className="flex justify-between">
                <div className="flex gap-2">
                    {result?.set?.name}
                    <span className=" font-bold text-green-300">
                        {result?.score} /{result?.totalQuestions}
                    </span>
                </div>
                <Button variant={"link"}>
                    <Link to={`${replacePathWithId(routerPaths.LEARN_FLASHCARD, result.set?.id)}`}>Back to Learning page</Link>
                </Button>
            </CardTitle >

            {
                Array.isArray(result?.questions)
                && result?.questions?.map((question: any, index: number) => {
                    return (
                        <Card className="my-4 p-2 " key={index}>
                            <CardTitle className="my-6 px-6 flex justify-between items-start">
                                <span>
                                    Question:
                                </span>
                                <div className="w-fit m-auto">
                                    {question.questionType === Constants.QUESTION_TYPE.IMAGE
                                        ? <div className="m-auto">
                                            <img src={question.questionText} alt="question" className="h-72 w-72 object-cover" />
                                        </div>
                                        : <div>{question.questionText}</div>}
                                </div>
                                <CardDescription className={question.isCorrect ? "text-green-400" : "text-rose-400"}>
                                    {question.isCorrect ? "Correct" : "Incorrect"}
                                </CardDescription>
                            </CardTitle>
                            <CardContent className="grid grid-cols-2 gap-2">
                                {
                                    question?.options?.map((answer: any) => {
                                        return (
                                            <div className={
                                                cn(`col-span-1 rounded-sm border p-4 
                                               ${question.userAnswer === answer ? "bg-rose-200 dark:text-black" : ""} 
                                              `, (String(question.correctAnswer).toLowerCase() === String(answer).toLowerCase()) ? "bg-green-200 dark:text-black" : "")
                                            }>
                                                {answer}
                                            </div>
                                        )
                                    })
                                }
                                <div className={
                                    cn(`col-span-2  p-4`)
                                }>
                                    <span>Correct answers is: </span> <span className="text-green-500">{question?.correctAnswer}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div >
    )
}

export default MultipleChoiceTestResultPage