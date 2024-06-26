import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, PencilIcon, PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import CardForm from '@/components/card-form/CardForm';
import { FormInput } from '@/components/common/custom_input/CustomInput';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import LoadingSpinner from '@/components/common/loading/loading-spinner/LoadingSpinner';
import CommonPopup from '@/components/common/popup/CommonPopup';
import EditPopup from '@/components/common/popup/EditPopup';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import {
  createUserCardAction,
  deleteUserCardAction,
  editUserCardAction,
} from '@/redux/user-cards/slice';
import {
  editUserSetAction,
  getUserSetByIdAction,
} from '@/redux/user-sets/slice';
import Constants from '@/lib/Constants';
import { objectToFormData } from '@/lib/utils';

const EditMySet = () => {
  const { id } = useParams();
  const { mySets, set, isLoading } = useSelector(
    (state: any) => state.UserSets,
  );
  const [showCardFormPopup, setShowCardFormPopup] = useState(false);
  const dispatch = useDispatch();
  const formSetSchema = z.object({
    set_name: z.string().min(1, {
      message: 'Required',
    }),
    set_description: z.string().optional(),
    set_image: z
      .union([
        z.object({
          image: z.any().optional(),
          path: z.string().optional(),
        }),
        z.string().optional(),
      ])
      .optional(),
    is_delete_image: z.string().optional(),
  });

  const getSetById = (id: string) => {
    scrollTo(0, 0);
    dispatch({
      type: getUserSetByIdAction.type,
      payload: {
        id: id,
        // onSuccess: () => {
        // },
        // onError: (error: string) => {
        // }
      },
    });
  };

  useEffect(() => {
    if (id) {
      getSetById(id);
    }
  }, [id]);

  const onEditCard = (values: any, id: string, setId: string) => {
    const submitValues = {
      ...values,
      setId: setId,
      image: values.image.image ? values.image.image : null,
      is_delete_image:
        !values.image.image && !values.image.path ? 'true' : 'false',
      example: values?.example ? JSON.stringify(values?.example) : null,
    };
    const formData = objectToFormData(submitValues);
    dispatch({
      type: editUserCardAction.type,
      payload: {
        id: id,
        data: formData,
        onSuccess: () => {
          toast({
            title: 'Edit card success',
            variant: 'default',
          });
          getSetById(set?.id);
        },
        onError: (message: string) => {
          toast({
            title: 'Edit failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          });
        },
      },
    });
  };
  const onDeleteCard = (id: string) => {
    dispatch({
      type: deleteUserCardAction.type,
      payload: {
        id: id,
        onSuccess: () => {
          //? should do this?
          toast({
            title: 'Delete success',
            variant: 'default',
          });
          getSetById(set?.id);
        },
        onError: (message: string) => {
          toast({
            title: 'Delete failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          });
        },
      },
    });
  };
  const onCreateCard = (values: any) => {
    const submitValues = {
      ...values,
      setId: set?.id,
      image: values.image.image ? values.image.image : null,
      example: values?.example ? JSON.stringify(values?.example) : null,
    };
    const formData = objectToFormData(submitValues);
    dispatch({
      type: createUserCardAction.type,
      payload: {
        data: formData,
        onSuccess: () => {
          //? should do this?
          setShowCardFormPopup(false);
          toast({
            title: 'Create card success',
            variant: 'default',
          });
          getSetById(set?.id);
        },
        onError: (message: string) => {
          toast({
            title: 'Create failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          });
        },
      },
    });
  };
  const form = useForm<z.infer<typeof formSetSchema>>({
    resolver: zodResolver(formSetSchema),
    defaultValues: {
      set_name: set?.name || '',
      set_description: set?.description || '',
      set_image: {
        image: null,
        path: set?.image || '',
      },
    },
  });

  const onSubmitSet = (values: any) => {
    const submitValues = {
      ...values,
      set_image: values.set_image.image ? values.set_image.image : null,
      is_delete_image:
        !values.set_image.image && !values.set_image.path ? 'true' : 'false',
    };
    const formData = objectToFormData(submitValues);
    dispatch({
      type: editUserSetAction.type,
      payload: {
        id: set?.id,
        data: formData,
        onSuccess: () => {
          toast({
            title: 'Edit success',
            variant: 'default',
          });
          getSetById(set?.id);
        },
        onError: (message: string) => {
          toast({
            title: 'Edit failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          });
        },
      },
    });
  };
  useMemo(() => {
    if (set?.id && set?.cards) {
      form.reset({
        set_name: set.name,
        set_description: set.description,
        set_image: {
          image: null,
          path: set.image || '',
        },
      });
    }
  }, [set]);

  return (
    <div className="w-full">
      <LoadingPopup open={isLoading} />
      <Form {...form}>
        <form className="flex flex-col gap-6">
          <Card className="p-4">
            <div className="my-2 flex items-center justify-between">
              <CardTitle>Edit set</CardTitle>
              <EditPopup
                TriggerComponent={
                  <Button type="button" variant={'ghost'}>
                    <CheckIcon width={20} />
                  </Button>
                }
                onConfirmEdit={form.handleSubmit(onSubmitSet)}
              />
            </div>
            <FormInput
              control={form.control}
              fieldName="set_name"
              label="Name"
              placeholder="Name"
              type={Constants.INPUT_TYPE.TEXT}
              required={true}
            />
            <FormInput
              control={form.control}
              fieldName="set_description"
              label="Description"
              placeholder="Description"
              type={Constants.INPUT_TYPE.TEXT}
            />
            <FormInput
              control={form.control}
              fieldName="set_image"
              label="Image"
              type={Constants.INPUT_TYPE.FILE_UPLOAD}
              classNameInput="h-fit"
            />
          </Card>
        </form>
      </Form>
      <div className="my-6 flex items-center justify-between">
        <b>Cards</b>
      </div>
      <div className="flex flex-col">
        <div className="flex w-full flex-col gap-6">
          {set?.cards &&
            Array.isArray(set?.cards) &&
            set?.cards.map((card: any, index: number) => {
              let convertData = null;
              if (typeof card.example === 'string') {
                convertData = {
                  ...card,
                  example: JSON.parse(card.example),
                };
              }
              card = convertData ? convertData : card;
              return (
                <Card className="p-4">
                  <CardForm
                    key={index}
                    index={index}
                    card={card}
                    setId={set?.id}
                    onDeleteCard={onDeleteCard}
                    onEditCard={onEditCard}
                  />
                </Card>
              );
            })}
        </div>
        <div className="my-2 flex justify-center">
          <CommonPopup
            open={showCardFormPopup}
            setOpen={setShowCardFormPopup}
            isShowTrigger={true}
            TriggerComponent={
              <Button
                type="button"
                className="h-fit w-fit p-0"
                variant={'ghost'}
              >
                <PlusCircle />
              </Button>
            }
            title="Add new card"
            children={
              <ScrollArea>
                <CardForm
                  className="h-[500px]"
                  isEdit={false}
                  setId={set?.id}
                  onCreateCard={onCreateCard}
                  openCollapsible="item-1"
                />
              </ScrollArea>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditMySet;
