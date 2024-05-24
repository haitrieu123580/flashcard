import { Service } from "typedi";
import { AppDataSource } from "../../data-source";
import { User } from "@src/entity/User";
import { Sets } from "@src/entity/Sets";
import { Tests } from '@entity/Tests';
import { TestQuestion } from '@entity/TestQuestion';
import { Cards } from '@entity/Cards';
import {
    NotFoundError,
    BadRequestError,
} from '@src/core/ApiError';
import { plainToClass, classToPlain } from 'class-transformer';
function getRandomElements<T>(array: T[], numElements: number): T[] {
    if (numElements >= array.length) {
        return array.slice(); // Trả về mảng đầy đủ nếu số phần tử cần lấy lớn hơn hoặc bằng số phần tử trong mảng
    }

    const result: T[] = [];
    const indices: number[] = [];

    // Tạo một mảng các chỉ mục duy nhất ngẫu nhiên từ 0 đến array.length - 1
    while (indices.length < numElements) {
        const randomIndex = Math.floor(Math.random() * array.length);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }

    // Lấy các phần tử từ mảng gốc tại các chỉ mục được chọn ngẫu nhiên
    for (const index of indices) {
        result.push(array[index]);
    }

    return result;
}

@Service()
export class TestService {
    private userRepo;
    private setRepo;
    private cardRepo;
    private testRepo;
    private testQuestionRepo;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
        this.setRepo = AppDataSource.getRepository(Sets);
        this.cardRepo = AppDataSource.getRepository(Cards);
        this.testRepo = AppDataSource.getRepository(Tests);
        this.testQuestionRepo = AppDataSource.getRepository(TestQuestion);
    }

    createTest = async (setId: string): Promise<any> => {
        if (!setId) throw new BadRequestError('Set ID is required');

        const flashcardSet = await this.setRepo.findOne({
            where: {
                id: setId
            },
            relations: ['cards']
        });
        if (!flashcardSet) throw new NotFoundError('Flashcard set not found');

        const test = new Tests();
        test.set = flashcardSet;
        test.questions = [];

        // Lấy các thẻ chưa làm hoặc làm sai trước đó
        const cardsToTest = flashcardSet.cards.filter(card => {
            // Logic để xác định thẻ chưa làm hoặc làm sai
            // Cần cập nhật với logic thực tế của bạn
            return true; // Giả sử tất cả các thẻ đều cần kiểm tra
        });

        for (const flashcard of cardsToTest) {
            const question = new TestQuestion();
            question.test = test;
            question.card = flashcard;

            // Lấy danh sách các card khác trong cùng một bộ từ vựng
            const otherCards = flashcardSet.cards.filter(card => card.id !== flashcard.id);

            if (flashcard.image) {
                question.questionType = 'image';
                question.questionText = flashcard.image || "oke";
                question.correctAnswer = flashcard.term;
            } else {
                // Randomly decide the type of question: term or definition
                const questionTypeIndex = Math.floor(Math.random() * 2);

                if (questionTypeIndex === 0) {
                    question.questionType = 'term';
                    question.questionText = `What is the definition of ${flashcard.term}?`;
                    question.correctAnswer = flashcard.define;
                } else {
                    question.questionType = 'definition';
                    question.questionText = `What is the term for the definition: ${flashcard.define}?`;
                    question.correctAnswer = flashcard.term;
                }
            }

            // Lấy ngẫu nhiên 2 card khác trong cùng một bộ từ vựng
            const randomCards = getRandomElements(otherCards, 2);

            // Sử dụng thuộc tính của card khác cho option3 và option4
            question.options = [
                flashcard.term,
                flashcard.define,
                randomCards[0].term, // Option 3
                randomCards[1].define // Option 4
            ];
            console.log(question);
            // await this.testQuestionRepo.save(question);
            test.questions.push(question);
        }

        await AppDataSource.transaction(async manager => {
            await manager.save(test);
            await manager.save(test.questions);

        });
        return {
            id: test.id,
            questions: test.questions.map(question => ({
                id: question.id,
                questionType: question.questionType,
                questionText: question.questionText,
                options: question.options
            })),
            name: flashcardSet.name
        };
    }
}
