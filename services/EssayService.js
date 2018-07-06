const ESSAY_URL = "http://localhost:8080/api/essay/questionId"
const ESSAY_EXAM_URL = "http://localhost:8080/api/exam/examId/essay"

let _singleton = Symbol();
export default class EssayService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton class can not be initialized');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EssayService(_singleton);
        return this[_singleton]
    }

    saveEssayQuestion(questionId, essay) {
        return fetch(ESSAY_URL.replace('questionId', questionId), {
            method: "put",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(essay)
        })
    }

    deleteEssayQuestion(questionId){
        return fetch(ESSAY_URL.replace('questionId', questionId), {
            method: 'DELETE'
        })
    }

    addEssayQuestion(examId){
        const essayQuestion={
            title:'New Essay',
            description:'Essay description',
            points: 0,
            subtitle:'Essay',
            type:'ES'
        }

        return fetch(ESSAY_EXAM_URL.replace('examId', examId),{
            method: "post",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(essayQuestion)
        })
    }
}