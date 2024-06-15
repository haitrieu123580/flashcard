import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import NestedCardFieldArray from '@/components/card-form/NestedCardFieldArray';
import { FormInput } from '@/components/common/custom_input/CustomInput';
import LoadingSpinner from '@/components/common/loading/loading-spinner/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Constants from '@/lib/Constants';
import { isFunction } from '@/lib/utils';

const SetForm = (props: any) => {
  const {
    defaultValues,
    onCreate,
    className,
    showCards = true,
    showLevel,
  } = props;
  const formSetCardSchema = z.object({
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
    cards: z
      .array(
        z.object({
          term: z
            .string()
            .min(1, {
              message: 'Required',
            })
            .optional(),
          define: z
            .string()
            .min(1, {
              message: 'Required',
            })
            .optional(),
          image: z
            .union([
              z.object({
                image: z.any().optional(),
                path: z.string().optional(),
              }),
              z.string().optional(),
            ])
            .optional(),
          example: z
            .array(
              z.object({
                sentence: z.string().optional(),
                translation: z.string().optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),
  });
  const form = useForm<z.infer<typeof formSetCardSchema>>({
    resolver: zodResolver(formSetCardSchema),
    defaultValues: {
      set_name: defaultValues?.name || '',
      set_description: defaultValues?.description || '',
      set_image: {
        image: null,
        path: defaultValues?.image || '',
      },
      level: defaultValues?.level || '',
      cards: defaultValues?.cards || [
        {
          term: '',
          define: '',
          image: {
            image: null,
            path: '',
          },
          example: defaultValues?.cards?.example
            ? JSON.parse(defaultValues?.cards?.example)
            : [{ sentence: '', translation: '' }],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'cards',
  });

  const onSubmit = (values: any) => {
    isFunction(onCreate) && onCreate(values);
  };
  useMemo(() => {
    if (defaultValues?.id && defaultValues?.cards) {
      form.reset({
        set_name: defaultValues.name,
        set_description: defaultValues.description,
        set_image: {
          image: null,
          path: defaultValues.image || '',
        },
        level: defaultValues.level,
        cards: defaultValues.cards.map((card: any) => ({
          term: card.term,
          define: card.define,
          image: {
            image: null,
            path: card.image || '',
          },
          example: card.example
            ? JSON.parse(card.example)
            : [{ sentence: '', translation: '' }],
        })),
      });
    }
  }, [defaultValues]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create new Set</CardTitle>
            </CardHeader>
            <CardContent>
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
              {showLevel && (
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
              )}
              <FormInput
                control={form.control}
                fieldName="set_image"
                label="Image"
                type={Constants.INPUT_TYPE.FILE_UPLOAD}
                classNameInput="h-fit"
              />
            </CardContent>
          </Card>
          {showCards && (
            <>
              {/* <Separator /> */}
              <b>Cards</b>
              <div className="flex flex-col">
                {/* <ScrollArea className="h-96 w-full "> */}
                {fields.map((field, index) => {
                  return (
                    <Card className="my-4 p-2" key={field.id}>
                      <div>
                        <div className="my-2 flex items-center justify-between">
                          <b>{index + 1}</b>
                          <Button
                            onClick={() => {
                              remove(index);
                            }}
                            variant={'destructive'}
                          >
                            <Trash2 width={20} height={20} />
                          </Button>
                        </div>
                        {/* <Separator /> */}
                      </div>
                      <div className="flex justify-between gap-1">
                        <FormInput
                          control={form.control}
                          fieldName={`cards[${index}].term`}
                          label="Term"
                          placeholder="Term"
                          type={Constants.INPUT_TYPE.TEXT}
                          className="w-1/2"
                          required={true}
                        />
                        <FormInput
                          control={form.control}
                          fieldName={`cards[${index}].define`}
                          label="Define"
                          placeholder="Define"
                          type={Constants.INPUT_TYPE.TEXT}
                          className="w-1/2"
                          required={true}
                        />
                      </div>
                      <FormInput
                        control={form.control}
                        fieldName={`cards[${index}].image`}
                        label="Image"
                        type={Constants.INPUT_TYPE.FILE_UPLOAD}
                        classNameInput="h-fit"
                      />
                      <NestedCardFieldArray
                        nestIndex={index}
                        control={form.control}
                        fieldName={'cards'}
                        nestedFieldName={'example'}
                      />
                    </Card>
                  );
                })}

                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      append({
                        term: '',
                        define: '',
                        image: { image: null, path: '' },
                        example: [{ sentence: '', translation: '' }],
                      });
                    }}
                    type="button"
                    variant={'ghost'}
                  >
                    <PlusCircle />
                  </Button>
                </div>

                {/* </ScrollArea> */}
              </div>
            </>
          )}
          <div className="flex justify-end">
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SetForm;
