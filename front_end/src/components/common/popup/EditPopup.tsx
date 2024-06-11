import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { isFunction } from '@/lib/utils';

const EditPopup = (props: any) => {
  const { TriggerComponent, onConfirmEdit, onCancel } = props;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-fit rounded-sm bg-background p-1 text-sm font-semibold hover:dark:text-inherit">
        {TriggerComponent}
      </DialogTrigger>
      <DialogContent>
        <Card>
          <CardHeader>
            <CardTitle>Are you sure you want to save all changes?</CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-center gap-6">
            <Button
              onClick={() => {
                setOpen(false);
                isFunction(onCancel) && onCancel();
              }}
              variant={'destructive'}
            >
              No
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                isFunction(onConfirmEdit) && onConfirmEdit();
                setOpen(false);
              }}
              variant={'secondary'}
            >
              Yes
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EditPopup;
