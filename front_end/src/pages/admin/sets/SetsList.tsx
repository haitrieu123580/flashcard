import { useState, useEffect } from 'react'
import SetItem from '@/components/admin/sets/SetItem'
import CustomPagination from '@/components/common/custom-pagination/CustomPagination'
import Constants from '@/lib/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSetsAction } from '@/redux/public-sets/slice'
import SetForm from '@/components/admin/sets/SetForm'
import CommonPopup from '@/components/common/popup/CommonPopup'
import { getSetByIdAction, deleteSetAction } from "@/redux/set/slice";
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast';
import { objectToFormData } from '@/lib/utils'
import { createSetAction } from '@/redux/set/slice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CardTitle } from '@/components/ui/card'
import LoadingSpinner from '@/components/common/loading/loading-spinner/LoadingSpinner'
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup'
const SetsList = () => {
    const { data, pagination, isLoading } = useSelector((state: any) => state.Sets)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [defaultValues, setDefaultValues] = useState({} as any)
    const [pageNumber, setPageNumber] = useState(1);
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getSets({
            pageNumber: searchParams.get("page_index") ? parseInt(searchParams.get("page_index")!) : 1,
            filter: searchParams.get("filter") || "",
            name: searchParams.get("name") || ""
        })
    }, [searchParams])

    const getSets = ({
        pageNumber,
        filter,
        name,
    }: { pageNumber: number, filter: string, name: string }) => {
        setPageNumber(pageNumber)
        dispatch({
            type: getAllSetsAction.type,
            payload: {
                page_size: Constants.DEFAULT_PAGESIZE,
                page_index: pageNumber,
                filter: filter,
                name: name || null,
                onSuccess: () => {
                },
                onError: (message: string) => {
                    toast({
                        title: "Error",
                        description: message,
                        variant: "destructive"
                    })
                }
            }
        })
    }

    const onChangePageNumber = (pageNumber: number) => {
        setPageNumber(pageNumber)
        const param: Record<string, string> = {
            page_index: pageNumber.toString(),
            name: searchParams.get("name") || ""
        }
        setSearchParams(param)
    }
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
            type: createSetAction.type,
            payload: {
                data: formData,
                onSuccess: () => {
                    setOpen(false)
                    getSets({
                        pageNumber: searchParams.get("page_index") ? parseInt(searchParams.get("page_index")!) : 1,
                        filter: searchParams.get("filter") || "",
                        name: searchParams.get("name") || ""
                    })
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
                    // getSets(1, Constants.SORT_BY[0].key)
                    getSets({
                        pageNumber: searchParams.get("page_index") ? parseInt(searchParams.get("page_index")!) : 1,
                        filter: searchParams.get("filter") || "",
                        name: searchParams.get("name") || ""
                    })
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
            <div className='flex justify-between mt-6'>
                <CardTitle >Sets List</CardTitle>
                <Button variant={"default"}
                    onClick={() => {
                        // onCreate();
                        setOpen(true)
                        setIsEdit(false)
                        setDefaultValues({})
                    }}
                >
                    <PlusCircle size={20} />
                    <span className='ml-2'>{`Create new public set`}</span>
                </Button>
            </div>
            <LoadingPopup open={isLoading} />
            {Array.isArray(data) && data.map((set, index) => {
                return <div key={index} className='row-span-1 md:col-span-2'>
                    <SetItem
                        onEdit={onEdit}
                        onDelete={onDelete}
                        data={set}
                    />
                </div>
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
                page={pageNumber}
            />
        </div >
    )
}

export default SetsList
