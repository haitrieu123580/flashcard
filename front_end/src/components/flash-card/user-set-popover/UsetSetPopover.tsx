import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import { FormInput } from '@/components/common/custom_input/CustomInput';
import CommonPopup from '@/components/common/popup/CommonPopup';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import {
  addCardToMySetAction,
  getUserSetsListAction,
  quickAddNewSetAction,
} from '@/redux/user-sets/slice';
import Constants from '@/lib/Constants';
import { isFunction } from '@/lib/utils';

function SetForm(props: any) {
  const { onCreate } = props;
  const formSchema = z.object({
    set_name: z.string().min(1, {
      message: 'Required',
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      set_name: '',
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    isFunction(onCreate) && onCreate(values);
  };
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
          <div className="my-4 flex justify-end">
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

const UserSetPopover = (props: any) => {
  const { mySets } = useSelector((state: any) => state.UserSets);
  const { cardId } = props;
  const dispatch = useDispatch();
  const [isStarred, setIsStarred] = useState(false);
  const [openCreateSet, setOpenCreateSet] = useState(false);
  const starClick = (setId: string) => {
    dispatch({
      type: addCardToMySetAction.type,
      payload: {
        data: {
          cardId: cardId,
          setId: setId,
        },
        onSuccess: () => {
          setIsStarred(true);
        },
        onError: (message: string) => {
          // toast({
          //     title: 'Failed',
          //     description: message ? message : "Please try again!",
          //     variant: 'destructive',
          // })
        },
      },
    });
  };
  const onCreate = (values: any) => {
    dispatch({
      type: quickAddNewSetAction.type,
      payload: {
        data: {
          set_name: values.set_name,
          cardId: cardId,
        },
        onSuccess: () => {
          setOpenCreateSet(false);
          toast({
            title: 'Success',
            variant: 'default',
          });
        },
        onError: (message: string) => {
          toast({
            title: 'Failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          });
        },
      },
    });
  };
  useEffect(() => {
    if (cardId && Array.isArray(mySets?.sets)) {
      const isCardStarred = mySets?.sets.some((set: any) =>
        set.cards.some((card: any) => card.id === cardId),
      );
      setIsStarred(isCardStarred);
    }
  }, [cardId, mySets]);
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button variant={'ghost'} className="h-fit w-fit rounded-full p-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="border-none p-0">
                  <Star
                    className={`${isStarred ? 'fill-yellow-400' : ''} cursor-pointer`}
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
          <ScrollArea className="h-32">
            <div className="grid w-fit">
              {Array.isArray(mySets?.sets) &&
                mySets?.sets?.map((set: any, index: number) => {
                  return (
                    <div key={index} className="w-full">
                      <Button
                        variant={'ghost'}
                        className="flex h-full w-full flex-col overflow-hidden"
                        onClick={() => {
                          starClick(set.id);
                        }}
                      >
                        <p className="h-fit w-full truncate text-center hover:cursor-pointer">
                          {set.name}
                        </p>
                      </Button>
                      <Separator />
                    </div>
                  );
                })}
            </div>
          </ScrollArea>
          <Button
            className="w-full rounded-none"
            variant={'ghost'}
            onClick={() => {
              setOpenCreateSet(true);
            }}
          >
            <PlusCircle width={18} height={18} />
          </Button>
        </PopoverContent>
      </Popover>
      <CommonPopup
        title="Create a new set"
        open={openCreateSet}
        setOpen={setOpenCreateSet}
        isShowTrigger={false}
        children={<SetForm onCreate={onCreate} />}
        className={'h-fit w-full'}
      />
    </>
  );
};

export default UserSetPopover;
