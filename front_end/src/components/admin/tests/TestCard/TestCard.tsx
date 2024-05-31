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

const TestCard = (props: any) => {
    const { data, onEdit, onDelete, onCreate } = props

    return (
        <Card className="my-6">
            <CardHeader className={""}>
                <CardTitle className="flex justify-between items-center">
                    <span>{data?.name}</span>
                    <div className="flex gap-2 items-center">
                        <Button
                            variant={"secondary"}
                        >
                            <Link
                                to={replacePathWithId(routerPaths.ADMIN_TEST_KITS_IN_SET, data?.id)}
                            >
                                <Pencil />
                            </Link>

                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>
                    <Badge variant="default">{`${data?.totalTestKits} kits`}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden grid grid-cols-12 gap-6">
                <div className="col-span-8 grid grid-rows-2">
                    <CardDescription className="row-span-1">{data?.description}</CardDescription>
                </div>
            </CardContent>
        </Card >
    )
}

export default TestCard
