import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Constants from "@/lib/Constants";
import { cn, isFunction, replacePathWithId } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LoadingPopup from "@/components/common/loading/loading-popup/LoadingPopup";
import { Progress } from "@/components/ui/progress";
import CommonPopup from "@/components/common/popup/CommonPopup";
import {
    getTestBySetIdAction,
    submitAnswersAction
} from "@/redux/test/slice";
import { createQuestionsBySetIdAction, saveUserAnswerAction } from "@/redux/user-tests/slice";
import AuthError from "@/components/auth-error/AuthError";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { routerPaths } from "@/routes/path";

interface Question {
    id: string;
    questionType: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
}

interface TestData {
    id: string;
    questions: Question[];
}

interface RootState {
    Test: {
        examData: any;
        isLoading: boolean;
        result: any;
    };
}

const MultipleChoiceTestPage = () => {
    const { id } = useParams<{ id: string }>(); //set id
    const { data, isLoading } = useSelector((state: any) => state.UserTest);
    const [currentCard, setCurrentCard] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [secondsLeft, setSecondsLeft] = useState(10); // 10 giây cho mỗi câu hỏi
    const [showPopupResult, setShowPopupResult] = useState(false);

    const getTestBySetId = (id: string) => {
        dispatch({
            type: createQuestionsBySetIdAction.type,
            payload: {
                id: id,
                onSuccess: (data: any) => { },
                onError: (error: any) => { }
            }
        });
    };

    useEffect(() => {
        if (id) {
            getTestBySetId(id);
        }
    }, [id]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft(prevSecondsLeft => {
                if (prevSecondsLeft > 0) {
                    return prevSecondsLeft - 1;
                } else {
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (secondsLeft === 0) {
            if (currentCard < (data?.questions?.length || 0) - 1) {
                showCard(currentCard + 1);
                setSecondsLeft(10); // Reset lại bộ đếm thời gian
            } else {
                setSecondsLeft(0);
                handleSubmit(); // Nếu là câu hỏi cuối cùng thì submit
            }
        }
    }, [secondsLeft, currentCard, data?.questions?.length]);

    const handleSubmit = () => {
        if (secondsLeft === 0) {
            const answers = Object.keys(selectedAnswers).map(questionId => ({
                questionId,
                answer: selectedAnswers[questionId]
            }));
            const submitData = {
                testId: data?.id,
                answers: answers
            };
            dispatch({
                type: saveUserAnswerAction.type,
                payload: {
                    data: submitData,
                    onSuccess: (data: any) => {
                        setShowPopupResult(true);
                    },
                    onError: (error: any) => { }
                }
            });
        }
    };


    const showCard = (index: number) => {
        if (index >= (data?.questions?.length || 0) || index < 0) {
            return;
        }
        setCurrentCard(index);
        if (index < (data?.questions?.length || 0) - 1) {
            setSecondsLeft(10); // Reset lại bộ đếm thời gian khi không phải là câu hỏi cuối cùng
        }
    };

    const handleOptionChange = (questionId: string, value: string, question: Question) => {
        if (isOptionSelected(questionId)) {
            return; // Nếu đã chọn rồi thì không làm gì cả
        }
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: value }));

        // Chuyển đến câu hỏi tiếp theo
        if (currentCard < (data?.questions?.length || 0) - 1) {
            setSecondsLeft(10); // Reset lại bộ đếm thời gian khi người dùng chọn câu trả lời
            setTimeout(() => {
                showCard(currentCard + 1);
            }, 1000); // Đợi 1 giây trước khi chuyển sang câu hỏi tiếp theo
        }
    };


    const isOptionSelected = (questionId: string) => {
        return selectedAnswers.hasOwnProperty(questionId);
    };

    const ReTake = () => {
        getTestBySetId(id || "");
        setShowPopupResult(false);
        setCurrentCard(0);
        setSelectedAnswers({});
        setSecondsLeft(10);
    }

    return (
        <div>
            <LoadingPopup open={isLoading} />
            {(Array.isArray(data?.questions) && data.questions.length > 0) ?
                <>
                    {data.questions.map((question: any, index: number) => {
                        if (index !== currentCard) return null;
                        return (
                            <Card className="my-4 p-2" key={index}>
                                <CardTitle className="flex gap-2 my-6 flex-col">
                                    <div>Question {index + 1}:</div>
                                    <div className="w-fit m-auto">
                                        {question.questionType === Constants.QUESTION_TYPE.IMAGE
                                            ? <div className="m-auto">
                                                <img src={question.questionText} alt="question" className="h-72 w-72 object-cover" />
                                            </div>
                                            : <div>{question.questionText}</div>}
                                    </div>
                                </CardTitle>
                                <CardContent className="grid grid-cols-2 gap-2">
                                    {question.options.map((answer: any, idx: any) => {
                                        const isSelected = selectedAnswers[question.id] === answer;
                                        const isCorrect = isSelected && answer === question.correctAnswer;
                                        const isIncorrect = isSelected && answer !== question.correctAnswer;
                                        const isDisabled = isOptionSelected(question.id); // Kiểm tra nếu đã chọn lựa chọn rồi thì vô hiệu hóa các lựa chọn khác

                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    if (!isDisabled) { // Chỉ cho phép chọn nếu chưa chọn lựa chọn nào
                                                        handleOptionChange(question.id, answer, question);
                                                    }
                                                }}
                                                className={cn(`col-span-1 rounded-sm border p-4 cursor-pointer`, {
                                                    "border-green-500": isCorrect,
                                                    "border-red-500": isIncorrect,
                                                    "border-gray-300": !isSelected,
                                                    "cursor-not-allowed opacity-50": isDisabled // Thêm lớp để vô hiệu hóa các lựa chọn đã chọn
                                                })}
                                            >
                                                {answer}
                                            </div>
                                        );
                                    })}
                                </CardContent>
                                <CardFooter className="flex justify-end gap-4">
                                    <div className="col-span-1 md:col-span-3 flex justify-end gap-6 items-center h-8 w-full">
                                        <div className="text-blue-500 w-full">
                                            <div>
                                                {secondsLeft} s
                                            </div>
                                            <Progress
                                                value={secondsLeft * 10}
                                                max={10}
                                                color="red"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </>
                :
                <div>
                    <AuthError />
                </div>
            }

            <CommonPopup
                title="Congratulations!"
                open={showPopupResult}
                // open={true}
                setOpen={setShowPopupResult}
                isShowTrigger={false}
                children={
                    <PopUpResult
                        id={id}
                        onReTake={ReTake}
                        onViewDetail={() => {
                            navigate(replacePathWithId(routerPaths.USER_TEST_MULTIPLE_CHOICE_RESULT, data?.id)); //data is the test
                        }}
                    />
                }
                className={"w-full h-fit"}
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
            <p>
                Your score is {result?.score}/{result?.totalQuestions}
            </p>
            <div className="my-4 flex justify-center gap-2">

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
        </>

    );
};
