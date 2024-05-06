import React from 'react'
import SetForm from '@/components/user-sets/set-form/SetForm'
import { useSelector, useDispatch } from 'react-redux'
import { objectToFormData } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { createUserSetAction } from '@/redux/user-sets/slice';
const CreateMySet = () => {
    const dispatch = useDispatch();
    const onCreate = (values: any) => {
        const submitValues = {
            set_name: values.set_name,
            set_description: values.set_description,
            set_image: values.set_image.image,
            card: values.cards.map((card: any) => ({
                term: card.term,
                define: card.define,
                image: card.image.image,
                example: JSON.stringify(values.cards[0].example)
            }))
        }
        const formData = objectToFormData(submitValues);
        dispatch({
            type: createUserSetAction.type,
            payload: {
                data: formData,
                onSuccess: () => {
                    // setOpen(false)
                    // getSets({
                    //     pageNumber: searchParams.get("page_index") ? parseInt(searchParams.get("page_index")!) : 1,
                    //     filter: searchParams.get("filter") || "",
                    //     name: searchParams.get("name") || ""
                    // })
                    toast({
                        title: 'Create set success',
                        variant: 'default',
                    })
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

    return (
        <div>
            <SetForm
                onCreate={onCreate}
            />
        </div>
    )
}

export default CreateMySet