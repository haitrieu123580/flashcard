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
import { createQuestionsBySetIdAction, getUserTestResultAction, saveUserAnswerAction } from "@/redux/user-tests/slice";
import { routerPaths } from "@/routes/path";
import { CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";
import { setColorLevel } from "@/lib/utils";


const MultipleChoiceTestResultPage = () => {
    const { id } = useParams<{ id: string }>(); //test id
    const { result } = useSelector((state: any) => state.UserTest);
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
            <CardTitle className="flex justify-between items-end">
                <div className="flex gap-2 items-end">
                    {result?.set?.name}
                    <span className="text-sm text-primary">
                        {result?.level as number
                            ?
                            <Badge
                                className={setColorLevel(Constants.LEVEL[result?.level as number as 0 | 1 | 2 | 3].toString())}
                            >
                                {Constants.LEVEL[result?.level as number as 0 | 1 | 2 | 3].toString()}
                            </Badge>
                            : ""}
                    </span>
                    <span className=" font-bold text-primary">
                        {result?.score} /{result?.totalQuestions}
                    </span>
                </div>
                <Button variant={"link"} className="">
                    <Link
                        to={replacePathWithId(result?.set?.mySet
                            ? routerPaths.LEARN_MY_SET
                            : routerPaths.LEARN_FLASHCARD, result?.set?.id)}>
                        Back to Learning
                    </Link>
                </Button>
            </CardTitle >

            {
                Array.isArray(result?.results) && result?.results.length > 0
                    ?
                    <>
                        {
                            result?.results?.map((result: any, index: number) => {
                                return (
                                    <Card className="my-4 p-2 " key={index}>
                                        <CardTitle className="my-6 px-6 flex justify-between items-start">
                                            <span>
                                                Question:
                                            </span>
                                            <div className="w-fit m-auto">
                                                {result?.question.questionType === Constants.QUESTION_TYPE.IMAGE
                                                    ? <div className="m-auto">
                                                        <img src={result?.question.questionText} alt="question" className="h-72 w-72 object-cover" />
                                                    </div>
                                                    : <div>{result?.question.questionText}</div>}
                                            </div>
                                            <CardDescription className={result.isCorrect ? "text-green-400" : "text-rose-400"}>
                                                {result.isCorrect ? "Correct" : "Incorrect"}
                                            </CardDescription>
                                        </CardTitle>
                                        <CardContent className="grid grid-cols-2 gap-2">
                                            {
                                                result?.question?.options?.map((option: any) => {
                                                    return (
                                                        <div className={
                                                            cn(`col-span-1 rounded-sm border p-4 
                                                   ${result.userAnswer === option ? "bg-rose-200 dark:text-black" : ""} 
                                                  `, (String(result?.question?.correctAnswer).toLowerCase() === String(option).toLowerCase()) ? "bg-green-200 dark:text-black" : "")
                                                        }>
                                                            {option}
                                                        </div>
                                                    )
                                                })
                                            }
                                            {result?.question?.questionType === Constants.QUESTION_TYPE.WRITTEN
                                                && <div className="col-span-1">
                                                    <span>Your Answer: </span>
                                                    <span className="text-green-500">{result?.userAnswer}</span>
                                                </div>
                                            }
                                            <div className={
                                                cn(`col-span-2`)
                                            }>
                                                <span>Correct answers is: </span> <span className="text-green-500">{result?.question?.correctAnswer}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </>
                    : <>
                        {
                            result?.questions?.map((question: any, index: number) => {
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
                                            <CardDescription className={"text-rose-400"}>
                                                {"Incorrect"}
                                            </CardDescription>
                                        </CardTitle>
                                        <CardContent className="grid grid-cols-2 gap-2">
                                            {
                                                question?.options?.map((option: any) => {
                                                    return (
                                                        <div className={
                                                            cn(`col-span-1 rounded-sm border p-4 
                                                       ${result?.userAnswer === option ? "bg-rose-200 dark:text-black" : ""} 
                                                      `, (String(question?.correctAnswer).toLowerCase() === String(option).toLowerCase()) ? "bg-green-200 dark:text-black" : "")
                                                        }>
                                                            {option}
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
                    </>
            }

        </div >
    )
}

export default MultipleChoiceTestResultPage