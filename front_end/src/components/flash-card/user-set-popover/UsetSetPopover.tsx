import { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import Constants from '@/lib/Constants';
import { Star, PlusCircle } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
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
    quickAddNewSetAction,
} from '@/redux/user-sets/slice';
import { Form } from '@/components/ui/form';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from '@/components/common/custom_input/CustomInput';
import { Card } from '@/components/ui/card';
import { isFunction } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast'

function SetForm(props: any) {
    const { onCreate } = props;
    const formSchema = z.object({
        set_name: z.string().min(1, {
            message: "Required",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            set_name: "",
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        isFunction(onCreate) && onCreate(values)
    }
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-lg font-bold">Create a new set</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput
                        control={form.control}
                        fieldName="set_name"
                        label="Name"
                        placeholder="Name"
                        type={Constants.INPUT_TYPE.TEXT}
                        required={true}
                    />
                    {/* <FormInput
                        control={form.control}
                        fieldName="set_description"
                        label="Description"
                        placeholder="Description"
                        type={Constants.INPUT_TYPE.TEXT}
                    /> */}
                    <div className='flex justify-end my-4'>
                        <Button type="submit" variant="default">Submit</Button>
                    </div>
                </form>
            </Form>
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

                },
                onError: (message: string) => {
                    // toast({
                    //     title: 'Failed',
                    //     description: message ? message : "Please try again!",
                    //     variant: 'destructive',
                    // })
                }
            }
        })
    }
    const onCreate = (values: any) => {
        dispatch({
            type: quickAddNewSetAction.type,
            payload: {
                data: {
                    set_name: values.set_name,
                    cardId: cardId
                },
                onSuccess: () => {
                    setOpenCreateSet(false)
                    toast({
                        title: 'Success',
                        variant: 'default',
                    })
                },
                onError: (message: string) => {
                    toast({
                        title: 'Failed',
                        description: message ? message : "Please try again!",
                        variant: 'destructive',
                    })
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
                                <TooltipTrigger className='p-0 border-none'>
                                    <Star
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
                title="Create a new set"
                open={openCreateSet}
                setOpen={setOpenCreateSet}
                isShowTrigger={false}
                children={<SetForm onCreate={onCreate} />}
                className={"w-full h-fit"}
            />
        </>

    )
}

export default UserSetPopover