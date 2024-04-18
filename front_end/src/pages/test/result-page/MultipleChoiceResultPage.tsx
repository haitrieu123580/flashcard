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
            <div>
                <h1>Multiple Choice Test Result Page</h1>
                <span>{examData?.total_correct}/{examData?.total_questions}</span>
            </div>
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
                                               ${question.user_answer === answer ? "bg-rose-200" : ""} 
                                              `, (String(question.correct_answer).toLowerCase() === String(answer).toLowerCase()) ? "bg-green-200" : "")
                                            }>
                                                {answer}
                                            </div>
                                        )
                                    })
                                }
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div >
    )
}

export default MultipleChoiceTestResultPage