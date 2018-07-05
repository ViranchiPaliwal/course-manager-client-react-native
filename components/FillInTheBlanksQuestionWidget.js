import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon} from 'react-native-elements'
import FillInTheBlankService from "../services/FillInTheBlankService";
class FillInTheBlanksQuestionWidget extends Component {
    static navigationOptions = {
        title: 'Fill in the blank editor',
        headerStyle:{backgroundColor: "#007bff"}
    }

    constructor(props) {
        super(props)
        this.state = {
            title:"",
            subtitle:"",
            description:"",
            points:"",
            question:'',
            correctOption:'',
            variable:'',
            expression:'',
            previewExp:''
        }
        this.fillInTheBlankService = FillInTheBlankService.instance;
        this.updateFIB = this.updateFIB.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateExpression = this.updateExpression.bind(this);
        this.updatePreviewExp = this.updatePreviewExp.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const question = navigation.getParam("question",{})
        this.setState({question:question})
        this.setState({
            title: question.title,
            subtitle: question.subtitle,
            description: question.description,
            points: question.points,
            variables: question.variables,
            expression: question.expression
        })
        this.updatePreviewExp(question.expression)
    }

    updateState(updatedState){
        this.setState(updatedState)
    }

    updateFIB(){
        let fibQuestion={
            title: this.state.title,
            subtitle: this.state.subtitle,
            description: this.state.description,
            points: this.state.points,
            variables: this.state.variables,
            expression: this.state.expression,
            questionType:'FB'
        }

        this.fillInTheBlankService.saveFillInTheBlankQuestion(this.state.question.id, fibQuestion)
            .then(Alert.alert("Fill-in the blank question updated successfully."))
    }

    updateExpression(expression){
        let variables=''
        var variablesWithBracket = expression.match(/\[(.*?)\]/g)
        for(var variable in variablesWithBracket)
            variables = variables + " " + variable
        this.setState({variables: variables})
        this.setState({expression: expression})
        this.updatePreviewExp(expression)
    }

    updatePreviewExp(expression){
        var exp = expression.replace(/\[(.*?]*)\]/g,'~')
        this.updateState({previewExp:exp})
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.title}
                    onChangeText={ text => this.updateState({title: text})}/>
                <FormValidationMessage> Title is required </FormValidationMessage>

                <FormLabel>SubTitle</FormLabel>
                <FormInput
                    value ={this.state.subtitle}
                    onChangeText={text => this.updateState({subtitle: text})}/>
                <FormValidationMessage> Subtitle is required </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.description}
                    onChangeText={text => this.updateState({description: text})}/>
                <FormValidationMessage>Description is required</FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.points).toString()}
                    onChangeText={ text => this.updateState({points: text})}/>

                <FormLabel>Expression</FormLabel>
                <FormInput
                    value ={this.state.expression}
                    onChangeText={ text => this.updateExpression(text)}/>
                <FormValidationMessage> Expression is required </FormValidationMessage>

                <Button	backgroundColor="blue"
                           color="white"
                           title="Save"
                           onPress={() => {this.updateFIB()}}/>

                <Button	backgroundColor="green"
                           color="white"
                           title="Cancel"
                           onPress={() => { this.props.navigation.goBack()}}/>

                <Text h2>Preview</Text>
                <Text h3>{this.state.title}</Text>
                <Text h4>{this.state.description}</Text>
                <Text h4>{this.state.points}</Text>
                {this.state.previewExp.split('~').map((text,index)=>{
                    return (
                        <View>
                            {previewExpression(text)}
                        </View>
                    )
                })}
            </ScrollView>
        )
    }

    previewExpression(text) {
        if(text==='~'){
            return <TextInput style={{width:120}} />
        }else{
            return <Text>text</Text>
        }
    }
}
export default MultipleChoiceQuestionWidget
