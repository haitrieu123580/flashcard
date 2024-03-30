import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { convertDateToString, isFunction } from "@/utils/Utils"
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DeletePopup from "@/components/common/popup/DeletePopup";

const SetItem = (props: any) => {
    const { data, onEdit, onDelete } = props

    return (
        <Card className="my-6">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{data?.name}</span>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                isFunction(onEdit) && onEdit(data?.id)
                            }}
                            variant={"secondary"}
                        >
                            <Pencil />
                        </Button>
                        {/* <Button
                            onClick={() => {
                                isFunction(onDelete) && onDelete(data?.id)
                            }}
                            variant={"destructive"}
                        >
                            <Trash2 />
                        </Button> */}
                        <DeletePopup
                            onConfirmDelete={() => {
                                isFunction(onDelete) && onDelete(data?.id)
                            }}
                            TriggerComponent={<Button variant={'destructive'}><Trash2 /></Button>}
                        />
                    </div>
                </CardTitle>
                <CardDescription>
                    <Badge variant="default">{`${data?.totalCards} cards`}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden">
                <CardDescription className="w-1/2">{data?.description}</CardDescription>
                <img className="max-w-full w-1/2 m-auto" src={data?.image} alt="set" />
            </CardContent>
            <CardFooter className="flex gap-6">
                <p><b>Created at: </b>{convertDateToString(data?.created_at)}</p>
                {data?.updated_at && <p><b>Updated at: </b>{convertDateToString(data?.updated_at)}</p>}
            </CardFooter>
        </Card>
    )
}

export default SetItem
