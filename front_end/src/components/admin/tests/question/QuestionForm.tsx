import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DeletePopup from "@/components/common/popup/DeletePopup"
import { Trash2, PencilIcon, PlusCircleIcon, CheckIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { FormInput } from "@/components/common/custom_input/CustomInput"
import { useForm, useFieldArray } from "react-hook-form"
import { Form } from "@/components/ui/form"
import Constants from "@/lib/Constants"
import EditPopup from '@/components/common/popup/EditPopup'
import { isFunction } from "@/lib/utils"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const QuestionForm = (props: any) => {
    const {
        index,
        question,
        isEdit = true,
        setId,
        onDeleteQuestion,
        onEditQuestion,
        onCreateQuestion,
    } = props
    const formSchema = z.object({
        question: z.string().min(1, {
            message: "Required",
        }),

        correct_answer: z.string().min(1, {
            message: "Required",
        }),
        answers: z.array(
            z.object({
                value: z.string().optional(),
            })
        ).optional()
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: question?.question || "",
            correct_answer: question?.correct_answer || "",
            answers: question?.answers.map((answer: any, index: number) => {
                return { value: answer }
            }) || [""],
        },
    });
    const fields = useFieldArray({
        control: form.control,
        name: "answers",
    });
    const onSubmit = (values: any) => {
        const submitValues = {
            question: values.question,
            correct_answer: values.correct_answer,
            answers: values.answers.map((answer: any) => {
                return answer.value
            })
        }
        if (!submitValues.answers?.includes(submitValues.correct_answer)) {
            return alert("Correct answer must be one of the answers")
        }
        if (isEdit && question?.id && setId) {
            isFunction(onEditQuestion) && onEditQuestion(submitValues, question?.id, setId)
        }
        else {
            isFunction(onCreateQuestion) && onCreateQuestion(submitValues, setId)
        }

    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className='p-2'>
                        <div>
                            <div className='flex justify-between items-center'>
                                {isEdit
                                    ? <>
                                        <b>{index + 1}</b>
                                        <div className='flex justify-center items-center mb-2'>
                                            <EditPopup
                                                onConfirmEdit={() => {
                                                    form.handleSubmit(onSubmit)()
                                                }}
                                                TriggerComponent={
                                                    <Button type='button' variant={'ghost'}>
                                                        <CheckIcon width={20} />
                                                    </Button>
                                                }
                                            />
                                            <DeletePopup
                                                onConfirmDelete={() => {
                                                    isFunction(onDeleteQuestion) && onDeleteQuestion(question?.id, setId)
                                                }}
                                                TriggerComponent={<Button type='button' variant={'destructive'}><Trash2 width={20} /></Button>}
                                            />
                                        </div>
                                    </>
                                    : <>

                                    </>}

                            </div>
                            <Separator />
                        </div>
                        <FormInput
                            control={form.control}
                            fieldName={`question`}
                            label="Question"
                            placeholder="Question"
                            type={Constants.INPUT_TYPE.TEXT}
                            required={true}
                        />
                        <div className="flex items-center gap-4 my-2">
                            <p className="font-semibold">Answers</p>
                            <Button
                                variant={'ghost'}
                                className="p-0 h-fit w-fit"
                                type="button"
                                onClick={() => {
                                    fields.append({ value: "" })
                                }}
                            >
                                <PlusCircleIcon width={15} height={15} />
                            </Button>
                        </div>
                        {fields.fields.map((field: any, index: number) => {
                            return (
                                <FormInput
                                    key={field.id}
                                    control={form.control}
                                    fieldName={`answers.${index}.value`}
                                    className="my-2"
                                    placeholder="Answer"
                                    type={Constants.INPUT_TYPE.TEXT}
                                    required={true}
                                />
                            )
                        })}
                        <FormInput
                            control={form.control}
                            fieldName={`correct_answer`}
                            label="Correct Answer"
                            placeholder="Enter correct answer"
                            type={Constants.INPUT_TYPE.TEXT}
                            required={true}
                        />
                        {
                            !isEdit &&
                            <Button
                                type="submit"
                                variant={'default'}
                                className="w-full my-6"
                            >
                                Save
                            </Button>
                        }

                    </Card>
                </form>
            </Form>
        </>
    )
}

export default QuestionForm