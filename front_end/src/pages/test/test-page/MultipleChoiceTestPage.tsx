import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/custom_input/CustomInput";
import Constants from "@/lib/Constants";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    getTestBySetIdAction,
    submitAnswersAction
} from "@/redux/test/slice";
import { routerPaths } from "@/routes/path";
import LoadingSpinner from "@/components/common/loading-spinner/LoadingSpinner";
import { shuffleArray } from "@/lib/utils";

const MultipleChoiceTestPage = () => {
    const { id } = useParams();
    const { examData, isLoading, result } = useSelector((state: any) => state.Test);
    // const [result, setResult] = useState<any>()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useForm();

    const getTestBySetId = (id: string) => {
        dispatch({
            type: getTestBySetIdAction.type,
            payload: {
                id: id,
                onSuccess: (data: any) => {
                },
                onError: (error: any) => {
                }
            }
        })
    }
    useEffect(() => {
        if (id) {
            getTestBySetId(id)
        }
    }, [id])
    const handleSubmit = (data: any) => {
        const answers = Object.keys(data).map((key: any) => {
            return {
                question_id: key,
                answer: data[key]
            }
        })
        dispatch({
            type: submitAnswersAction.type,
            payload: {
                data: {
                    answers: answers,
                    set_id: id
                },
                onSuccess: (data: any) => {
                    // navigate(routerPaths.TEST_MULTIPLE_CHOICE_RESULT)
                },
                onError: (error: any) => {
                    // console.log("error", error)
                }
            }
        })
    }
    return (
        <div>
            {
                isLoading
                    ? <div className="w-full h-full flex justify-center items-center"> <LoadingSpinner /></div>
                    : <>
                        <div>
                            <CardTitle>{examData?.setName}</CardTitle>
                        </div>
                        {
                            examData?.data ?
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                                        {

                                            Array.isArray(examData?.data)
                                            && examData?.data?.map((question: any) => {
                                                return (
                                                    <Card className="my-4 p-2">
                                                        <CardContent className="">
                                                            <CardTitle className="flex items-end gap-2 my-6">
                                                                Question: {question.question}
                                                            </CardTitle>

                                                            {
                                                                <FormInput
                                                                    control={form.control}
                                                                    fieldName={question.id}
                                                                    type={Constants.INPUT_TYPE.RADIO}
                                                                    options={question?.answers?.map((answer: any) => { // Remove the unused 'index' variable
                                                                        return {
                                                                            key: answer,
                                                                            label: answer,
                                                                        };
                                                                    })}
                                                                />
                                                            }
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })
                                        }
                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                                : null
                        }
                    </>

            }
            <>
                {
                    result &&
                    <div>
                        <CardTitle className="flex justify-between">
                            {result?.setName}
                            <CardDescription className="text-lg font-bold text-green-300">
                                {result?.total_correct != null ?
                                    `${result?.total_correct}/${result?.total_questions}`
                                    : null}
                            </CardDescription>
                        </CardTitle>

                        {
                            Array.isArray(result?.result)
                            && result?.result?.map((question: any, index: number) => {
                                return (
                                    <Card className="my-4 p-2 " key={index}>
                                        <CardTitle className="my-6 px-6 flex justify-between items-end">
                                            <span>
                                                Question: {question.question}
                                            </span>
                                            <CardDescription className={question.is_correct ? "text-green-400" : "text-rose-400"}>
                                                {question.is_correct ? "Correct" : "Incorrect"}
                                            </CardDescription>
                                        </CardTitle>
                                        <CardContent className="grid grid-cols-2 gap-2">
                                            {
                                                question?.answers?.map((answer: any) => {
                                                    return (
                                                        <div className={
                                                            cn(`col-span-1 rounded-sm border p-4 
                                                           ${question.user_answer === answer ? "bg-rose-200 dark:text-black" : ""} 
                                                          `, (String(question.correct_answer).toLowerCase() === String(answer).toLowerCase()) ? "bg-green-200 dark:text-black" : "")
                                                        }>
                                                            {answer}
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className={
                                                cn(`col-span-2  p-4`)
                                            }>
                                                <span>Correct answers is: </span> <span className="text-green-500">{question?.correct_answer}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </div >
                }
            </>
        </div >
    )
}

export default MultipleChoiceTestPage