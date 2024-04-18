import { IQuestionRepo } from "./IQuestionRepo";
import { Service } from "typedi";
import { AppDataSource } from "@src/data-source";
import { Questions } from "@src/entity/Questions";
import { Sets } from "@src/entity/Sets";
import { Equal } from "typeorm";
@Service()
export class QuestionRepo implements IQuestionRepo {
    private questionsDataSource = AppDataSource.getRepository(Questions);
    private setDataSource = AppDataSource.getRepository(Sets);

    async GetQuestionList(setId: string): Promise<any> {
        const set = await this.setDataSource.findOne({
            where: {
                id: setId
            }
        })

        if (!set) return false;

        const result = await this.questionsDataSource.findAndCount({
            relations: ['set'],
            where: {
                set: {
                    id: setId
                }
                // set: set
            },
        })
        return result;
    }

    async GetQuestion(id: string): Promise<any> {
        return await this.questionsDataSource.findOne({
            where: {
                id: id
            },
            relations: ['set']
        })
    }

    async CreateQuestion(data: any): Promise<boolean> {
        const set = await this.setDataSource.findOne({
            where: {
                id: data.set_id
            },
            relations: ['questions']
        })
        const newQuestion = new Questions();
        newQuestion.question = data.question;
        newQuestion.answers = data.answers;
        newQuestion.correct_answer = data.correct_answer;
        if (!set) { return false }
        newQuestion.set = set;
        const result = await this.questionsDataSource.save(newQuestion);
        if (result) {
            return true;
        }
        return false;
    }

    async UpdateQuestion(id: string, question: any): Promise<boolean> {
        const updateQuestion = await this.questionsDataSource.findOneBy({
            id: id
        })
        if (updateQuestion) {
            updateQuestion.question = question?.question ? question?.question : updateQuestion.question;
            updateQuestion.answers = question?.answers ? question?.answers : updateQuestion.answers;
            updateQuestion.correct_answer = question?.correct_answer ? question.correct_answer : updateQuestion.correct_answer;
            updateQuestion.updated_at = new Date();
            const result = await this.questionsDataSource.save(updateQuestion);
            if (result) {
                return true;
            }
            return false;
        }
        return false;
    }

    async DeleteQuestion(id: string): Promise<any> {
        const result = await this.questionsDataSource.delete({ id: id })
        if (result) {
            return true;
        }
        return false;
    };

    async isExistQuestion(id: string): Promise<boolean> {
        const question = await this.questionsDataSource.findOne({
            where: {
                id: id
            }
        })
        if (question) {
            return true;
        }
        return false;
    }
}