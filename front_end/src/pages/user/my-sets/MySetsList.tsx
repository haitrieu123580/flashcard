import { useDispatch, useSelector } from 'react-redux';
import { getUserSetsListAction } from '@/redux/user-sets/slice';
import SetItem from '@/components/home/newest-sets/SetItem'
import { useEffect, useState } from 'react'
import { FormInput } from '@/components/common/custom_input/CustomInput'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import Constants from '@/lib/Constants'
import { useNavigate, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { routerPaths } from '@/routes/path'
import { replacePathWithId } from '@/lib/utils'
import CustomPagination from '@/components/common/custom-pagination/CustomPagination'
import { toast } from '@/components/ui/use-toast'
import LoadingSpinner from "@/components/common/loading/loading-spinner/LoadingSpinner"
import { PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
const MySetsList = () => {
    const { mySets, isLoading, pagination } = useSelector((state: any) => state.UserSets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserSetsList = () => {
        dispatch({
            type: getUserSetsListAction.type
        })
    }
    useEffect(() => {
        getUserSetsList();
    }, [])

    const [pageNumber, setPageNumber] = useState(1);
    const [filter, setFilter] = useState(Constants.SORT_BY[0].key)
    let [searchParams, setSearchParams] = useSearchParams();
    const [errorMessage, setErrorMessage] = useState("")

    const onSelectFilter = (filter: any) => {
        setFilter(filter);
        const param: Record<string, string> = {
            page_index: pageNumber.toString(),
            filter: filter || "",
            name: searchParams.get("name") || ""
        }
        setSearchParams(param)
    }
    const onChangePageNumber = (pageNumber: number) => {
        setPageNumber(pageNumber)
        const param: Record<string, string> = {
            page_index: pageNumber.toString(),
            filter: filter || "",
            name: searchParams.get("name") || ""
        }
        setSearchParams(param)
    }
    const gotoCard = (id: string = "") => {
        navigate(replacePathWithId(routerPaths.LEARN_MY_SET, id))
    }
    return (
        <div>
            <div className='flex justify-end my-4'>
                <Link
                    to={routerPaths.CREATE_MY_SET}
                >
                    <Button

                        variant="outline"
                        className=''
                    >

                        <PlusCircleIcon size={20} />
                        <span className='ml-2'>Create New Set</span>
                    </Button>

                </Link>
            </div>
            {
                isLoading
                    ? <div className='w-full h-full flex justify-center items-center'><LoadingSpinner /></div>
                    :
                    <div className='grid grid-rows-1 md:grid-cols-6 gap-10'>
                        {Array.isArray(mySets?.sets) && mySets?.sets.map((set: any, index: number) => {
                            const data = {
                                ...set,
                                totalCards: set.cards?.length || 0
                            }
                            return <div key={index} className='row-span-1 md:col-span-2'>
                                <SetItem
                                    data={data}
                                    onClick={gotoCard}
                                    showEditBtn={true}
                                    showDeleteBtn={true}
                                    onEditBtn={(id: string) => {
                                        navigate(replacePathWithId(routerPaths.EDIT_MY_SET, id))
                                    }}
                                    onDeleteBtn={(id: string) => { }}

                                />
                            </div>
                        })}
                    </div>
            }
            {
                errorMessage && <div className='row-span-1 md:col-span-6'>
                    <div className='text-center text-red-500'>{errorMessage}</div>
                </div>
            }

            <div className='mt-10 flex justify-center'>
                <CustomPagination
                    total={pagination?.total || 0}
                    itemCount={1}
                    siblingCount={1}
                    limit={Constants.PAGINATION.LIMIT}
                    onChange={(e: any) => { onChangePageNumber(e) }}
                    page={pageNumber}
                />
            </div>
        </div >
    )
}

export default MySetsList