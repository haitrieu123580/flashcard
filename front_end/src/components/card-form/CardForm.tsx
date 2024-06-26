import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, PencilIcon, PlusCircleIcon, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput } from '@/components/common/custom_input/CustomInput';
import DeletePopup from '@/components/common/popup/DeletePopup';
import EditPopup from '@/components/common/popup/EditPopup';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Constants from '@/lib/Constants';
import { cn, isFunction } from '@/lib/utils';

const CardForm = (props: any) => {
  const {
    index,
    card,
    isEdit = true,
    setId,
    onDeleteCard,
    onEditCard,
    onCreateCard,
    openCollapsible = '',
    className = '',
    readMode = false,
  } = props;
  const formSchema = z.object({
    term: z.string().min(1, {
      message: 'Required',
    }),
    define: z.string().min(1, {
      message: 'Required',
    }),
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
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: card?.term || '',
      define: card?.define || '',
      image: {
        image: null,
        path: card?.image || '',
      },
      example: card?.example
        ? card?.example
        : [{ sentence: '', translation: '' }],
    },
  });
  const fields = useFieldArray({
    control: form.control,
    name: 'example',
  });
  const onSubmit = (values: any) => {
    if (isEdit && card?.id && setId) {
      isFunction(onEditCard) && onEditCard(values, card?.id, setId);
    } else {
      isFunction(onCreateCard) && onCreateCard(values);
    }
  };
  return (
    <ScrollArea className={cn('h-fit w-full', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion type="single" collapsible defaultValue={openCollapsible}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="w-full">
                  <div className="flex w-full items-center justify-between">
                    {!readMode ? (
                      <>
                        {isEdit ? (
                          <>
                            <b>{`Card ${index + 1}: ${card.term}`}</b>
                            <div className="mb-2 flex items-center justify-center">
                              <EditPopup
                                onConfirmEdit={() => {
                                  form.handleSubmit(onSubmit)();
                                }}
                                TriggerComponent={
                                  <Button type="button" variant={'ghost'}>
                                    <CheckIcon width={20} />
                                  </Button>
                                }
                              />
                              <DeletePopup
                                onConfirmDelete={() => {
                                  isFunction(onDeleteCard) &&
                                    onDeleteCard(card?.id);
                                }}
                                TriggerComponent={
                                  <Button type="button" variant={'destructive'}>
                                    <Trash2 width={20} />
                                  </Button>
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <b>{`Card ${index + 1}: ${card.term}`}</b>
                      </>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-none">
                <div className="flex justify-between gap-1">
                  <FormInput
                    control={form.control}
                    fieldName={`term`}
                    label="Term"
                    placeholder="Term"
                    type={Constants.INPUT_TYPE.TEXT}
                    className="w-1/2"
                    required={true}
                    readOnly={readMode}
                  />
                  <FormInput
                    control={form.control}
                    fieldName={`define`}
                    label="Define"
                    placeholder="Define"
                    type={Constants.INPUT_TYPE.TEXT}
                    className="w-1/2"
                    required={true}
                    readOnly={readMode}
                  />
                </div>
                <FormInput
                  control={form.control}
                  fieldName={`image`}
                  label="Image"
                  type={Constants.INPUT_TYPE.FILE_UPLOAD}
                  classNameInput="h-fit"
                  readOnly={readMode}
                />
                <div className="my-6 flex items-end gap-4">
                  <b>Examples</b>
                  {!readMode && (
                    <Button
                      type="button"
                      variant={'ghost'}
                      className={`h-fit w-fit p-0`}
                      onClick={() => {
                        fields.append({ sentence: '', translation: '' });
                      }}
                    >
                      <PlusCircleIcon width={18} height={18} />
                    </Button>
                  )}
                </div>

                {fields?.fields?.map((field, index) => {
                  return (
                    <div
                      key={field.id}
                      className="mt-4 flex items-end justify-between gap-1"
                    >
                      <FormInput
                        control={form.control}
                        fieldName={`example.${index}.sentence`}
                        label="Sentence"
                        placeholder="Sentence"
                        type={Constants.INPUT_TYPE.TEXT}
                        className="w-1/2"
                        readOnly={readMode}
                      />
                      <FormInput
                        control={form.control}
                        fieldName={`example.${index}.translation`}
                        label="Translation"
                        placeholder="Translation"
                        type={Constants.INPUT_TYPE.TEXT}
                        className="w-1/2"
                        readOnly={readMode}
                      />
                      {!readMode && (
                        <Button
                          variant={'ghost'}
                          onClick={() => fields.remove(index)}
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {!isEdit && (
            <Button type="submit" variant={'default'} className="my-6 w-full">
              Save
            </Button>
          )}
        </form>
      </Form>
    </ScrollArea>
  );
};

export default CardForm;
