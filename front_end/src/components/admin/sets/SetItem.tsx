import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { convertDateToString, isFunction, replacePathWithId } from "@/utils/Utils"
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DeletePopup from "@/components/common/popup/DeletePopup";
import { Link } from "react-router-dom";
import { routerPaths } from "@/routes/path";

const SetItem = (props: any) => {
    const { data, onEdit, onDelete } = props

    return (
        <Card className="my-6">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{data?.name}</span>
                    <div className="flex gap-2 items-center">
                        <Button
                            variant={"secondary"}
                        >
                            <Link
                                to={replacePathWithId(routerPaths.ADMIN_SETS_EDIT, data?.id)}
                            >
                                <Pencil />
                            </Link>

                        </Button>
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
        </Card >
    )
}

export default SetItem
