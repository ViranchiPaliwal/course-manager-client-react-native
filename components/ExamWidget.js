import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput, Picker} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon} from 'react-native-elements'
import QuestionService from "../services/QuestionService";

class ExamWidget extends Component {
    static navigationOptions = {
        title: 'Question',
        headerStyle:{backgroundColor: "#007bff"}
    }

    constructor(props) {
        super(props)
        this.state = {
            examId:'',
            questions:[],
            questionType:0,
            examTitle:''
        }
        this.questionService = QuestionService.instance;
        this.addQuestion=this.addQuestion.bind(this);
        this.update=this.update.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId",1)
        const examTitle = navigation.getParam("examTitle",'')
        this.setState({examId:examId})
        this.setState({examTitle:examTitle})
        this.questionService.findAllQuestionsByExamId(examId)
            .then(questions=>( this.setState({ questions: questions})))
    }

    update(updatedState){
        this.setState(updatedState);
    }

    addQuestion(questionType){
        this.questionService.addQuestion(questionType,this.state.examId)
            .then(()=>this.questionService.findAllQuestionsByExamId(this.state.examId))
            .then(questions=>this.setState({questions:questions}))
    }

    render() {
        return <ScrollView>
            <View style={style.examWidgetTitle}>
                <Text h2>{this.state.examTitle}</Text>
            </View>
            <View style={style.examWidgetTitle}>
                <Text h3>Question</Text>
            </View>
            <Picker
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({questionType: itemValue})}
                selectedValue={this.state.questionType}>
                <Picker.Item value="MC" label="Multiple choice"/>
                <Picker.Item value="ES" label="Essay"/>
                <Picker.Item value="TF" label="True or false"/>
                <Picker.Item value="FB" label="Fill in the blanks"/>
            </Picker>
            <Icon
                size={50}
                name='circle-with-plus'
                type='entypo'
                color='red'
                onPress={() => {
                    this.addQuestion(this.state.questionType)
                }}
            />

            {this.state.questions.map(
                (question, index) => {
                    return (
                        <View>
                            {this.selectCorrect(question)}
                        </View>
                    )})}
        </ScrollView>
    }

    selectCorrect(question){
        if (question.type === "MultipleChoice") {
           return <ListItem
                    title= {question.title}
                    leftIcon={<Icon name="list"/>}
                    subtitle="Multiple choice"/>
            }
            else if (question.type === "FillInTheBlanks") {
            return <ListItem
                    title="Question 1"
                    leftIcon={<Icon name="code"/>}
                    subtitle="Fill-in the blanks"/>
            }
            else if (question.type === "TrueFalse") {
            return  <ListItem
                    title="Question 1"
                    leftIcon={<Icon name="check"/>}
                    subtitle="True or false"/>
            }
            else return <ListItem
                    title="Question 1"
                    leftIcon={<Icon name="subject"/>}
                    subtitle="Multiple choice"/>
    }
}
export default ExamWidget
