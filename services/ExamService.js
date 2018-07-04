const EXAM_URL = "http://localhost:8080/api/exam/examID"
let _singleton = Symbol();
export default class ExamService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton class can not be initialized');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    findExamById(examId){
        return fetch(EXAM_URL.replace('examID', examId))
            .then(response => (response.json()))
    }

    saveAssignment(examId, exam) {
        return fetch(EXAM_URL.replace('examID', examId), {
            method: "put",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(exam)
        })
    }

    findAllExamsForTopic(topicId){
        return fetch("http://localhost:8080/api/topic/"+topicId+"/exam")
            .then(response=>(
                response.json()
            ))
    }

    addExam(topicId, exam){
        return fetch("http://localhost:8080/api/topic/"+topicId+"/exam",{
            method: "post",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(exam)
        })
    }
}