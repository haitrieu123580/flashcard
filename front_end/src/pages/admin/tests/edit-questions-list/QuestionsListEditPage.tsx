import { useMemo, useState, useEffect } from 'react'
import { FormInput } from '@/components/common/custom_input/CustomInput'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import Constants from '@/lib/Constants'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { PlusCircle, PencilIcon, CheckIcon } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { objectToFormData } from '@/lib/utils'
import { useParams } from "react-router-dom";
// import CardForm from './CardForm'
import CommonPopup from '@/components/common/popup/CommonPopup'
import { toast } from '@/components/ui/use-toast'
import EditPopup from '@/components/common/popup/EditPopup'

import QuestionForm from '@/components/admin/tests/question/QuestionForm'
import {
    getQuestionsListBySetIdAction,
    editQuestionAction,
    deleteQuestionAction,
    createQuestionAction,
} from '@/redux/question/slice'

const QuestionsListEditPage = () => {
    const { id } = useParams();
    const { data } = useSelector((state: any) => state.Question);
    const [showCardFormPopup, setShowCardFormPopup] = useState(false)
    const dispatch = useDispatch();
    const getQuestionsListBySetId = (id: string) => {
        scrollTo(0, 0);
        dispatch({
            type: getQuestionsListBySetIdAction.type,
            payload: {
                id: id,

            }
        })
    }
    useEffect(() => {
        if (id) {
            getQuestionsListBySetId(id);
        }
    }, [id])

    const onEditQuestion = (values: any, id: string, setId: string) => {
        dispatch({
            type: editQuestionAction.type,
            payload: {
                id: id,
                data: values,
                onSuccess: () => {
                    toast({
                        title: 'Edit question success',
                        variant: 'default',
                    })
                    getQuestionsListBySetId(setId);
                },
                onError: (message: string) => {
                    toast({
                        title: 'Edit failed',
                        description: message ? message : "Please try again!",
                        variant: 'destructive',
                    })
                }
            }
        })

    }
    const onDeleteQuestion = (questionId: string, setId: string) => {
        console.log("delete question", questionId)
        dispatch({
            type: deleteQuestionAction.type,
            payload: {
                id: questionId,
                onSuccess: () => {
                    //? should do this?
                    toast({
                        title: 'Delete success',
                        variant: 'default',
                    })
                    getQuestionsListBySetId(setId);
                },
                onError: (message: string) => {
                    toast({
                        title: 'Delete failed',
                        description: message ? message : "Please try again!",
                        variant: 'destructive',
                    })
                }
            }
        })

    }
    const onCreateQuestion = (values: any, setid: string) => {
        dispatch({
            type: createQuestionAction.type,
            payload: {
                data: {
                    ...values,
                    set_id: setid
                },
                onSuccess: () => {
                    //? should do this?
                    setShowCardFormPopup(false)
                    toast({
                        title: 'Create question success',
                        variant: 'default',
                    })
                    getQuestionsListBySetId(setid);
                },
                onError: (message: string) => {
                    toast({
                        title: 'Create failed',
                        description: message ? message : "Please try again!",
                        variant: 'destructive',
                    })
                }
            }
        })
    }
    return (
        <div>
            <div className='flex justify-between items-center my-2'>
                <CardTitle>Questions</CardTitle>
            </div>
            <Separator />
            {Array.isArray(data?.questionList)
                && data?.questionList.map((question: any, index: number) => {
                    return (
                        <div className="my-6"
                            key={index}
                        >
                            <QuestionForm
                                index={index}
                                question={question}
                                setId={id}
                                onEditQuestion={onEditQuestion}
                                onDeleteQuestion={onDeleteQuestion}
                            />
                        </div>
                    )
                })
            }

            <div className='flex justify-center my-2'>
                <CommonPopup
                    open={showCardFormPopup}
                    setOpen={setShowCardFormPopup}
                    isShowTrigger={true}
                    TriggerComponent={
                        <Button
                            type='button'
                            className='w-fit h-fit p-0'
                            variant={"ghost"}><PlusCircle />
                        </Button>
                    }
                    title="Add new question"
                    children={
                        <ScrollArea>
                            <QuestionForm
                                isEdit={false}
                                setId={id}
                                onCreateQuestion={onCreateQuestion}
                            />
                        </ScrollArea>
                    }
                />
            </div>
        </div>
    )
}

export default QuestionsListEditPage