import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { isFunction } from "@/utils/Utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
const DeletePopup = (props: any) => {
    const { TriggerComponent, onConfirmDelete, onCancel } = props;
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="rounded-sm text-sm p-1 w-fit font-semibold  bg-background hover:dark:text-inherit">
                {TriggerComponent}
            </DialogTrigger>
            <DialogContent>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Are you sure you want to delete?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            This action cannot be undone.
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-center gap-6">
                        <Button
                            onClick={() => {
                                setOpen(false)
                                isFunction(onCancel) && onCancel()
                            }}
                            variant={"secondary"}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                isFunction(onConfirmDelete) && onConfirmDelete()
                            }}
                            variant={"destructive"}
                        >
                            <Trash2 />
                        </Button>
                    </CardFooter>
                </Card>

            </DialogContent>
        </Dialog >
    )
}

export default DeletePopup