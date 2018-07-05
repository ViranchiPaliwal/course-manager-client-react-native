const TRUEFALSE_URL = "http://localhost:8080/api/question/questionId/truefalse"
const TRUEFALSE_EXAM_URL = "http://localhost:8080/api/exam/examId/truefalse"
let _singleton = Symbol();
export default class TrueFalseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton class can not be initialized');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TrueFalseService(_singleton);
        return this[_singleton]
    }

    saveTrueFalseQuestion(questionId, truefalse) {
        return fetch(TRUEFALSE_URL.replace('questionId', questionId), {
            method: "put",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(truefalse)
        })
    }

    addTrueFalseQuestion(examId){
        const trueFalseQuestion = {
            title:'New TrueFalse',
            description:'TrueFalse description',
            points: 0,
            subtitle:'True or false',
            questionType:'TF'
        }

        return fetch(TRUEFALSE_EXAM_URL.replace('examId', examId),{
            method: "post",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(trueFalseQuestion)
        })
    }
}