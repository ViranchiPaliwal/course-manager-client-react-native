import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon, CheckBox} from 'react-native-elements'
import TrueFalseService from "../services/TrueFalseService";
class TrueOrFalseQuestionWidget extends Component {
    static navigationOptions = {
        title: 'True or false editor',
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
            isTrue: false
        }
        this.trueFalseService = TrueFalseService.instance;
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
            isTrue: question.isTrue
        })
    }

    updateState(updatedState){
        this.setState(updatedState)
    }

    updateTOF(){
        let TOFQuestion = {
            title: this.state.title,
            subtitle: this.state.subtitle,
            description: this.state.description,
            points: this.state.points,
            isTrue: this.state.isTrue
        }

        this.trueFalseService.saveTrueFalseQuestion(this.state.question.id, TOFQuestion)
            .then(Alert.alert("True/false question updated successfully."))
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

                <CheckBox onPress={() => this.updateState({isTrue:!this.state.isTrue})}
                          checked={this.state.isTrue} title='The answer is true.'/>

                <Button	backgroundColor="blue"
                           color="white"
                           title="Save"
                           onPress={() => {this.updateTOF()}}/>

                <Button	backgroundColor="green"
                           color="white"
                           title="Cancel"
                           onPress={() => { this.props.navigation.goBack()}}/>

                <Text h2>Preview</Text>
                <Text h3>{this.state.title}</Text>
                <Text h3>{this.state.subtitle}</Text>
                <Text h4>{this.state.description}</Text>
                <Text h4>{this.state.points}</Text>
                <CheckBox checked={this.state.isTrue} title='The answer is true.'/>
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
