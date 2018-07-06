import MultipleChoiceService from "./MultipleChoiceService";
import FillInTheBlankService from "./FillInTheBlankService";
import TrueFalseService from "./TrueFalseService";
import EssayService from "./EssayService";

const QUESTION_URL = "https://web-dev-summer-react-native.herokuapp.com/api/exam/examID/question"
let _singleton = Symbol();
export default class QuestionService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton class can not be initialized');
        this.mulitpleChoiceService=MultipleChoiceService.instance;
        this.fillInTheBlankService=FillInTheBlankService.instance;
        this.trueFalseService=TrueFalseService.instance;
        this.essayService=EssayService.instance;
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }


    saveAssignment(questionId, question) {
        return fetch(QUESTION_URL.replace('questionID', questionId), {
            method: "put",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(question)
        })
    }

    findAllQuestionsByExamId(examId){
        return fetch(QUESTION_URL.replace('examID', examId))
            .then(response=>(response.json()))
    }

    addQuestion(examId, type){
        if(type==='MC'){
            return this.mulitpleChoiceService.addMultipleChoiceQuestion(examId)
        }
        else if(type==='FB'){
            return this.fillInTheBlankService.addFillInTheBlankQuestion(examId)
        }
        else if(type==='TF'){
            return this.trueFalseService.addTrueFalseQuestion(examId)
        }
        else {
            return this.essayService.addEssayQuestion(examId)
        }
    }
}