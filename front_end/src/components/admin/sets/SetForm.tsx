import { useMemo } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'

const SetForm = (props: any) => {
    const { isEdit, defaultValues } = props;
    // const { data } = useSelector((state: any) => state.Set);
    // const formSchema = z.object({
    //     set_name: z.string().min(2, {
    //         message: "",
    //     }),
    //     set_description: z.string().min(6, {
    //         message: ""
    //     }),
    //     set_image: z.string().url() || z.string().optional(),
    //     cards: z.array(
    //         z.object({
    //             term: z.string(),
    //             define: z.string(),
    //             image: z.string().url().optional()
    //         })
    //     )
    // })
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: useMemo(() => {
    //         return {
    //             set_name: data?.name || "",
    //             set_description: data?.description || "",
    //             set_image: data?.image || "",
    //             cards: data?.cards || [{ term: '', define: '', image: '' }]
    //         }
    //     }, [data]),
    // })
    const form = useForm({
        defaultValues: {
            set_name: defaultValues?.name || "",
            set_description: defaultValues?.description || "",
            set_image: {
                image: null,
                path: defaultValues?.image || "",
            },
            cards: defaultValues?.cards || [{
                term: '',
                define: '',
                image: {
                    image: null,
                    path: ''
                }
            }]
        },
    })

    const onSubmit = (values: any) => {
        console.log("values", values);
    }
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control: form.control,
        name: "cards",
    });
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
                    term: card.term,
                    define: card.define,
                    image: {
                        image: null,
                        path: card.image || ""
                    }
                }))
            });
        }
    }, [defaultValues]);
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
