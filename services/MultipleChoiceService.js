const MULTIPLECHOICE_URL = "http://localhost:8080/api/question/questionId/choice"
const MULTIPLECHOICE_EXAM_URL = "http://localhost:8080/api/exam/examId/choice"
let _singleton = Symbol();
export default class MultipleChoiceService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton class can not be initialized');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MultipleChoiceService(_singleton);
        return this[_singleton]
    }

    saveMultipleChoiceQuestion(questionId, multiplechoice) {
        return fetch(MULTIPLECHOICE_URL.replace('questionId', questionId), {
            method: "put",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(multiplechoice)
        })
    }

    addMultipleChoiceQuestion(examId){
        const mcqQuestion={
            title:'New MCQ',
            description:'MCQ description',
            points: 0,
            subtitle:'Multiple Choice',
            questionType:'MC'
        }

        return fetch(MULTIPLECHOICE_EXAM_URL.replace('examId', examId),{
            method: "post",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(mcqQuestion)
        })
    }
}