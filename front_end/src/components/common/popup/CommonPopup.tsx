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
import { cn } from "@/lib/utils";
const CommonPopup = (props: any) => {
    const {
        open,
        setOpen,
        isShowTrigger,
        TriggerComponent,
        onClick,
        title,
        children,
        className } = props;
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {isShowTrigger && TriggerComponent &&
                <DialogTrigger className="rounded-sm text-sm p-1 w-fit font-semibold  bg-background hover:dark:text-inherit">
                    {TriggerComponent}
                </DialogTrigger>}
            <DialogContent className={cn(`max-w-3xl`, className ? className : "")}>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                    <CardFooter className="flex justify-center gap-6">
                        {/* <Button
                            onClick={() => {
                                // setOpen(false)
                            }}
                            variant={"secondary"}
                        >
                            Save
                        </Button> */}
                    </CardFooter>
                </Card>

            </DialogContent>
        </Dialog >
    )
}

export default CommonPopup