import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Badge } from "@/components/ui/badge"
import { convertDateToString, isFunction } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Pen, PencilIcon, Trash2Icon } from "lucide-react"
import DeletePopup from "@/components/common/popup/DeletePopup";

const SetItem = (props: any) => {
    const { onClick, data,
        showEditBtn = false,
        showDeleteBtn = false,
        onEditBtn,
        onDeleteBtn,
    } = props;
    const { name, description, totalCards, created_by, created_at, image, id } = data || {};
    return (
        <Card className="group overflow-hidden " >
            <CardHeader>

                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="max-w-full text-left">
                                    <CardTitle className="">
                                        {name || ""}
                                    </CardTitle>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {name || ""}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="col-span-1 flex justify-end">
                        {showEditBtn
                            && <Button
                                variant={"ghost"}
                                className={'w-fit h-fit '}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditBtn(id)
                                }}
                            >
                                <PencilIcon width={18} height={18} />
                            </Button>}
                        {showDeleteBtn
                            &&
                            // <Button
                            //     variant={"destructive"}
                            //     className={'w-fit h-fit '}
                            //     onClick={(e) => {
                            //         e.stopPropagation();
                            //         onDeleteBtn(id)
                            //     }}
                            // >
                            //     <Trash2Icon width={18} height={18} />
                            // </Button>
                            <DeletePopup
                                onConfirmDelete={() => {
                                    isFunction(onDeleteBtn) && onDeleteBtn(id)
                                }}
                                TriggerComponent={
                                    <Button variant={'destructive'}
                                        className={'w-fit h-fit '}
                                        type="button"
                                    >
                                        <Trash2Icon width={18} height={18} />
                                    </Button>}
                            />
                        }
                    </div>
                </div>
                <CardDescription className="flex gap-1 flex-wrap">
                    <Badge variant="default">{`${totalCards} cards`}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="" onClick={(e) => {
                e.preventDefault();
                onClick(id)
            }}>
                <div className="overflow-hidden rounded-md relative group hover:cursor-pointer">
                    <AspectRatio
                        ratio={1 / 1}
                        className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square "
                    >
                        {
                            !image
                                ? <div className="absolute w-full h-full bg-slate-300 flex justify-center items-center text-white text-2xl"></div>
                                : <img src={image} alt="set" className="w-full h-full object-cover" />
                        }

                    </AspectRatio>
                    <div className="absolute hidden bottom-0 z-10 bg-gray-700 opacity-50 w-full h-full group-hover:block"></div>
                    <div className="hidden absolute p-2 text-left text-wrap bottom-1/2 translate-y-[50%] z-10 text-white break-words group-hover:block text-sm md:text-base">
                        {description}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap block">{created_by}</span>
                    <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap block">{convertDateToString(created_at)}</span>
                </div>
            </CardFooter>
            <div className="w-ful h-1 group-hover:bg-slate-700 dark:group-hover:bg-sky-700"></div>
        </Card>
    )
}

export default SetItem
