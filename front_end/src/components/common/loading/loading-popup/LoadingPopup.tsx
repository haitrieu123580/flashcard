import { useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const LoadingPopup = (props: any) => {
  const { TriggerComponent, open, setOpen = () => {} } = props;
  // const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogClose className="bg-red-300" />
      <DialogContent
        className="h-fit w-fit !border-none bg-transparent p-0"
        showDefaultClose={false}
      >
        <LoadingSpinner />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingPopup;
