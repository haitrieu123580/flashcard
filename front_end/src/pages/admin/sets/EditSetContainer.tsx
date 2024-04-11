import { useMemo, useState, useEffect } from 'react'
import { FormInput } from '@/components/common/custom_input/CustomInput'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import Constants from '@/utils/Constants'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CardTitle } from '@/components/ui/card'
import { PlusCircle, PencilIcon } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { objectToFormData } from '@/utils/Utils'
import { editSetAction } from '@/redux/set/slice'
import { getSetByIdAction } from "@/redux/set/slice";
import { useParams } from "react-router-dom";
import CardForm from './CardForm'
import CommonPopup from '@/components/common/popup/CommonPopup'
import { toast } from '@/components/ui/use-toast'
import { editCardAction, createCardAction, deleteCardAction } from "@/redux/card/slice"
import EditPopup from '@/components/common/popup/EditPopup'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const EditSetContainer = () => {
    const { id } = useParams();
    const { data } = useSelector((state: any) => state.Set);
    const [showCardFormPopup, setShowCardFormPopup] = useState(false)
    const dispatch = useDispatch();
    const formSetSchema = z.object({
        set_name: z.string().min(1, {
            message: "Required",
        }),
        set_description: z.string().min(1, {
            message: "Required",
        }),
        set_image: z.union([
            z.object({
                image: z.any().optional(),
                path: z.string().optional()
            }),
            z.string().optional()
        ]).optional(),
        is_delete_image: z.string().optional()
    });
    useEffect(() => {
        if (id) {
            getSetById(id);
        }
    }, [id])

    const getSetById = (id: string) => {
        scrollTo(0, 0);
        dispatch({
            type: getSetByIdAction.type,
            payload: {
                id: id,

            }
        })
    }

    const onEditCard = (values: any, id: string, setId: string) => {
        const submitValues = {
            ...values,
            setId: setId,
            image: values.image.image ? values.image.image : null, // image not change
            is_delete_image: (!values.image.image && !values.image.path) ? "true" : "false",
            example: values?.example ? JSON.stringify(values?.example) : null
        }
        const formData = objectToFormData(submitValues);
        dispatch({
            type: editCardAction.type,
            payload: {
                id: id,
                data: formData,
                onSuccess: () => {
                    toast({
                        title: 'Edit card success',
                        variant: 'default',
                    })
                    getSetById(data?.id);
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
    const onDeleteCard = (id: string) => {
        dispatch({
            type: deleteCardAction.type,
            payload: {
                id: id,
                onSuccess: () => {
                    //? should do this?
                    toast({
                        title: 'Delete success',
                        variant: 'default',
                    })
                    getSetById(data?.id);
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
    const onCreateCard = (values: any) => {
        const submitValues = {
            ...values,
            setId: data?.id,
            image: values.image.image ? values.image.image : null,
            example: values?.example ? JSON.stringify(values?.example) : null
        }
        const formData = objectToFormData(submitValues);
        dispatch({
            type: createCardAction.type,
            payload: {
                data: formData,
                onSuccess: () => {
                    //? should do this?
                    setShowCardFormPopup(false)
                    toast({
                        title: 'Create card success',
                        variant: 'default',
                    })
                    getSetById(data?.id);
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
    const form = useForm<z.infer<typeof formSetSchema>>({
        resolver: zodResolver(formSetSchema),
        defaultValues: {
            set_name: data?.name || "",
            set_description: data?.description || "",
            set_image: {
                image: null,
                path: data?.image || "",
            },

        },
    })


    const onSubmitSet = (values: any) => {
        const submitValues = {
            ...values,
            set_image: values.set_image.image ? values.set_image.image : null,
            is_delete_image: (!values.set_image.image && !values.set_image.path) ? "true" : "false"
        }
        const formData = objectToFormData(submitValues);
        dispatch({
            type: editSetAction.type,
            payload: {
                id: data?.id,
                data: formData,
                onSuccess: () => {
                    toast({
                        title: 'Edit success',
                        variant: 'default',
                    })
                    getSetById(data?.id);
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
    useMemo(() => {
        if (data?.id && data?.cards) {
            form.reset({
                set_name: data.name,
                set_description: data.description,
                set_image: {
                    image: null,
                    path: data.image || "",
                },

            });
        }
    }, [data]);

    return (
        <div className=" w-full">
            <Form {...form}>
                <form className='flex flex-col gap-6'>
                    <div className='flex justify-between items-center my-2'>
                        <CardTitle>Edit set</CardTitle>
                        <EditPopup
                            TriggerComponent={
                                <Button
                                    type='button'
                                    variant={"ghost"}>
                                    <PencilIcon width={20} />
                                </Button>
                            }
                            onConfirmEdit={form.handleSubmit(onSubmitSet)}
                        />
                    </div>
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
                </form>
                <div className='my-6 flex justify-between items-center '>
                    <b>Cards</b>
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
                        title="Add new card"
                        children={
                            <ScrollArea>
                                <CardForm
                                    isEdit={false}
                                    setId={data?.id}
                                    onCreateCard={onCreateCard}
                                />
                            </ScrollArea>
                        }
                    />
                </div>
                <div className='flex flex-col'>
                    <div className="w-full flex flex-col gap-6">
                        {data?.cards && Array.isArray(data?.cards) &&
                            data?.cards.map((card: any, index: number) => {
                                return <CardForm
                                    key={index}
                                    index={index}
                                    card={card}
                                    setId={data?.id}
                                    onDeleteCard={onDeleteCard}
                                    onEditCard={onEditCard}
                                />
                            })}
                    </div>
                    <div className='flex justify-center my-2'>

                    </div>

                </div>
            </Form >
        </div >
    )
}

export default EditSetContainer
