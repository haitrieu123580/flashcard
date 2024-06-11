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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import {
  createQuestionAction,
  deleteQuestionAction,
  editQuestionAction,
  getQuestionsListBySetIdAction,
} from '@/redux/question/slice';
import Constants from '@/lib/Constants';
import { objectToFormData } from '@/lib/utils';

const QuestionsListEditPage = () => {
  const { id } = useParams();
  const { data } = useSelector((state: any) => state.Question);
  const [showCardFormPopup, setShowCardFormPopup] = useState(false);
  const dispatch = useDispatch();
  const getQuestionsListBySetId = (id: string) => {
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
      getQuestionsListBySetId(id);
    }
  }, [id]);

  const onEditQuestion = (values: any, id: string, setId: string) => {
    dispatch({
      type: editQuestionAction.type,
      payload: {
        id: id,
        data: values,
        onSuccess: () => {
          toast({
            title: 'Edit question success',
            variant: 'default',
          });
          getQuestionsListBySetId(setId);
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
  const onDeleteQuestion = (questionId: string, setId: string) => {
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
          getQuestionsListBySetId(setId);
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
  const onCreateQuestion = (values: any, setid: string) => {
    dispatch({
      type: createQuestionAction.type,
      payload: {
        data: {
          ...values,
          set_id: setid,
        },
        onSuccess: () => {
          //? should do this?
          setShowCardFormPopup(false);
          toast({
            title: 'Create question success',
            variant: 'default',
          });
          getQuestionsListBySetId(setid);
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
        <CardTitle>Questions</CardTitle>
      </div>
      <Separator />
      {Array.isArray(data?.questionList) &&
        data?.questionList.map((question: any, index: number) => {
          return (
            <div className="my-6" key={index}>
              <QuestionForm
                index={index}
                question={question}
                setId={id}
                onEditQuestion={onEditQuestion}
                onDeleteQuestion={onDeleteQuestion}
              />
            </div>
          );
        })}

      <div className="my-2 flex justify-center">
        <CommonPopup
          open={showCardFormPopup}
          setOpen={setShowCardFormPopup}
          isShowTrigger={true}
          TriggerComponent={
            <Button type="button" className="h-fit w-fit p-0" variant={'ghost'}>
              <PlusCircle />
            </Button>
          }
          title="Add new question"
          children={
            <ScrollArea>
              <QuestionForm
                isEdit={false}
                setId={id}
                onCreateQuestion={onCreateQuestion}
              />
            </ScrollArea>
          }
        />
      </div>
    </div>
  );
};

export default QuestionsListEditPage;
