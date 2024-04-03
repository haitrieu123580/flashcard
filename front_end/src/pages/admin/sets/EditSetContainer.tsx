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
import DeletePopup from "@/components/common/popup/DeletePopup";
import { getSetByIdAction } from "@/redux/set/slice";
import { useParams } from "react-router-dom";
import CardForm from './CardForm'
import CommonPopup from '@/components/common/popup/CommonPopup'
import { toast } from '@/components/ui/use-toast'
const EditSetContainer = () => {
    const { id } = useParams();
    const { data } = useSelector((state: any) => state.Set);
    const [showCardFormPopup, setShowCardFormPopup] = useState(false)
    const dispatch = useDispatch();
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
    const form = useForm({
        defaultValues: {
            set_name: data?.name || "",
            set_description: data?.description || "",
            image: {
                image: null,
                path: data?.image || "",
            },

        },
    })


    const onSubmit = (values: any) => {
        const submitValues = {
            ...values,
            set_image: values.image.image ? values.image.image : null//image not change
        }
        const formData = objectToFormData(submitValues);
        dispatch({
            type: editSetAction.type,
            payload: {
                id: data?.id,
                data: formData,
                onSuccess: () => {
                    getSetById(data?.id);
                },
                onError: (message: string) => {
                    // setOpenDialogEdit(false)
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
                image: {
                    image: null,
                    path: data.image || "",
                },

            });
        }
    }, [data]);

    return (
        <div className=" w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                    <div className='flex justify-between items-center my-2'>
                        <CardTitle>Edit set</CardTitle>
                        <Button
                            onClick={() => {
                            }}
                            variant={"ghost"} >
                            <PencilIcon width={20} />
                        </Button>
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
                        fieldName="image"
                        label="Image"
                        type={Constants.INPUT_TYPE.FILE_UPLOAD}
                        classNameInput='h-fit'
                    />
                    <Separator />
                </form>
                <b>Cards</b>
                <div className='flex flex-col'>
                    <div className="w-full flex flex-col gap-6">
                        {data?.cards && Array.isArray(data?.cards) &&
                            data?.cards.map((card: any, index: number) => {
                                return <CardForm key={index} index={index} card={card} setId={data?.id} />
                            })}
                    </div>
                    <div className='flex justify-center my-2'>
                        <CommonPopup
                            open={showCardFormPopup}
                            setOpen={setShowCardFormPopup}
                            isShowTrigger={true}
                            TriggerComponent={
                                <Button
                                    type='button'
                                    variant={"ghost"}><PlusCircle />
                                </Button>
                            }
                            title="Add new card"
                            children={
                                <ScrollArea>
                                    <CardForm isEdit={false} setId={data?.id} />
                                </ScrollArea>
                            }
                        />
                    </div>

                </div>
            </Form >
        </div >
    )
}

export default EditSetContainer
