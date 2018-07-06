const MULTIPLECHOICE_URL = "https://web-dev-summer-react-native.herokuapp.com/api/choice/questionId"
const MULTIPLECHOICE_EXAM_URL = "https://web-dev-summer-react-native.herokuapp.com/api/exam/examId/choice"

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

    deleteMultiChoiceQuestion(questionId){
        return fetch(MULTIPLECHOICE_URL.replace('questionId', questionId), {
            method: 'DELETE'
        })
    }

    addMultipleChoiceQuestion(examId){
        const mcqQuestion= {
            title:'New MCQ',
            description:'MCQ description',
            points: 0,
            subtitle:'Multiple Choice',
            type:'MC',
            options:'Option1,Option2,Option3',
            correctOption: 1
        }

        return fetch(MULTIPLECHOICE_EXAM_URL.replace('examId', examId),{
            method: "post",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(mcqQuestion)
        })
    }
}