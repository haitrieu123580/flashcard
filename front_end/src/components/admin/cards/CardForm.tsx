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

const CardForm = (props: any) => {
    const { index,
        card,
        isEdit = true,
        setId,
        onDeleteCard,
        onEditCard,
        onCreateCard,
    } = props
    const formSchema = z.object({
        term: z.string().min(1, {
            message: "Required",
        }),
        define: z.string().min(1, {
            message: "Required",
        }),
        image: z.union([
            z.object({
                image: z.any().optional(),
                path: z.string().optional()
            }),
            z.string().optional()
        ]).optional(),
        example: z.array(z.object({
            sentence: z.string().optional(),
            translation: z.string().optional()
        }))
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            term: card?.term || "",
            define: card?.define || "",
            image: {
                image: null,
                path: card?.image || "",
            },
            example: card?.example ? card?.example : [{ sentence: '', translation: '' }]
        },
    });
    const fields = useFieldArray({
        control: form.control,
        name: "example",
    });
    const onSubmit = (values: any) => {
        if (isEdit && card?.id && setId) {
            isFunction(onEditCard) && onEditCard(values, card?.id, setId)
        }
        else {
            isFunction(onCreateCard) && onCreateCard(values)
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
                                                    isFunction(onDeleteCard) && onDeleteCard(card?.id)
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
                        <div className='flex justify-between gap-1'>
                            <FormInput
                                control={form.control}
                                fieldName={`term`}
                                label="Term"
                                placeholder="Term"
                                type={Constants.INPUT_TYPE.TEXT}
                                className='w-1/2'
                                required={true}
                            />
                            <FormInput
                                control={form.control}
                                fieldName={`define`}
                                label="Define"
                                placeholder="Define"
                                type={Constants.INPUT_TYPE.TEXT}
                                className='w-1/2'
                                required={true}
                            />
                        </div>
                        <FormInput
                            control={form.control}
                            fieldName={`image`}
                            label="Image"
                            type={Constants.INPUT_TYPE.FILE_UPLOAD}
                            classNameInput='h-fit'
                        />
                        <div className='my-6 flex gap-4 items-end'>
                            <b>Examples</b>
                            <Button type="button"
                                variant={'ghost'}
                                className={`p-0 w-fit h-fit`}
                                onClick={() => {
                                    fields.append({ sentence: '', translation: '' })
                                }}
                            >
                                <PlusCircleIcon width={18} height={18} />
                            </Button>
                        </div>

                        {fields?.fields?.map((field, index) => {
                            return (
                                <div key={field.id} className='flex justify-between items-end gap-1 mt-4'>
                                    <FormInput
                                        control={form.control}
                                        fieldName={`example.${index}.sentence`}
                                        label="Sentence"
                                        placeholder="Sentence"
                                        type={Constants.INPUT_TYPE.TEXT}
                                        className='w-1/2'
                                    />
                                    <FormInput
                                        control={form.control}
                                        fieldName={`example.${index}.translation`}
                                        label="Translation"
                                        placeholder="Translation"
                                        type={Constants.INPUT_TYPE.TEXT}
                                        className='w-1/2'
                                    />
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => fields.remove(index)}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            )
                        })}
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

                    </Card >
                </form >
            </Form >
        </>
    )
}

export default CardForm