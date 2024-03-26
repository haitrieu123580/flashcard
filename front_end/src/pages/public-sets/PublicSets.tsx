import SetItem from '@/components/home/newest-sets/SetItem'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/common/custom_input/CustomInput'
import { Form } from '@/components/ui/form'
import { set, useForm } from 'react-hook-form'
import Constants from '@/utils/Constants'
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { routerPaths } from '@/routes/path'
import { getAllSetsAction } from '@/redux/public-sets/slice'
// import { useParams } from 'react-router-dom'
const PublicSets = () => {
    const form = useForm({
        defaultValues: {
            sort_by: Constants.SORT_BY[0].key
        }
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state: any) => state.Sets)
    const [pageNumber, setPageNumber] = useState(1);
    const [filter, setFilter] = useState(Constants.SORT_BY[0].key)

    const searchParams = new URLSearchParams(location.search);
    let searchFilter = searchParams.get('filter') || null;

    const increasePageNumber = () => {
        setPageNumber(pageNumber + 1);
        getSets(pageNumber + 1, filter);
        // const queryParams = new URLSearchParams(filter).toString();

    }

    const onSelectFilter = (filter: any) => {
        setFilter(filter);
        getSets(1, filter);
        setDisplayArraySets([]);
        setPageNumber(1);
        // console.log(pageNumber, filter)
    }
    const gotoCard = () => {
        navigate(routerPaths.LEARN_FLASHCARD)
    }
    const getSets = (pageNumber: number, filter: string | null | undefined) => {
        dispatch({
            type: getAllSetsAction.type,
            payload: {
                page_size: Constants.DEFAULT_PAGESIZE,
                page_index: pageNumber,
                filter: filter,
                onSuccess: () => {
                    const param: Record<string, string> = {
                        page_size: Constants.DEFAULT_PAGESIZE.toString(),
                        page_index: pageNumber.toString(),
                        filter: filter || "",
                    }
                    const queryParams = new URLSearchParams(param).toString();
                    navigate(`${routerPaths.PUBLIC_SETS}?${queryParams}`);
                }
            }
        })
    }
    const [dispalyArraySets, setDisplayArraySets] = useState<any[]>([]);

    useEffect(() => {
        getSets(
            pageNumber,
            filter,
        )
    }, [])

    useEffect(() => {
        if (data) {
            setDisplayArraySets([...dispalyArraySets, ...data])
        }
    }, [data])
    return (
        <div>
            <div className='flex justify-end'>
                <Form {...form}>
                    <form className='mb-10 w-fit'>
                        <FormInput
                            control={form.control}
                            fieldName="sort_by"
                            type={Constants.INPUT_TYPE.SELECT}
                            options={Constants.SORT_BY}
                            placeholder="Sort by"
                            onChangeSelect={onSelectFilter}
                        />
                    </form>
                </Form>
            </div>
            <div className='grid grid-rows-1 md:grid-cols-6 gap-10'>
                {Array.isArray(dispalyArraySets) && dispalyArraySets.map((set, index) => {
                    return <div key={index} className='row-span-1 md:col-span-2'><SetItem data={set} onClick={gotoCard} /></div>
                })}
            </div>
            <div className='mt-10 flex justify-center'>
                <Button variant={'ghost'} onClick={(e) => { e.preventDefault(); increasePageNumber(); }}><ChevronDown /></Button>
            </div>
        </div>
    )
}

export default PublicSets
