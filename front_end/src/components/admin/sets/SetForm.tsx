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
import { PlusCircle, Trash2 } from 'lucide-react'
import { isFunction } from '@/utils/Utils'
import NestedCardFieldArray from '../cards/NestedCardFieldArray'

const SetForm = (props: any) => {
    const { isEdit, defaultValues, onCreate } = props;
    const formSetCardSchema = z.object({
        set_name: z.string().min(1, {
            message: "Required",
        }),
        set_description: z.string().optional(),
        set_image: z.union([
            z.object({
                image: z.any().optional(),
                path: z.string().optional()
            }),
            z.string().optional()
        ]).optional(),
        cards: z.array(z.object({
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
            })).optional()
        })).nonempty()

    });
    const form = useForm<z.infer<typeof formSetCardSchema>>({
        resolver: zodResolver(formSetCardSchema),
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
                },
                example: defaultValues?.cards?.example
                    ? JSON.parse(defaultValues?.cards?.example)
                    : [{ sentence: '', translation: '' }]
            }]
        },
    })
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "cards",
    });

    const onSubmit = (values: any) => {
        isFunction(onCreate) && onCreate(values)
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
                    term: card.term,
                    define: card.define,
                    image: {
                        image: null,
                        path: card.image || ""
                    },
                    example: card.example ? JSON.parse(card.example) : [{ sentence: '', translation: '' }]
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
                        <ScrollArea className="h-96 w-full ">
                            {fields.map((field, index) => {
                                return (
                                    <Card className='p-2 my-4' key={field.id}>
                                        <div>
                                            <div className='flex justify-between items-center my-2'>
                                                <b>{index + 1}</b>
                                                <Button
                                                    onClick={() => {
                                                        remove(index)
                                                    }}
                                                    variant={"destructive"} >
                                                    <Trash2 width={20} height={20} />
                                                </Button>
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
                                                required={true}
                                            />
                                            <FormInput
                                                control={form.control}
                                                fieldName={`cards[${index}].define`}
                                                label="Define"
                                                placeholder="Define"
                                                type={Constants.INPUT_TYPE.TEXT}
                                                className='w-1/2'
                                                required={true}
                                            />
                                        </div>
                                        <FormInput
                                            control={form.control}
                                            fieldName={`cards[${index}].image`}
                                            label="Image"
                                            type={Constants.INPUT_TYPE.FILE_UPLOAD}
                                            classNameInput='h-fit'
                                        />
                                        <div className='my-4'>
                                            <b>Examples</b>
                                        </div>
                                        <NestedCardFieldArray
                                            nestIndex={index}
                                            control={form.control}
                                            // register={form.register}
                                            fieldName={"cards"}
                                            nestedFieldName={"example"}
                                        />
                                        {/* <button
                                            onClick={() => {
                                                form.setValue("cards", [
                                                    ...(form.getValues().cards || []),
                                                    {
                                                        term: '',
                                                        define: '',
                                                        image: { image: null, path: "" },
                                                        example: [{ sentence: '', translation: '' }]
                                                    }
                                                ]);
                                            }}
                                        >
                                            Append Nested
                                        </button> */}

                                    </Card>
                                )
                            })}

                            < div className='flex justify-center' >
                                <Button
                                    onClick={() => {
                                        append({
                                            term: '',
                                            define: '',
                                            image: { image: null, path: "" },
                                            example: [{ sentence: '', translation: '' }]
                                        })
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
