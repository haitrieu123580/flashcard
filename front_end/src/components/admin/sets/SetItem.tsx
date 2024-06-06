import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { convertDateToString, isFunction, replacePathWithId } from "@/lib/utils"
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DeletePopup from "@/components/common/popup/DeletePopup";
import { Link } from "react-router-dom";
import { routerPaths } from "@/routes/path";

const SetItem = (props: any) => {
    const { data, onEdit, onDelete, onCreate, showAction = true, onClick } = props

    return (
        <Card className="my-6" onClick={() => {
            isFunction(onClick) && onClick(data)
        }}>
            <CardHeader className={""}>
                <CardTitle className="flex justify-between items-center">
                    <span>{data?.name}</span>
                    {
                        showAction &&
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
                    }
                </CardTitle>
                <CardDescription>
                    <Badge variant="default">{`${data?.totalCards} cards`}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden grid grid-cols-12 gap-6">
                <div className="col-span-8 grid grid-rows-2">
                    <CardDescription className="row-span-1">{data?.description}</CardDescription>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                        <div>
                            <p><b>Created at: </b>{convertDateToString(data?.created_at)}</p>
                            <p><b>Created by: </b>{data?.created_by}</p>
                        </div>
                        <div >
                            {data?.updated_at && <p><b>Updated at: </b>{convertDateToString(data?.updated_at)}</p>}
                            {data?.updated_by && <p><b>Updated by: </b>{data?.updated_by}</p>}
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    {data?.image &&
                        <>
                            <img className="max-w-full m-auto w-52 h-52 object-cover rounded-lg" src={data?.image} alt="set" />
                        </>
                    }
                </div>
            </CardContent>
            <CardFooter className="flex gap-6">

            </CardFooter>
        </Card >
    )
}

export default SetItem
