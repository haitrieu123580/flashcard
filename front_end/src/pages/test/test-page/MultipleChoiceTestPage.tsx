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

const MultipleChoiceTestPage = () => {
    const { id } = useParams();
    const { examData } = useSelector((state: any) => state.Test);
    const [result, setResult] = useState<any>()
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
                data: { answers },
                onSuccess: (data: any) => {
                    navigate(routerPaths.TEST_MULTIPLE_CHOICE_RESULT)
                },
                onError: (error: any) => {
                    // console.log("error", error)
                }
            }
        })
    }
    return (
        <div>
            <div>
                <h1>Multiple Choice Test Page</h1>
            </div>
            {
                !examData?.result
                &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        {

                            Array.isArray(examData)
                            && examData?.map((question: any) => {
                                return (

                                    <Card className="my-4 p-2">
                                        <CardTitle className="mb-2">Question:
                                            <span>
                                                {question.question}
                                            </span>
                                        </CardTitle>
                                        <CardContent className="">
                                            {
                                                <FormInput
                                                    control={form.control}
                                                    fieldName={question.id}
                                                    type={Constants.INPUT_TYPE.RADIO}
                                                    options={question.answers.map((answer: any, index: number) => {
                                                        return {
                                                            key: answer,
                                                            label: answer,
                                                        }
                                                    })}
                                                />
                                            }
                                        </CardContent>
                                    </Card>

                                )
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
            }
        </div >
    )
}

export default MultipleChoiceTestPage