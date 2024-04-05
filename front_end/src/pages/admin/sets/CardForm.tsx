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
import { useDispatch } from 'react-redux';
import { isFunction } from "@/utils/Utils"
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
        ]).optional()
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
        },
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
                                                        <PencilIcon width={20} />
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