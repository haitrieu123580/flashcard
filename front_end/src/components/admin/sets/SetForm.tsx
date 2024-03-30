import React, { useState } from 'react'
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
import { PlusCircle, Trash2 } from 'lucide-react'
const SetForm = (props: any) => {
    const formSchema = z.object({
        username: z.string().min(2, {
            message: "",
        }),
        password: z.string().min(6, {
            message: ""
        }),
        card: z.array(z.object({}))
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            card: [{ term: '', define: '', image: '' }]
        },
    })

    const [cardCount, setCardCount] = useState(1); // Số lượng card hiện tại

    function addCard() {
        setCardCount(cardCount + 1); // Tăng số lượng card khi click vào PlusCircle
    }

    function onSubmit(values: z.infer<typeof formSchema>) {

    }
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control: form.control, // control props comes from useForm (optional: if you are using FormContext)
        name: "card", // unique name for your Field Array
    });

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
                        // placeholder="Image"
                        type={Constants.INPUT_TYPE.FILE_UPLOAD}
                        classNameInput='h-fit'
                    />
                    <Separator />
                    <b>Cards</b>
                    <div className='flex flex-col'>
                        <ScrollArea className="h-96 w-full p-4 rounded-md border">
                            {fields.map((field, index) => {
                                return (
                                    <Card className='p-2 my-4' key={field.id}>
                                        <div>
                                            <div className='flex justify-between items-center'>
                                                <b>{index + 1}</b>
                                                <Button
                                                    onClick={() => {
                                                        remove(index)
                                                    }}
                                                    variant={"ghost"} ><Trash2 className='w-[20px] h-[20px]' /></Button>
                                            </div>
                                            <Separator />
                                        </div>
                                        <div className='flex justify-between gap-1'>
                                            <FormInput
                                                control={form.control}
                                                fieldName={`card[${index}].term`}
                                                label="Term"
                                                placeholder="Term"
                                                type={Constants.INPUT_TYPE.TEXT}
                                                className='w-1/2'
                                            />
                                            <FormInput
                                                control={form.control}
                                                fieldName={`card[${index}].define`}
                                                label="Define"
                                                placeholder="Define"
                                                type={Constants.INPUT_TYPE.TEXT}
                                                className='w-1/2'
                                            />
                                        </div>
                                        <FormInput
                                            control={form.control}
                                            fieldName={`card[${index}].image`}
                                            label="Image"
                                            // placeholder="Image"
                                            type={Constants.INPUT_TYPE.FILE_UPLOAD}
                                            classNameInput='h-fit'
                                        />
                                    </Card>
                                )
                            })}
                            {/* <Card className='p-2'>
                                <div>
                                    <b>1</b>
                                    <Separator />
                                </div>
                                <div className='flex justify-between gap-1'>
                                    <FormInput
                                        control={form.control}
                                        fieldName="card[0].term"
                                        label="Term"
                                        placeholder="Term"
                                        type={Constants.INPUT_TYPE.TEXT}
                                        className='w-1/2'
                                    />
                                    <FormInput
                                        control={form.control}
                                        fieldName="card[0].define"
                                        label="Define"
                                        placeholder="Define"
                                        type={Constants.INPUT_TYPE.TEXT}
                                        className='w-1/2'
                                    />
                                </div>
                                <FormInput
                                    control={form.control}
                                    fieldName="card[0].image"
                                    label="Image"
                                    // placeholder="Image"
                                    type={Constants.INPUT_TYPE.FILE_UPLOAD}
                                    classNameInput='h-fit'
                                />
                            </Card> */}
                            < div className='flex justify-center' >
                                <Button
                                    onClick={() => {
                                        append({ term: '', define: '', image: '' })
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
