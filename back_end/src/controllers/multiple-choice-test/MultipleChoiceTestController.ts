import { Container } from 'typedi';
import { IMultipleChoiceService } from '@src/services/multiple-choice-test/IMultipleChoiceService';
import { MultipleChoiceService } from '@src/services/multiple-choice-test/MultipleChoiceService';

export class MultipleChoiceTestController {
    private multipleChoiceService: IMultipleChoiceService;
    constructor() {
        this.multipleChoiceService = Container.get(MultipleChoiceService);
    }

    getMultipleChoiceTestBySetId = async (req: any, res: any) => {
        return this.multipleChoiceService.getMultipleChoiceTestBySetId(req, res)
    }

    submitAnswer = async (req: any, res: any) => {
        return this.multipleChoiceService.submitAnswer(req, res)
    }
}