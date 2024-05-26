import { Service } from "typedi";
import { AppDataSource } from "../../data-source";
import { User } from "@src/entity/User";
import { Sets } from "@src/entity/Sets";
import { Tests } from '@entity/Tests';
import { TestQuestion } from '@entity/TestQuestion';
import { Cards } from '@entity/Cards';
import { TestResult } from "@src/entity/TestResult";
import {
    NotFoundError,
    BadRequestError,
    AuthFailureError,
} from '@src/core/ApiError';

function getRandomElements<T>(array: T[], numElements: number, exclude?: T): T[] {
    const filteredArray = exclude ? array.filter(item => item !== exclude) : array;
    if (numElements >= filteredArray.length) {
        return filteredArray.slice(); // Return the full array if numElements is greater than or equal to array length
    }

    const result: T[] = [];
    const indices: Set<number> = new Set();

    // Generate a set of unique random indices
    while (indices.size < numElements) {
        const randomIndex = Math.floor(Math.random() * filteredArray.length);
        indices.add(randomIndex);
    }

    // Select elements from the original array based on the random indices
    for (const index of indices) {
        result.push(filteredArray[index]);
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
    private testResultRepo;
    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
        this.setRepo = AppDataSource.getRepository(Sets);
        this.cardRepo = AppDataSource.getRepository(Cards);
        this.testRepo = AppDataSource.getRepository(Tests);
        this.testQuestionRepo = AppDataSource.getRepository(TestQuestion);
        this.testResultRepo = AppDataSource.getRepository(TestResult);
    }

    createTest = async (setId: string, userId: string): Promise<any> => {
        if (!setId) throw new BadRequestError('Set ID is required');

        const flashcardSet = await this.setRepo.findOne({
            where: { id: setId },
            relations: ['cards']
        });
        if (!flashcardSet) throw new NotFoundError('Flashcard set not found');
        const user = await this.userRepo.findOne({
            where: { id: userId }
        });
        if (!user) throw new AuthFailureError('Please login to do the test!');

        let cardsToTest = getRandomElements(flashcardSet.cards, 10);

        const test = new Tests();
        test.user = user;
        test.set = flashcardSet;
        test.questions = [];

        // for (const flashcard of cardsToTest) {
        //     const question = new TestQuestion();
        //     question.test = test;
        //     question.card = flashcard;

        //     // Get other cards excluding the current question card
        //     const randomCards = getRandomElements(flashcardSet.cards, 3, flashcard);

        //     if (flashcard.image) {
        //         question.questionType = 'image';
        //         question.questionText = flashcard.image;
        //         question.correctAnswer = flashcard.term;
        //         question.options = [
        //             flashcard.term,
        //             randomCards[0].term,
        //             randomCards[1].term,
        //             randomCards[2].term
        //         ];
        //     } else {
        //         // Randomly decide the type of question: term or definition
        //         const questionTypeIndex = Math.floor(Math.random() * 2);

        //         if (questionTypeIndex === 0) {
        //             question.questionType = 'term';
        //             question.questionText = `${flashcard.term}?`;
        //             question.correctAnswer = flashcard.define;
        //             question.options = [
        //                 flashcard.define,
        //                 randomCards[0].define,
        //                 randomCards[1].define,
        //                 randomCards[2].define
        //             ];
        //         } else {
        //             question.questionType = 'definition';
        //             question.questionText = `${flashcard.define}`;
        //             question.correctAnswer = flashcard.term;
        //             question.options = [
        //                 flashcard.term,
        //                 randomCards[0].term,
        //                 randomCards[1].term,
        //                 randomCards[2].term
        //             ];
        //         }
        //     }
        //     test.questions.push(question);
        // }
        for (const flashcard of cardsToTest) {
            const question = new TestQuestion();
            question.test = test;
            question.card = flashcard;

            // Get other cards excluding the current question card
            const randomCards = getRandomElements(flashcardSet.cards, 3, flashcard);

            if (flashcard.image) {
                question.questionType = 'image';
                question.questionText = flashcard.image;
                question.correctAnswer = flashcard.term;
            } else {
                // Randomly decide the type of question: term or definition
                const questionTypeIndex = Math.floor(Math.random() * 2);

                if (questionTypeIndex === 0) {
                    question.questionType = 'term';
                    question.questionText = `${flashcard.term}?`;
                    question.correctAnswer = flashcard.define;
                } else {
                    question.questionType = 'definition';
                    question.questionText = `${flashcard.define}`;
                    question.correctAnswer = flashcard.term;
                }
            }

            // Construct options array including correct answer
            let options = [question.correctAnswer];
            options.push(...randomCards.map(card => flashcard.image ? card.term : card.define));

            // Shuffle options
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }

            question.options = options;

            test.questions.push(question);
        }

        await AppDataSource.transaction(async manager => {
            await manager.save(test);
            await manager.save(test.questions);
        });

        return {
            id: test.id,
            name: flashcardSet.name,
            questions: test.questions.map(question => ({
                id: question.id,
                questionType: question.questionType,
                questionText: question.questionText,
                options: question.options,
                correctAnswer: question.correctAnswer
            })),
        };
    }
}
