import { useEffect, useMemo, useState } from 'react';
import { CheckIcon, PencilIcon, PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import QuestionForm from '@/components/admin/tests/question/QuestionForm';
import { FormInput } from '@/components/common/custom_input/CustomInput';
// import CardForm from './CardForm'
import CommonPopup from '@/components/common/popup/CommonPopup';
import EditPopup from '@/components/common/popup/EditPopup';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import {
  createQuestionAction,
  createTestKitAction,
  deleteQuestionAction,
  editQuestionAction,
  getQuestionsListBySetIdAction,
} from '@/redux/question/slice';
import Constants from '@/lib/Constants';
import { isFunction, objectToFormData, setColorLevel } from '@/lib/utils';

const KitsListPage = () => {
  const { id } = useParams();
  const { data } = useSelector((state: any) => state.Question);
  const [showCardFormPopup, setShowCardFormPopup] = useState(false);
  const dispatch = useDispatch();
  const getQuestionsListBySetId = () => {
    scrollTo(0, 0);
    dispatch({
      type: getQuestionsListBySetIdAction.type,
      payload: {
        id: id,
      },
    });
  };
  useEffect(() => {
    if (id) {
      getQuestionsListBySetId();
    }
  }, [id]);

  const onCreateNewTestKit = (level: any) => {
    dispatch({
      type: createTestKitAction.type,
      payload: {
        setId: id,
        level: level.level,
        onSuccess: () => {
          toast({
            title: 'Create test kit success',
            variant: 'default',
          });
          getQuestionsListBySetId();
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

  const onEditQuestion = (
    values: any,
    questionId: string,
    testKitId: string,
  ) => {
    const submitValues = {
      ...values,
      questionImage: values?.image?.image ? values?.image?.image : null,
    };
    const formData = objectToFormData(submitValues);
    formData.append('options', JSON.stringify(values?.options));
    dispatch({
      type: editQuestionAction.type,
      payload: {
        questionId: questionId,
        testKitId: testKitId,
        data: formData,
        onSuccess: () => {
          toast({
            title: 'Edit question success',
            variant: 'default',
          });
          getQuestionsListBySetId();
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
  const onDeleteQuestion = (questionId: string) => {
    dispatch({
      type: deleteQuestionAction.type,
      payload: {
        id: questionId,
        onSuccess: () => {
          //? should do this?
          toast({
            title: 'Delete success',
            variant: 'default',
          });
          getQuestionsListBySetId();
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
  const onCreateQuestion = (values: any, testKitId: string) => {
    const submitValues = {
      ...values,
      questionImage: values?.image?.image ? values?.image?.image : null,
    };
    const formData = objectToFormData(submitValues);
    formData.append('options', JSON.stringify(values?.options));
    dispatch({
      type: createQuestionAction.type,
      payload: {
        testId: testKitId,
        data: formData,
        onSuccess: () => {
          //? should do this?
          setShowCardFormPopup(false);
          toast({
            title: 'Create question success',
            variant: 'default',
          });
          getQuestionsListBySetId();
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
  return (
    <div>
      <div className="my-2 flex items-center justify-between">
        <CardTitle>Test kits</CardTitle>
        <CommonPopup
          open={showCardFormPopup}
          setOpen={setShowCardFormPopup}
          isShowTrigger={true}
          TriggerComponent={
            <Button type="button" className="h-fit w-fit p-0" variant={'ghost'}>
              <PlusCircle /> Create new Test kit
            </Button>
          }
          title="Add new question"
          children={
            <ScrollArea>
              <TestKitForm onCreateTestKit={onCreateNewTestKit} />
            </ScrollArea>
          }
        />
      </div>
      <Separator />
      {Array.isArray(data?.testKits) &&
        data?.testKits.map((kit: any, index: number) => {
          return (
            <>
              <Accordion type="multiple">
                <AccordionItem value={`${index}`}>
                  <AccordionTrigger className={'no-underline'}>
                    <div className="flex w-full justify-between">
                      <div className="space-x-3">
                        <Badge
                          className={setColorLevel(
                            Constants.LEVEL[
                              kit?.level as number as 0 | 1 | 2 | 3
                            ],
                          )}
                        >
                          {Constants.LEVEL[
                            kit?.level as number as 0 | 1 | 2 | 3
                          ]?.toString()}
                        </Badge>
                        <span>{kit?.questions?.length} questions</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-none">
                    <div className="flex w-full justify-end">
                      <CommonPopup
                        open={showCardFormPopup}
                        setOpen={setShowCardFormPopup}
                        isShowTrigger={true}
                        TriggerComponent={
                          <Button
                            type="button"
                            className="h-fit w-fit p-0"
                            variant={'outline'}
                          >
                            <PlusCircle />
                          </Button>
                        }
                        title="Add new question"
                        children={
                          <ScrollArea className="h-[500px] w-full">
                            <QuestionForm
                              isEdit={false}
                              testId={kit.id}
                              onCreateQuestion={(value: any) => {
                                onCreateQuestion(value, kit?.id);
                              }}
                            />
                          </ScrollArea>
                        }
                      />
                    </div>
                    {kit.questions.map((question: any, index: number) => {
                      return (
                        <Card className="my-4">
                          <QuestionForm
                            isEdit={true}
                            question={question}
                            index={index}
                            onDeleteQuestion={onDeleteQuestion}
                            onEditQuestion={onEditQuestion}
                            testId={kit.id}
                          />
                        </Card>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          );
        })}

      <div className="my-2 flex justify-center"></div>
    </div>
  );
};

export default KitsListPage;

const TestKitForm = (props: any) => {
  const { onCreateTestKit } = props;
  const form = useForm();
  const handleSubmit = (value: any) => {
    isFunction(onCreateTestKit) && onCreateTestKit(value);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
        <div className={'my-4 flex w-full justify-end'}>
          <Button type="submit" className="">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
