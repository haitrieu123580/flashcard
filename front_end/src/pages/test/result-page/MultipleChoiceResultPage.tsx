import { useSelector } from "react-redux";
import {
    Card,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
const MultipleChoiceTestResultPage = () => {
    const { examData } = useSelector((state: any) => state.Test);
    return (
        <div>
            <CardTitle className="flex justify-between">
                {examData?.setName}
                <CardDescription className="text-lg font-bold text-green-300">
                    {examData?.total_correct}/{examData?.total_questions}
                </CardDescription>
            </CardTitle>

            {
                Array.isArray(examData?.result)
                && examData?.result?.map((question: any, index: number) => {
                    return (
                        <Card className="my-4 p-2" key={index}>
                            <CardTitle className="mb-2 flex justify-between items-end">
                                <span>
                                    Question: {question.question}
                                </span>
                                <CardDescription className={question.is_correct ? "text-green-400" : "text-rose-400"}>
                                    {question.is_correct ? "Correct" : "Incorrect"}
                                </CardDescription>
                            </CardTitle>
                            <CardContent className="grid grid-cols-2 gap-2">
                                {
                                    question?.answers?.map((answer: any) => {
                                        return (
                                            <div className={
                                                cn(`col-span-1 rounded-sm border p-4 
                                               ${question.user_answer === answer ? "bg-rose-200 dark:text-black" : ""} 
                                              `, (String(question.correct_answer).toLowerCase() === String(answer).toLowerCase()) ? "bg-green-200 dark:text-black" : "")
                                            }>
                                                {answer}
                                            </div>
                                        )
                                    })
                                }
                                <div className={
                                    cn(`col-span-2  p-4`)
                                }>
                                    <span>Correct answers is: </span> <span className="text-green-500">{question?.correct_answer}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div >
    )
}

export default MultipleChoiceTestResultPage