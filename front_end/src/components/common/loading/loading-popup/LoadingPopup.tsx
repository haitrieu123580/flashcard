import { useState } from 'react';
import LoadingSpinner from '../loading-spinner/LoadingSpinner'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
const LoadingPopup = (props: any) => {
    const { TriggerComponent, open, setOpen = () => { } } = props;
    // const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogClose className='bg-red-300' />
            <DialogContent className='bg-transparent !border-none p-0 w-fit h-fit' showDefaultClose={false}>
                <LoadingSpinner />
            </DialogContent>
        </Dialog >
    )
}

export default LoadingPopup