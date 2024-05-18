import { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Star, PlusCircle } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routerPaths } from "@/routes/path";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import CommonPopup from '@/components/common/popup/CommonPopup';
import {
    getUserSetsListAction,
    addCardToMySetAction,
} from '@/redux/user-sets/slice';

function SetForm() {
    return (
        <div>
            form
        </div>
    )
}


const UserSetPopover = (props: any) => {
    const { mySets } = useSelector((state: any) => state.UserSets)
    const { cardId } = props
    const dispatch = useDispatch();
    const [isStarred, setIsStarred] = useState(false)
    const [openCreateSet, setOpenCreateSet] = useState(false)
    const starClick = (setId: string) => {
        dispatch({
            type: addCardToMySetAction.type,
            payload: {
                data: {
                    cardId: cardId,
                    setId: setId
                },
                onSuccess: () => {
                    setIsStarred(true)
                    // getUserSetsList()
                },
                onError: (error: string) => {
                    // alert(error)
                }
            }
        })
    }
    useEffect(() => {
        if (cardId && Array.isArray(mySets?.sets)) {
            const isCardStarred = mySets?.sets.some((set: any) =>
                set.cards.some((card: any) => card.id === cardId)
            );
            setIsStarred(isCardStarred);
        }
    }, [cardId, mySets]);
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button
                        variant={'ghost'}
                        className='w-fit h-fit rounded-full p-0'
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='p-0'>
                                    <Star
                                        // onClick={() => {
                                        //     setIsStarred(!isStarred)
                                        // }}
                                        className={`${isStarred ? "fill-yellow-400" : ""} cursor-pointer`}
                                    />

                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add to your library</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-0">
                    <ScrollArea className='h-32'>
                        <div className="grid w-fit">
                            {Array.isArray(mySets?.sets)
                                && mySets?.sets?.map((set: any, index: number) => {
                                    return (
                                        <div key={index} className='w-full'>
                                            <Button
                                                variant={"ghost"}
                                                className="w-full h-full overflow-hidden flex flex-col"
                                                onClick={() => {
                                                    starClick(set.id)
                                                }}
                                            >
                                                <p
                                                    className='hover:cursor-pointer w-full h-fit text-center truncate'>
                                                    {set.name}
                                                </p>
                                            </Button>


                                            <Separator />
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </ScrollArea>
                    <Button
                        className="w-full rounded-none"
                        variant={"ghost"}
                        onClick={() => {
                            setOpenCreateSet(true)

                        }}
                    >
                        <PlusCircle width={18} height={18} />
                    </Button>
                </PopoverContent>
            </Popover >
            <CommonPopup
                open={openCreateSet}
                setOpen={setOpenCreateSet}
                isShowTrigger={false}
                children={<SetForm />}
                className={"w-fit h-fit"}
            />
        </>

    )
}

export default UserSetPopover