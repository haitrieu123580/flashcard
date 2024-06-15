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
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import {
  createCardAction,
  deleteCardAction,
  editCardAction,
} from '@/redux/card/slice';
import { editSetAction, getSetByIdAction } from '@/redux/set/slice';
import Constants from '@/lib/Constants';
import { objectToFormData } from '@/lib/utils';

const EditSetContainer = () => {
  const { id } = useParams();
  const { data, isLoading } = useSelector((state: any) => state.Set);
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
    level: z.string().optional(),
    is_delete_image: z.string().optional(),
  });

  const getSetById = (id: string) => {
    scrollTo(0, 0);
    dispatch({
      type: getSetByIdAction.type,
      payload: {
        id: id,
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
      image: values.image.image ? values.image.image : null, // image not change
      is_delete_image:
        !values.image.image && !values.image.path ? 'true' : 'false',
      example: values?.example ? JSON.stringify(values?.example) : null,
    };
    const formData = objectToFormData(submitValues);
    dispatch({
      type: editCardAction.type,
      payload: {
        id: id,
        data: formData,
        onSuccess: () => {
          toast({
            title: 'Edit card success',
            variant: 'default',
          });
          getSetById(data?.id);
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
      type: deleteCardAction.type,
      payload: {
        id: id,
        onSuccess: () => {
          //? should do this?
          toast({
            title: 'Delete success',
            variant: 'default',
          });
          getSetById(data?.id);
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
      setId: data?.id,
      image: values.image.image ? values.image.image : null,
      example: values?.example ? JSON.stringify(values?.example) : null,
      level: values?.level,
    };
    const formData = objectToFormData(submitValues);
    dispatch({
      type: createCardAction.type,
      payload: {
        data: formData,
        onSuccess: () => {
          //? should do this?
          setShowCardFormPopup(false);
          toast({
            title: 'Create card success',
            variant: 'default',
          });
          getSetById(data?.id);
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
      set_name: data?.name || '',
      set_description: data?.description || '',
      set_image: {
        image: null,
        path: data?.image || '',
      },
      level: data?.level,
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
      type: editSetAction.type,
      payload: {
        id: data?.id,
        data: formData,
        onSuccess: () => {
          toast({
            title: 'Edit success',
            variant: 'default',
          });
          getSetById(data?.id);
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
    if (data?.id && data?.cards) {
      form.reset({
        set_name: data.name,
        set_description: data.description,
        set_image: {
          image: null,
          path: data.image || '',
        },
        level: data.level,
      });
    }
  }, [data]);

  return (
    <div className="w-full">
      <LoadingPopup open={isLoading} />
      <Form {...form}>
        <form className="flex flex-col gap-6">
          <Card>
            <CardContent>
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
                fieldName={'level'}
                label={'Level'}
                type={Constants.INPUT_TYPE.SELECT}
                options={Object.keys(Constants.LEVEL).map(
                  (key: any, index: number) => {
                    // Add type annotation to index parameter
                    return {
                      key: key,
                      label: Constants.LEVEL[key],
                    };
                  },
                )}
              />
              <FormInput
                control={form.control}
                fieldName="set_image"
                label="Image"
                type={Constants.INPUT_TYPE.FILE_UPLOAD}
                classNameInput="h-fit"
              />
            </CardContent>
          </Card>
        </form>
      </Form>
      <div className="my-6 flex items-center justify-between">
        <b>Cards</b>
      </div>
      <div className="flex flex-col">
        <div className="flex w-full flex-col gap-10">
          {data?.cards &&
            Array.isArray(data?.cards) &&
            data?.cards.map((card: any, index: number) => {
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
                    setId={data?.id}
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
              // <ScrollArea>
              <CardForm
                isEdit={false}
                setId={data?.id}
                onCreateCard={onCreateCard}
              />
              // </ScrollArea>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditSetContainer;
