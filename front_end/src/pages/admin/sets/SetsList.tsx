import { useState, useEffect } from 'react'
import SetItem from '@/components/admin/sets/SetItem'
import CustomPagination from '@/components/common/custom-pagination/CustomPagination'
import Constants from '@/utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSetsAction } from '@/redux/public-sets/slice'
import SetForm from '@/components/admin/sets/SetForm'
import CommonPopup from '@/components/common/popup/CommonPopup'
const SetsList = () => {
    const { data, pagination } = useSelector((state: any) => state.Sets)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const getSets = (pageNumber: number, filter: string | null | undefined) => {
        scrollTo(0, 0)
        dispatch({
            type: getAllSetsAction.type,
            payload: {
                page_size: Constants.PAGINATION.LIMIT,
                page_index: pageNumber,
                filter: filter,
                onSuccess: () => {
                    // const param: Record<string, string> = {
                    //     page_size: Constants.DEFAULT_PAGESIZE.toString(),
                    //     page_index: pageNumber.toString(),
                    //     filter: filter || "",
                    // }
                }
            }
        })
    }
    // const [dispalyArraySets, setDisplayArraySets] = useState<any[]>([]);

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
    const onEdit = (id: string) => {
        setOpen(true)
    }
    const onDelte = (id: string) => {
    }
    return (
        <div>
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
                children={<SetForm />}
                title={"Edit Set"}
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
