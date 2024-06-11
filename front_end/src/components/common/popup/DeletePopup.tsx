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

const DeletePopup = (props: any) => {
  const { TriggerComponent, onConfirmDelete, onCancel } = props;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full rounded-sm bg-background text-sm font-semibold hover:dark:text-inherit">
        {TriggerComponent}
      </DialogTrigger>
      <DialogContent>
        <Card>
          <CardHeader>
            <CardTitle>Are you sure you want to delete?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>This action cannot be undone.</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center gap-6">
            <Button
              onClick={() => {
                setOpen(false);
                isFunction(onCancel) && onCancel();
              }}
              variant={'secondary'}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                isFunction(onConfirmDelete) && onConfirmDelete();
                setOpen(false);
              }}
              variant={'destructive'}
            >
              <Trash2 />
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePopup;
