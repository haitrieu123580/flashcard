import { useState, useEffect } from 'react'
import SetItem from '@/components/admin/sets/SetItem'
import CustomPagination from '@/components/common/custom-pagination/CustomPagination'
import Constants from '@/utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSetsAction } from '@/redux/public-sets/slice'
import SetForm from '@/components/admin/sets/SetForm'
import CommonPopup from '@/components/common/popup/CommonPopup'
import { getSetByIdAction, deleteSetAction } from "@/redux/set/slice";
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast';
import { isFunction, objectToFormData } from '@/utils/Utils'
import { createSetAction } from '@/redux/set/slice'

const SetsList = () => {
    const { data, pagination } = useSelector((state: any) => state.Sets)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [defaultValues, setDefaultValues] = useState({} as any)
    // const [selectedId, setSelectedId] = useState<string>("")
    const getSets = (pageNumber: number, filter: string | null | undefined) => {
        scrollTo(0, 0)
        dispatch({
            type: getAllSetsAction.type,
            payload: {
                page_size: Constants.PAGINATION.LIMIT,
                page_index: pageNumber,
                filter: filter,
                onSuccess: () => {

                }
            }
        })
    }
    useEffect(() => {
        getSets(
            1,
            Constants.SORT_BY[0].key,
        )
    }, [])

    const onChangePageNumber = (pageNumber: number) => {
        getSets(
            pageNumber,
            Constants.SORT_BY[0].key,
        )
    }
    const onCreate = (values: any) => {
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
                data: formData,
                onSuccess: () => {
                    setOpen(false)
                    getSets(1, Constants.SORT_BY[0].key)
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

    const onEdit = (id: string) => {
        try {
            setOpen(true)
            // setSelectedId(id)
            GetSetById(id)
        } catch (error) {

        }
    }
    const onDelete = (id: string) => {
        dispatch({
            type: deleteSetAction.type,
            payload: {
                id: id,
                onSuccess: () => {
                    getSets(1, Constants.SORT_BY[0].key)
                    toast({
                        title: 'Delete set success',
                        variant: 'default',
                    })
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
    const GetSetById = (id: string) => {
        dispatch({
            type: getSetByIdAction.type,
            payload: {
                id: id,
                onSuccess: (data: any) => {
                    setDefaultValues(data)
                    setIsEdit(true)
                }
            }
        })
    }

    return (
        <div>
            <div className='flex justify-end mt-6'>
                <Button variant={"ghost"}
                    onClick={() => {
                        // onCreate();
                        setOpen(true)
                        setIsEdit(false)
                        setDefaultValues({})
                    }}
                >
                    <PlusCircle size={20} />
                </Button>
            </div>
            {Array.isArray(data) && data.map((set, index) => {
                return (
                    <div key={index} className='row-span-1 md:col-span-2'>
                        <SetItem
                            onEdit={onEdit}
                            onDelete={onDelete}
                            data={set}
                        />
                    </div>)
            })}
            <CommonPopup
                open={open}
                setOpen={setOpen}
                isShowTrigger={false}
                TriggerComponent={null}
                children={<SetForm defaultValues={defaultValues} onCreate={onCreate} />}
                title={"Create Set"}
            />
            <CustomPagination
                total={pagination?.total || 0}
                itemCount={1}
                siblingCount={1}
                limit={Constants.PAGINATION.LIMIT}
                onChange={(e: any) => { onChangePageNumber(e) }}
                page={1}
            />
        </div>
    )
}

export default SetsList
