import { useEffect, useMemo, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import CardForm from '@/components/card-form/CardForm';
import { FormInput } from '@/components/common/custom_input/CustomInput';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import {
  approveSetAction,
  getSetByAdminAction,
  rejectSetAction,
} from '@/redux/approve-sets/slice';
import Constants from '@/lib/Constants';

const PendingSetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state: any) => state.ApproveSet);
  const [showCardFormPopup, setShowCardFormPopup] = useState(false);
  const dispatch = useDispatch();
  const formSetSchema = z.object({
    name: z.string().min(1, {
      message: 'Required',
    }),
    description: z.string().optional(),
    image: z
      .union([
        z.object({
          image: z.any().optional(),
          path: z.string().optional(),
        }),
        z.string().optional(),
      ])
      .optional(),
  });

  const getSetById = (id: string) => {
    scrollTo(0, 0);
    dispatch({
      type: getSetByAdminAction.type,
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

  const form = useForm<z.infer<typeof formSetSchema>>({
    resolver: zodResolver(formSetSchema),
    defaultValues: {
      name: data?.name || '',
      description: data?.description || '',
      image: {
        image: null,
        path: data?.image || '',
      },
    },
  });
  const approveSet = (level: number) => {
    dispatch({
      type: approveSetAction.type,
      payload: {
        id: data?.id,
        level: level,
        onSuccess: (message: string) => {
          navigate(routerPaths.ADMIN_PENDING_SETS);
          toast({
            title: 'Success',
            description: message ? message : 'Set approved!',
            variant: 'default',
          });
        },
        onError: (message: string) => {
          toast({
            title: 'Error',
            description: message ? message : 'Error!',
            variant: 'destructive',
          });
        },
      },
    });
  };
  const rejectSet = () => {
    dispatch({
      type: rejectSetAction.type,
      payload: {
        id: data?.id,
        onSuccess: (message: string) => {
          navigate(routerPaths.ADMIN_PENDING_SETS);
          toast({
            title: 'Success',
            description: message ? message : 'Set rejected!',
            variant: 'default',
          });
        },
        onError: (message: string) => {
          toast({
            title: 'Error',
            description: message ? message : 'Error!',
            variant: 'destructive',
          });
        },
      },
    });
  };

  useMemo(() => {
    if (data?.id && data?.cards) {
      form.reset({
        name: data.name,
        description: data.description,
        image: {
          image: null,
          path: data.image || '',
        },
      });
    }
  }, [data]);

  return (
    <div className="w-full">
      <LoadingPopup open={isLoading} />
      <Form {...form}>
        <form className="flex flex-col gap-6">
          <div className="my-2 flex items-center justify-between">
            <CardTitle>{data?.name}</CardTitle>
            <div className="space-x-2">
              <Popover>
                <PopoverTrigger className=" ">
                  <Button type="button" variant={'default'}>
                    {Constants.SET_STATUS.APPROVED.toUpperCase()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  {Object.keys(Constants.LEVEL).map((level: string) => {
                    const levelNumber = Number(level); // Ép kiểu về số
                    console.log('level', levelNumber);
                    return (
                      <Button
                        type="button"
                        variant={'ghost'}
                        onClick={() => {
                          approveSet(levelNumber);
                        }}
                        className="w-full"
                      >
                        {Constants.LEVEL[levelNumber].toUpperCase()}
                      </Button>
                    );
                  })}
                </PopoverContent>
              </Popover>
              <Button
                variant={'destructive'}
                type="button"
                onClick={() => {
                  rejectSet();
                }}
              >
                {Constants.SET_STATUS.REJECTED.toUpperCase()}
              </Button>
            </div>
          </div>
          <Card>
            <CardContent>
              <FormInput
                control={form.control}
                fieldName="name"
                label="Name"
                placeholder="Name"
                type={Constants.INPUT_TYPE.TEXT}
                readOnly={true}
              />
              <FormInput
                control={form.control}
                fieldName="description"
                label="Description"
                placeholder="Description"
                readOnly={true}
                type={Constants.INPUT_TYPE.TEXT}
              />
              <FormInput
                control={form.control}
                fieldName="image"
                label="Image"
                readOnly={true}
                type={Constants.INPUT_TYPE.FILE_UPLOAD}
                classNameInput="h-fit"
              />
            </CardContent>
          </Card>
          <Separator />
        </form>
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
                      readMode={true}
                      // isEdit={false}
                    />
                  </Card>
                );
              })}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PendingSetPage;
