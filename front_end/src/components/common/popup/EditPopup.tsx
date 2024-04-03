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
const EditPopup = (props: any) => {
    const { TriggerComponent, onConfirmEdit, onCancel } = props;
    const [open, setOpen] = useState(false)
    return (
        // <Dialog open={open} onOpenChange={setOpen}>
        //     <DialogTrigger className="rounded-sm text-sm p-1 w-fit font-semibold  bg-background hover:dark:text-inherit">
        //         {TriggerComponent}
        //     </DialogTrigger>
        //     <DialogContent>


        //     </DialogContent>
        // </Dialog >
        <Card>
            <CardHeader>
                <CardTitle>
                    Are you sure you want to save?
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center gap-6">
                <Button
                    onClick={() => {
                        setOpen(false)
                        isFunction(onCancel) && onCancel()
                    }}
                    className="min-w-20"
                    variant={"destructive"}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        isFunction(onConfirmEdit) && onConfirmEdit()
                    }}
                    className="min-w-20"
                    variant={"default"}
                >
                    Yes
                </Button>
            </CardFooter>
        </Card>
    )
}

export default EditPopup