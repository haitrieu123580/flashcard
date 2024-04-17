import {
    SuccessMsgResponse,
    SuccessResponse,
    FailureMsgResponse,
    FailureResponse,
} from "@src/core/ApiResponse";
import { Service, Container } from "typedi";
import { IMultipleChoiceService } from "./IMultipleChoiceService";
import { QuestionRepo } from "@src/repositories/question/QuestionRepo";
import { IQuestionRepo } from "@src/repositories/question/IQuestionRepo";

@Service()
export class MultipleChoiceService implements IMultipleChoiceService {
    private questionRepo: IQuestionRepo;
    constructor() {
        this.questionRepo = Container.get(QuestionRepo);
    }

    async getMultipleChoiceTestBySetId(req: any, res: any): Promise<any> {
        try {
            const [questionsList, count] = await this.questionRepo.GetQuestionList(req.params.set_id);
            if (count) {
                const updatedQuestionsList = questionsList.map((question: any) => {
                    return {
                        id: question.id,
                        set_id: question?.set.id,
                        question: question.question,
                        answers: question.answers,
                    }
                });
                return new SuccessResponse("Multiple choice test", updatedQuestionsList).send(res);
            }
            return new FailureMsgResponse("Multiple choice test not found").send(res);
        } catch (error) {

        }
    }
    async submitAnswer(req: any, res: any): Promise<any> {
        try {
            const answerArray = req.body.answers;
            const [questionsList, count] = await this.questionRepo.GetQuestionList(req.body.set_id);

            if (count) {
                const result = questionsList.map((question: any) => {
                    const correctAnswer = question.correct_answer;
                    const userAnswer = answerArray.find((answer: any) => answer.question_id === question.id);
                    return {
                        question_id: question.id,
                        question: question.question,
                        user_answer: userAnswer.answer,
                        correct_answer: correctAnswer,
                        is_correct: correctAnswer === userAnswer.answer,
                    }
                });
                return new SuccessResponse("Multiple choice test submit", {
                    result,
                    total_questions: count,
                    total_correct: result.filter((item: any) => item.is_correct).length,
                    total_incorrect: result.filter((item: any) => !item.is_correct).length,
                }).send(res);
            }
            return new FailureMsgResponse("Multiple choice test not found").send(res);
        } catch (error) {
            console.log("error", error);
            return new FailureMsgResponse("Internal Server Error").send(res);
        }
    }
}