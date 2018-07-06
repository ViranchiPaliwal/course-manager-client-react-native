const ASSIGNMENT_URL = "http://localhost:8080/api/assignment/assgnID"
const ASSIGNMENT_TOPIC_URL = "http://localhost:8080/api/topic/topicId/assignment"

let _singleton = Symbol();
export default class AssignmentService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton class can not be initialized');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    findAssignmentById(assignmentId){
        return fetch(ASSIGNMENT_URL.replace('assgnID', assignmentId))
            .then(response => (response.json()))
    }

    saveAssignment(assignmentId, assignment) {
        return fetch(ASSIGNMENT_URL.replace('assgnID', assignmentId), {
            method: "put",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(assignment)
        })
    }

    findAllAssignmentsForTopic(topicId){
        return fetch(ASSIGNMENT_TOPIC_URL.replace('topicId', topicId))
            .then(response=>(
                response.json()
            ))
    }

    addAssignment(topicId,assignment){
        return fetch(ASSIGNMENT_TOPIC_URL.replace('topicId', topicId),{
            method: "post",
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(assignment)
        })
    }

    deleteAssignment(assignmentId){
        fetch(ASSIGNMENT_URL.replace('assgnID', assignmentId),{
            method:'delete'
        })
    }
}