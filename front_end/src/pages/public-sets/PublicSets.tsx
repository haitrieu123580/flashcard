import SetItem from '@/components/home/newest-sets/SetItem'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/common/custom_input/CustomInput'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import Constants from '@/utils/Constants'
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'

const PublicSets = () => {
    const form = useForm();
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const [filter, setFilter] = useState("") //get default filter from redux
    const increasePageNumber = () => {
        setPageNumber(pageNumber + 1);
        console.log(pageNumber + 1, filter)
    }
    const onSubmit = () => {

    }
    const onSelectFilter = (filter: any) => {
        setFilter(filter)
        console.log(pageNumber, filter)
    }
    return (
        <div>
            <div className='flex justify-end'>
                <Form {...form}>
                    <form className='mb-10 w-fit'>
                        <FormInput
                            control={form.control}
                            fieldName="sort_by"
                            type={Constants.INPUT_TYPE.SELECT}
                            options={[{ key: "1", label: "1" }, { key: "2", label: "2" }]}
                            placeholder="Sort by"
                            onChangeSelect={onSelectFilter}
                        />
                        {/* <Button>Search</Button> */}
                    </form>
                </Form>
            </div>
            <div className='grid grid-rows-1 md:grid-cols-6 gap-10'>
                <div className='row-span-1 md:col-span-2'><SetItem /></div>
                <div className='row-span-1 md:col-span-2'><SetItem /></div>
                <div className='row-span-1 md:col-span-2'><SetItem /></div>
                <div className='row-span-1 md:col-span-2'><SetItem /></div>
                <div className='row-span-1 md:col-span-2'><SetItem /></div>
                <div className='row-span-1 md:col-span-2'><SetItem /></div>
            </div>
            <div className='mt-10 flex justify-center'>
                <Button variant={'ghost'} onClick={(e) => { e.preventDefault(); increasePageNumber(); }}><ChevronDown /></Button>
            </div>
        </div>
    )
}

export default PublicSets
