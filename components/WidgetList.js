import React, {Component} from 'react'
import {View, ScrollView, TextInput, Alert} from 'react-native'
import {Text, ListItem, Button, Icon} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import ExamService from "../services/ExamService";
import style from '../styles/styles';

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            topicId:"",
            assignments:[],
            assignmentTitle:'',
            exams:[],
            examTitle:''
        }
        this.assignmentService=AssignmentService.instance;
        this.addAssignment=this.addAssignment.bind(this);
        this.findAllAssignmentsForTopic = this.findAllAssignmentsForTopic.bind(this);
        this.examService=ExamService.instance;
        this.addExam=this.addExam.bind(this);
        this.findAllExamsForTopic = this.findAllExamsForTopic.bind(this);
    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({topicId:topicId})
        this.findAllAssignmentsForTopic(topicId)
        this.findAllExamsForTopic(topicId)
    }

    findAllAssignmentsForTopic(topicId) {
        this.assignmentService.findAllAssignmentsForTopic(topicId)
            .then( assignments =>
                ( this.setState({assignments: assignments})))
    }

    findAllExamsForTopic(topicId) {
        this.examService.findAllExamsForTopic(topicId)
            .then( exams =>
                ( this.setState({exams: exams})))
    }

    addAssignment() {
        if(!this.state.assignmentTitle){
            Alert.alert("Provide title to add Assignment.")
            return
        }

        let assignment = {
            title:this.state.assignmentTitle,
            description: "Assignment description",
            points: 0,
            text:"assignment",
            widgetType:"Assignment"
        }

         this.assignmentService.addAssignment(this.state.topicId, assignment)
            .then(response => (response.json()))
            .then(()=>( this.findAllAssignmentsForTopic(this.state.topicId)))
    }

    addExam(){
        if(!this.state.examTitle){
            Alert.alert("Provide title to add Exam.")
            return
        }

        let assignment = {
            title:this.state.examTitle,
            text:"exam",
            widgetType:"Exam"
        }

        this.examService.addExam(this.state.topicId, assignment)
            .then(response => (response.json()))
            .then(()=>( this.findAllExamsForTopic(this.state.topicId)))
    }

    render() {
        return(
            <ScrollView style={style.scrollView}>
                <View>
                    <View style={style.addWidgetView}>
                            <View style={style.addWidgetTextView}>
                                <TextInput style={style.addWidgetTextViewInput} onChangeText={(text)=>{
                                    this.setState({assignmentTitle:text})
                                }} placeholder="Add Assignment"/>
                            </View>
                            <View style={style.addWidgetIconView}>
                                <Icon
                                    color='white'
                                    name='note-add'
                                    onPress={()=> this.addAssignment()}
                                />
                            </View>
                        </View>
                        <View>
                            {this.state.assignments.map(
                                (assignment, index) => (
                                    <ListItem
                                        onPress={() => this.props.navigation
                                            .navigate("Assignment", {assignmentId: assignment.id})}
                                        key={index}
                                        title={assignment.title}/>))}
                        </View>
                    <View style={style.addWidgetView}>
                        <View style={style.addWidgetTextView}>
                            <TextInput style={style.addWidgetTextViewInput} onChangeText={(text)=>{
                                this.setState({examTitle:text})
                            }} placeholder="Add Exam"/>
                        </View>
                        <View style={style.addWidgetIconView}>
                            <Icon
                                color='white'
                                name='note-add'
                                onPress={()=> this.addExam()}
                            />
                        </View>
                    </View>
                    <View>
                        {this.state.exams.map(
                            (exam, index) => (
                                <ListItem
                                    onPress={() => this.props.navigation
                                        .navigate("Exam", {examId: exam.id})}
                                    key={index}
                                    title={exam.title}/>))}
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default WidgetList