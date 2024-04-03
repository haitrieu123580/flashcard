import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DeletePopup from "@/components/common/popup/DeletePopup"
import { Trash2, PencilIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { FormInput } from "@/components/common/custom_input/CustomInput"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import Constants from "@/utils/Constants"
import EditPopup from '@/components/common/popup/EditPopup'
import { useSelector, useDispatch } from 'react-redux';
import { editCardAction, createCardAction, deleteCardAction } from "@/redux/card/slice"
import { objectToFormData } from "@/utils/Utils"
import { toast } from "@/components/ui/use-toast"
import CommonPopup from "@/components/common/popup/CommonPopup"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const CardForm = (props: any) => {
    const { index, card, isEdit = true, setId } = props
    const dispatch = useDispatch();
    const formSchema = z.object({
        term: z.string().min(1, {
            message: "Required",
        }),
        define: z.string().min(1, {
            message: "Required",
        }),
        image: z.object({
            image: z.any(),
            path: z.string().optional()
        })
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            term: card?.term || "",
            define: card?.define || "",
            image: {
                image: null,
                path: card?.image || "",
            },
        },
    });
    const [openDialogEdit, setOpenDialogEdit] = useState(false)
    const onEditCard = (values: any, id: string, setId: string) => {
        const submitValues = {
            ...values,
            setId: setId,
            image: values.image.image ? values.image.image : null // image not change
        }
        const formData = objectToFormData(submitValues);
        dispatch({
            type: editCardAction.type,
            payload: {
                id: id,
                data: formData,
                onSuccess: () => {
                    //? should do this?
                    window.location.reload();
                },
                onError: (message: string) => {
                    setOpenDialogEdit(false)
                    toast({
                        title: 'Edit failed',
                        description: message ? message : "Please try again!",
                        variant: 'destructive',
                    })
                }
            }
        })

    }
    const onDeleteCard = (id: string) => {

    }
    const onCreateCard = (values: any, setId: string) => {
        const submitValues = {
            ...values,
            setId: setId,
            image: values.image.image ? values.image.image : null // don't change image
        }
        const formData = objectToFormData(submitValues);
        dispatch({
            type: createCardAction.type,
            payload: {
                data: formData,
                onSuccess: () => {
                    //? should do this?
                    window.location.reload();
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
    const onSubmit = (values: any) => {
        if (isEdit && card?.id && setId) {
            onEditCard(values, card?.id, setId)
        }
        else {
            onCreateCard(values, setId)
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
                                            <CommonPopup
                                                isShowTrigger={true}
                                                TriggerComponent={<Button type='submit' variant={'ghost'}><PencilIcon width={20} /></Button>}
                                                title="Edit card"
                                                description="Are you sure you want to save?"
                                                onConfirm={() => {
                                                    onSubmit(form.getValues())
                                                }}
                                                open={openDialogEdit}
                                                setOpen={setOpenDialogEdit}
                                                children={

                                                    <EditPopup
                                                        onConfirmEdit={() => {
                                                            onSubmit(form.getValues())
                                                        }}
                                                        onCancel={() => {
                                                            setOpenDialogEdit(false)
                                                        }}
                                                    />
                                                }
                                            />
                                            <DeletePopup
                                                onConfirmDelete={() => {
                                                    onDeleteCard(card?.id)
                                                }}
                                                TriggerComponent={<Button type='button' variant={'destructive'}><Trash2 width={20} /></Button>}
                                            />
                                        </div>
                                    </>
                                    : <>
                                        <div className="w-full flex justify-end mb-2">
                                            <Button
                                                type="submit"
                                                variant={'secondary'}>
                                                Save
                                            </Button>
                                        </div>
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
                    </Card>
                </form>
            </Form>
        </>
    )
}

export default CardForm