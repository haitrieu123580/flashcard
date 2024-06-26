import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useReloadAlert from '@/hook/useReloadPage';
import { routerPaths } from '@/routes/path';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { CheckIcon } from 'lucide-react';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import AuthError from '@/components/auth-error/AuthError';
import { FormInput } from '@/components/common/custom_input/CustomInput';
import Congrat from '@/components/common/image/Congrat';
import Sad from '@/components/common/image/Sad';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import CommonPopup from '@/components/common/popup/CommonPopup';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { getTestBySetIdAction, submitAnswersAction } from '@/redux/test/slice';
import {
  createQuestionsBySetIdAction,
  saveUserAnswerAction,
} from '@/redux/user-tests/slice';
import Constants from '@/lib/Constants';
import { cn, isFunction, replacePathWithId } from '@/lib/utils';

interface Question {
  id: string;
  questionType: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const MultipleChoiceTestPage = () => {
  const { id } = useParams<{ id: string }>(); // set id
  const { data, isLoading } = useSelector((state: any) => state.UserTest);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const form = useForm();
  const [currentCard, setCurrentCard] = useState(0);
  const [showPopupResult, setShowPopupResult] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // State to track if the correct answer should be shown
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // State to track if the answer was correct or not
  const [searchParams, setSearchParams] = useSearchParams();
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<number | null>(null);

  const getTestBySetId = useCallback(
    (id: string, level: number | any = '') => {
      dispatch({
        type: createQuestionsBySetIdAction.type,
        payload: {
          id: id,
          level: level,
          onSuccess: (data: any) => {},
          onError: (error: any) => {},
        },
      });
    },
    [dispatch],
  );

  useMemo(() => {
    if (id) {
      if (searchParams.get('level')) {
        getTestBySetId(id, searchParams.get('level'));
      } else {
        getTestBySetId(id);
      }
    }
  }, [id, searchParams, getTestBySetId]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current!);
  }, [currentCard, data?.questions?.length]);

  const startTimer = () => {
    setProgress(100);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prev - 0.1;
      });
    }, 10);
  };

  const handleTimeout = () => {
    setShowCorrectAnswer(true);
    setTimeout(() => {
      if (currentCard < (data?.questions?.length || 0) - 1) {
        showCard(currentCard + 1);
        setShowCorrectAnswer(false);
        startTimer();
      } else {
        form.handleSubmit(handleSubmit)(); // Ensure form submission on last question timeout
      }
    }, 3000);
  };

  const handleSubmit = (values: any) => {
    // Handle the form submission logic here
    let answers;
    let submitData;
    if (values) {
      answers = Object.keys(values).map((questionId) => ({
        questionId,
        answer: values[questionId],
      }));
      submitData = {
        testId: data?.id,
        answers: answers,
      };
    }
    dispatch({
      type: saveUserAnswerAction.type,
      payload: {
        data: submitData,
        onSuccess: (data: any) => {
          setShowPopupResult(true);
        },
        onError: (error: any) => {},
      },
    });
  };

  const showCard = (index: number) => {
    if (index >= (data?.questions?.length || 0) || index < 0) {
      return;
    }
    setCurrentCard(index);
    setIsCorrect(false); // Reset the correctness state for the new question
  };

  const handleOptionChange = (
    questionId: string,
    value: string,
    question: Question,
  ) => {
    setShowCorrectAnswer(true); // Hiển thị đáp án đúng trước
    setIsCorrect(value === question.correctAnswer); // Update the correctness state
    form.setValue(questionId, value.trim().toLowerCase());

    setTimeout(() => {
      if (currentCard < (data?.questions?.length || 0) - 1) {
        setShowCorrectAnswer(false);
        setCurrentCard(currentCard + 1);
        startTimer();
      } else {
        form.handleSubmit(handleSubmit)(); // Ensure form submission on last question selection
      }
    }, 2000);
  };

  const handleWrittenAnswer = (
    questionId: string,
    value: string,
    question: Question,
  ) => {
    setShowCorrectAnswer(true); // Hiển thị đáp án đúng trước
    setIsCorrect(
      value.trim().toLowerCase() ===
        question.correctAnswer.trim().toLowerCase(),
    ); // Update the correctness state
    form.setValue(questionId, value.trim().toLowerCase());
    setTimeout(() => {
      if (currentCard < (data?.questions?.length || 0) - 1) {
        setShowCorrectAnswer(false);
        setCurrentCard(currentCard + 1);
        startTimer();
      } else {
        form.handleSubmit(handleSubmit)(); // Ensure form submission on last question selection
      }
    }, 2000);
  };

  const ReTake = () => {
    getTestBySetId(id || '');
    setShowPopupResult(false);
    setCurrentCard(0);
    setShowCorrectAnswer(false);
    startTimer();
    // form.reset(
    //   data?.questions?.reduce((acc: any, question: any) => {
    //     acc[question.id] = '';
    //     return acc;
    //   }, {}),
    // );
  };

  useReloadAlert();

  return (
    <div className="h-full">
      <LoadingPopup open={isLoading} />
      {Array.isArray(data?.questions) && data.questions.length > 0 ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {data.questions.map((question: any, index: number) => {
                if (index !== currentCard) return null;
                return (
                  <div
                    className="flex h-full w-full flex-col gap-6"
                    key={index}
                  >
                    <CardHeader className="">
                      <CardTitle className="my-6 flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span>Question {index + 1}:</span>
                          <span className="text-primary">
                            {Math.ceil(progress / 10)} s
                          </span>
                        </div>
                        <div className="m-auto min-h-40 w-fit">
                          {question.questionType ===
                          Constants.QUESTION_TYPE.IMAGE ? (
                            <div className="m-auto">
                              <img
                                src={question.questionText}
                                alt="question"
                                className="h-72 w-72 object-cover"
                              />
                            </div>
                          ) : (
                            <div>{question.questionText}</div>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <div className="py-4">
                      <CardContent className="grid grid-cols-2 gap-2">
                        {
                          <>
                            {question?.questionType ===
                            Constants.QUESTION_TYPE.WRITTEN ? (
                              <div className="col-span-2">
                                <FormInput
                                  control={form.control}
                                  fieldName={question?.id}
                                  type={Constants.INPUT_TYPE.TEXT}
                                  label="Your answer"
                                  icon={<CheckIcon />}
                                  onClickIcon={() => {
                                    handleWrittenAnswer(
                                      question?.id,
                                      form.getValues(question?.id),
                                      question,
                                    );
                                  }}
                                  alignIcon="right"
                                />
                              </div>
                            ) : (
                              <div className="col-span-2">
                                <FormInput
                                  control={form.control}
                                  fieldName={question.id}
                                  type={Constants.INPUT_TYPE.RADIO}
                                  options={question?.options?.map(
                                    (answer: any) => {
                                      return {
                                        key: answer,
                                        label: answer,
                                      };
                                    },
                                  )}
                                  onChangeSelect={(value: any) => {
                                    handleOptionChange(
                                      question.id,
                                      value,
                                      question,
                                    );
                                  }}
                                />
                              </div>
                            )}
                            <div className="my-2 h-4 w-full">
                              {showCorrectAnswer && (
                                <div
                                  className={`mt-2 ${isCorrect ? 'text-green-500' : 'text-red-500'} w-full text-nowrap`}
                                >
                                  {isCorrect
                                    ? 'Correct'
                                    : `Incorrect. Correct Answer: ${question.correctAnswer} `}{' '}
                                  <span>
                                    {' '}
                                    {question?.explain
                                      ? `- ${question.explain}`
                                      : ''}
                                  </span>
                                </div>
                              )}
                            </div>
                          </>
                        }
                      </CardContent>
                      <CardFooter className="flex justify-end gap-4">
                        <div className="col-span-1 flex h-8 w-full items-center justify-end gap-6 md:col-span-3">
                          <div className="w-full text-blue-500">
                            {/* <div>{Math.ceil(progress / 10)} s</div> */}
                            {/* <Progress
                                                            value={progress}
                                                            max={100}
                                                            color="red"
                                                            className="w-full"
                                                        /> */}
                          </div>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                );
              })}
            </form>
          </Form>
        </>
      ) : (
        <div>
          <AuthError />
        </div>
      )}

      <CommonPopup
        title="Congratulations!"
        open={showPopupResult}
        setOpen={setShowPopupResult}
        isShowTrigger={false}
        children={
          <PopUpResult
            id={id}
            onReTake={ReTake}
            onViewDetail={() => {
              navigate(
                replacePathWithId(
                  routerPaths.USER_TEST_MULTIPLE_CHOICE_RESULT,
                  data?.id,
                ),
              ); //data is the test
            }}
          />
        }
        className={'h-fit w-full'}
      />
    </div>
  );
};

export default MultipleChoiceTestPage;

const PopUpResult = (props: any) => {
  const { id, onReTake, onViewDetail } = props;
  const { result } = useSelector((state: any) => state.UserTest);
  return (
    <>
      <p className="text-center text-xl font-bold text-green-500">
        Your score is {result?.score}/{result?.totalQuestions}
      </p>
      <div className="m-auto my-4 h-52 w-52">
        {result?.score == 0 ? <Sad /> : <Congrat />}
      </div>
      <div className="my-8 flex justify-center gap-2">
        <Button
          variant={'default'}
          onClick={() => {
            isFunction(onReTake) && onReTake();
          }}
        >
          Retake Test
        </Button>
        <Button
          variant={'outline'}
          onClick={() => {
            isFunction(onViewDetail) && onViewDetail();
          }}
        >
          View Result Detail
        </Button>
      </div>
      <Button variant={'link'} className="m-auto w-full">
        <Link
          to={replacePathWithId(
            result?.set?.mySet
              ? routerPaths.LEARN_MY_SET
              : routerPaths.LEARN_FLASHCARD,
            result?.set?.id,
          )}
        >
          Back to Learning
        </Link>
      </Button>
    </>
  );
};
