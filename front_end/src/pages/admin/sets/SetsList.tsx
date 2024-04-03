import { useState, useEffect } from 'react'
import SetItem from '@/components/admin/sets/SetItem'
import CustomPagination from '@/components/common/custom-pagination/CustomPagination'
import Constants from '@/utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSetsAction } from '@/redux/public-sets/slice'
import SetForm from '@/components/admin/sets/SetForm'
import CommonPopup from '@/components/common/popup/CommonPopup'
import { getSetByIdAction } from "@/redux/set/slice";
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    const onCreate = () => {
        setOpen(true)
        setIsEdit(false)
        setDefaultValues({})
    }
    const onEdit = (id: string) => {
        try {
            setOpen(true)
            // setSelectedId(id)
            GetSetById(id)
        } catch (error) {

        }
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
    const onDelte = (id: string) => {
    }
    return (
        <div>
            <div className='flex justify-end mt-6'>
                <Button variant={"ghost"}
                    onClick={() => {
                        onCreate();
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
                            onDelete={onDelte}
                            data={set}
                        />
                    </div>)
            })}
            <CommonPopup
                open={open}
                setOpen={setOpen}
                isShowTrigger={false}
                TriggerComponent={null}
                children={<SetForm defaultValues={defaultValues} />}
                title={isEdit ? "Edit Set" : "Create Set"}
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
