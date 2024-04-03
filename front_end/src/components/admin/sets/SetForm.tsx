import { useMemo, useState } from 'react'
import { FormInput } from '@/components/common/custom_input/CustomInput'
import { Button } from '@/components/ui/button'
import { useFieldArray, useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Constants from '@/utils/Constants'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { PlusCircle, Trash2, PencilIcon } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { isFunction, objectToFormData } from '@/utils/Utils'
import { createSetAction } from '@/redux/set/slice'
import DeletePopup from "@/components/common/popup/DeletePopup";
const SetForm = (props: any) => {
    const { isEdit, defaultValues } = props;
    const [defaultFormData, setDefaultFormData] = useState({} as any)
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            set_name: defaultValues?.name || "",
            set_description: defaultValues?.description || "",
            set_image: {
                image: null,
                path: defaultValues?.image || "",
            },
            cards: defaultValues?.cards || [{
                card_id: '',
                term: '',
                define: '',
                image: {
                    image: null,
                    path: ''
                }
            }]
        },
    })
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "cards",
    });

    const onSubmit = (values: any) => {
        if (isEdit) {
            alert("Edit")
        }
        else {
            const submitValues = {
                set_name: values.set_name,
                set_description: values.set_description,
                set_image: values.set_image.image,
                card: values.cards.map((card: any) => ({
                    term: card.term,
                    define: card.define,
                    image: card.image.image
                }))
            }
            const formData = objectToFormData(submitValues);
            dispatch({
                type: createSetAction.type,
                payload: {
                    data: formData
                }
            })
        }
        // console.log("values", values);
    }
    useMemo(() => {
        if (defaultValues?.id && defaultValues?.cards) {
            form.reset({
                set_name: defaultValues.name,
                set_description: defaultValues.description,
                set_image: {
                    image: null,
                    path: defaultValues.image || "",
                },
                cards: defaultValues.cards.map((card: any) => ({
                    card_id: card.id,
                    term: card.term,
                    define: card.define,
                    image: {
                        image: null,
                        path: card.image || ""
                    }
                }))
            });
            setDefaultFormData(objectToFormData(defaultValues))
        }
    }, [defaultValues]);

    const onDeleteCard = (id: string) => {
        if (isEdit) {
            //call api to delete card
        }
    }
    const onAddNewCard = () => {
        if (isEdit) {
            //call api to add new card
        }
        append({ term: '', define: '', image: { image: null, path: "" } })
    }
    const onEditCard = (index: number) => {
        if (isEdit) {
            //call api to edit card
        }
    }
    return (
        <ScrollArea className="h-[600px] w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                    <FormInput
                        control={form.control}
                        fieldName="set_name"
                        label="Name"
                        placeholder="Name"
                        type={Constants.INPUT_TYPE.TEXT}
                        required={true}
                    />
                    <FormInput
                        control={form.control}
                        fieldName="set_description"
                        label="Description"
                        placeholder="Description"
                        type={Constants.INPUT_TYPE.TEXT}
                        required={true}
                    />
                    <FormInput
                        control={form.control}
                        fieldName="set_image"
                        label="Image"
                        type={Constants.INPUT_TYPE.FILE_UPLOAD}
                        classNameInput='h-fit'
                    />
                    <Separator />
                    <b>Cards</b>
                    <div className='flex flex-col'>
                        <ScrollArea className="h-96 w-full p-4 rounded-md border">
                            {fields.map((field, index) => {
                                console.log("field", field)
                                return (
                                    <Card className='p-2 my-4' key={field.id}>
                                        <div>
                                            <div className='flex justify-between items-center'>
                                                <b>{index + 1}</b>
                                                <div className='flex justify-center items-center'>
                                                    <Button
                                                        onClick={() => {
                                                            remove(index)
                                                        }}
                                                        variant={"destructive"} >
                                                        <Trash2 width={20} />
                                                    </Button>
                                                </div>
                                            </div>
                                            <Separator />
                                        </div>
                                        <div className='flex justify-between gap-1'>
                                            <FormInput
                                                control={form.control}
                                                fieldName={`cards[${index}].term`}
                                                label="Term"
                                                placeholder="Term"
                                                type={Constants.INPUT_TYPE.TEXT}
                                                className='w-1/2'
                                            />
                                            <FormInput
                                                control={form.control}
                                                fieldName={`cards[${index}].define`}
                                                label="Define"
                                                placeholder="Define"
                                                type={Constants.INPUT_TYPE.TEXT}
                                                className='w-1/2'
                                            />
                                        </div>
                                        <FormInput
                                            control={form.control}
                                            fieldName={`cards[${index}].image`}
                                            label="Image"
                                            type={Constants.INPUT_TYPE.FILE_UPLOAD}
                                            classNameInput='h-fit'
                                        />
                                    </Card>
                                )
                            })}

                            < div className='flex justify-center' >
                                <Button
                                    onClick={() => {
                                        onAddNewCard()
                                    }}
                                    type='button'
                                    variant={"ghost"}><PlusCircle /></Button>
                            </div>

                        </ScrollArea>
                    </div>
                    <Button type="submit" variant="default">Submit</Button>
                </form>

            </Form >
        </ScrollArea >
    )
}

export default SetForm
