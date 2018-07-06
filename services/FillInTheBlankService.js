const FILLINTHEBLANK_URL = "http://localhost:8080/api/blanks/questionId"
const FILLINTHEBLANK_EXAM_URL = "http://localhost:8080/api/exam/examId/blanks"
let _singleton = Symbol();
export default class FillInTheBlankService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton class can not be initialized');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FillInTheBlankService(_singleton);
        return this[_singleton]
    }

    saveFillInTheBlankQuestion(questionId, fib) {
        return fetch(FILLINTHEBLANK_URL.replace('questionId', questionId), {
            method: "put",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(fib)
        })
    }

    deleteFillInTheBlankQuestion(questionId){
        return fetch(FILLINTHEBLANK_URL.replace('questionId', questionId), {
            method: 'DELETE'
        })
    }

    addFillInTheBlankQuestion(examId){
        const fibQuestion = {
            title:'New Fill-in the blanks',
            subtitle:'Fill-in the blanks',
            description:'Fill-in the blanks description',
            points: 0,
            expression: '2 + 2 = [four=4]',
            variable: '',
            type:'FB'
        }

        return fetch(FILLINTHEBLANK_EXAM_URL.replace('examId', examId),{
            method: "post",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(fibQuestion)
        })
    }
}