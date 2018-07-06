import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput, Picker} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon, ListItem} from 'react-native-elements'
import QuestionService from "../services/QuestionService";
import FillInTheBlanksQuestionWidget from "./FillInTheBlanksQuestionWidget";

class ExamWidget extends Component {
    static navigationOptions = {
        title: 'Question',
        headerTintColor:'white',
        headerStyle:{backgroundColor: "#007bff"}
    }

    constructor(props) {
        super(props)
        this.state = {
            examId:'',
            questions:[],
            questionType:'MC',
            examTitle:''
        }
        this.questionService = QuestionService.instance;
        this.addQuestion=this.addQuestion.bind(this);
        this.update=this.update.bind(this);
        this.findAllQuestionsByExamId = this.findAllQuestionsByExamId.bind(this)
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId",1)
        const examTitle = navigation.getParam("examTitle",'')
        this.setState({examId:examId})
        this.setState({examTitle:examTitle})
        this.findAllQuestionsByExamId(examId)
    }

    navigateBack = () => {
        this.questionService.findAllQuestionsByExamId(this.state.examId)
            .then(questions=>this.setState({questions:questions}))
    }

    update(updatedState){
        this.setState(updatedState);
    }

    addQuestion(questionType){
        this.questionService.addQuestion(this.state.examId,questionType)
            .then(() => this.findAllQuestionsByExamId(this.state.examId))
    }

    findAllQuestionsByExamId(examId){
        this.questionService.findAllQuestionsByExamId(examId)
            .then(questions=>this.setState({questions:questions}))
    }

    render() {
        return <ScrollView>
            <View style={style.examWidgetTitle}>
                <Text h3>{this.state.examTitle}</Text>
            </View>
            <Picker
                onValueChange={(itemValue) =>
                    this.update({questionType: itemValue})}
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
                        <View key={index}>
                            {this.selectCorrect(question)}
                        </View>
                    )})}
        </ScrollView>
    }

    selectCorrect(question){
        if (question.type === "MC") {
            return <ListItem
                title= {question.title}
                leftIcon={<Icon name="list"/>}
                subtitle={question.subtitle}
                onPress={() => this.props.navigation.navigate("MultipleChoiceQuestionWidget",
                    {question:question, backNavigation: this.navigateBack})}/>
        }
        else if (question.type === "FB") {
            return <ListItem
                title={question.title}
                leftIcon={<Icon name="code"/>}
                subtitle={question.subtitle}
                onPress={()=>this.props.navigation.navigate("FillInTheBlanksQuestionWidget",
                    {question:question, backNavigation: this.navigateBack})}/>
        }
        else if (question.type === "TF") {
            return  <ListItem
                title={question.title}
                leftIcon={<Icon name="check"/>}
                subtitle={question.subtitle}
                onPress={()=>this.props.navigation.navigate("TrueOrFalseQuestionWidget",
                    {question:question, backNavigation: this.navigateBack})}/>
        }
        else return <ListItem
                title={question.title}
                leftIcon={<Icon name="subject"/>}
                subtitle={question.subtitle}
                onPress={()=>this.props.navigation.navigate("EssayQuestionWidget",
                    {question:question, backNavigation: this.navigateBack})}/>
    }
}
export default ExamWidget
