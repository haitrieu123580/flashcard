import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, PlusCircleIcon, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput } from '@/components/common/custom_input/CustomInput';
import DeletePopup from '@/components/common/popup/DeletePopup';
import EditPopup from '@/components/common/popup/EditPopup';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import Constants from '@/lib/Constants';
import { isFunction } from '@/lib/utils';

const QuestionForm = (props: any) => {
  const {
    index,
    question,
    isEdit = true,
    testId,
    onEditQuestion,
    onDeleteQuestion,
    onCreateQuestion,
  } = props;
  const [isImageType, setIsImageType] = useState(
    question?.questionType === Constants.QUESTION_TYPE.IMAGE,
  );
  const [showOptions, setShowOptions] = useState(
    question?.questionType !== Constants.QUESTION_TYPE.WRITTEN,
  );

  const formSchema = z.object({
    questionText: z.string().optional(),
    image: z
      .union([
        z.object({
          image: z.any().optional(),
          path: z.string().optional(),
        }),
        z.string().optional(),
      ])
      .optional(),
    correctAnswer: z.string().min(1, {
      message: 'Required',
    }),
    options: z
      .array(
        z.object({
          value: z.string().optional(),
        }),
      )
      .optional(),
    questionType: z.string().min(1, {
      message: 'Required',
    }),
    explain: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: question?.questionText || '',
      correctAnswer: question?.correctAnswer || '',
      options: Array.isArray(question?.options)
        ? question?.options.map((option: any) => ({ value: option }))
        : typeof question?.options == 'string'
          ? JSON.parse(question.options).map((option: any) => ({
              value: option,
            }))
          : [],
      questionType:
        question?.questionType.toLowerCase() || Constants.QUESTION_TYPE.CHOICE,
      image: {
        image: null,
        path: question?.questionText || '',
      },
      explain: question?.explain || '',
    },
  });

  const fields = useFieldArray({
    control: form.control,
    name: 'options',
  });

  const handleSelectType = (value: string) => {
    if (value === Constants.QUESTION_TYPE.IMAGE) {
      setIsImageType(true);
      setShowOptions(true);
    } else if (value === Constants.QUESTION_TYPE.WRITTEN) {
      setIsImageType(false);
      setShowOptions(false);
    } else {
      setIsImageType(false);
      setShowOptions(true);
    }
  };

  const onSubmit = (values: any) => {
    const submitValues = {
      questionText: values.questionText,
      correctAnswer: values.correctAnswer,
      options: values.options
        .map((answer: any) => answer.value)
        .filter(Boolean), // Loại bỏ các option trống
      questionType: values.questionType,
      image: values.image?.image || values.image?.path || null,
      explain: values.explain,
    };

    // Ensure correctAnswer is among the options for non-WRITTEN questions
    if (
      submitValues.questionType !== Constants.QUESTION_TYPE.WRITTEN &&
      !submitValues.options.includes(submitValues.correctAnswer)
    ) {
      return alert('Correct answer must be one of the answers');
    }
    if (isEdit && question?.id && testId) {
      isFunction(onEditQuestion) &&
        onEditQuestion(submitValues, question?.id, testId);
    } else {
      isFunction(onCreateQuestion) && onCreateQuestion(submitValues);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-2">
            <div>
              <div className="flex items-center justify-between">
                {isEdit ? (
                  <>
                    <b>{index + 1}</b>
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
                          isFunction(onDeleteQuestion) &&
                            onDeleteQuestion(question?.id);
                        }}
                        TriggerComponent={
                          <Button type="button" variant={'destructive'}>
                            <Trash2 width={20} />
                          </Button>
                        }
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <FormInput
              control={form.control}
              fieldName={`questionType`}
              label="Question type"
              placeholder="Question"
              type={Constants.INPUT_TYPE.SELECT}
              required={true}
              options={Object.keys(Constants.QUESTION_TYPE).map((type: any) => {
                return {
                  key: type.toLowerCase(),
                  label:
                    Constants.QUESTION_TYPE[
                      type as keyof typeof Constants.QUESTION_TYPE
                    ].toUpperCase(),
                } as { key: string; label: string };
              })}
              onChangeSelect={handleSelectType}
            />

            {isImageType ? (
              <FormInput
                control={form.control}
                fieldName={`image`}
                label="Image"
                type={Constants.INPUT_TYPE.FILE_UPLOAD}
                classNameInput="h-fit"
              />
            ) : (
              <FormInput
                control={form.control}
                fieldName={`questionText`}
                label={'Question'}
                placeholder={'Question'}
                type={Constants.INPUT_TYPE.TEXT}
              />
            )}

            {showOptions && (
              <>
                <div className="my-2 flex items-center gap-4">
                  <p className="font-semibold">Options</p>
                  <Button
                    variant={'ghost'}
                    className="h-fit w-fit p-0"
                    type="button"
                    onClick={() => {
                      fields.append({ value: '' });
                    }}
                  >
                    <PlusCircleIcon width={15} height={15} />
                  </Button>
                </div>
                {fields.fields.map((field: any, index: number) => (
                  <FormInput
                    key={field.id}
                    control={form.control}
                    fieldName={`options.${index}.value`}
                    className="my-2"
                    placeholder="Options"
                    type={Constants.INPUT_TYPE.TEXT}
                  />
                ))}
              </>
            )}

            <FormInput
              control={form.control}
              fieldName={`correctAnswer`}
              label="Correct Answer"
              placeholder="Enter correct answer"
              type={Constants.INPUT_TYPE.TEXT}
              required={true}
            />
            <FormInput
              control={form.control}
              fieldName={`explain`}
              label="Explain"
              placeholder="Enter explaination for the answer"
              type={Constants.INPUT_TYPE.TEXT}
            />
            {!isEdit && (
              <Button type="submit" variant={'default'} className="my-6 w-full">
                Save
              </Button>
            )}
          </Card>
        </form>
      </Form>
    </>
  );
};

export default QuestionForm;
