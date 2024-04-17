export interface IQuestionRepo {
    GetQuestionList(setId: string): Promise<any>;
    GetQuestion(id: string): Promise<any>;
    CreateQuestion(question: any): Promise<boolean>;
    UpdateQuestion(id: string, question: any): Promise<boolean>;
    DeleteQuestion(id: string): Promise<any>;
    isExistQuestion(id: string): Promise<boolean>;
}