import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon} from 'react-native-elements'
import MultipleChoiceService from "../services/MultipleChoiceService";
class MultipleChoiceQuestionWidget extends Component {
    static navigationOptions = {
        title: 'MCQ',
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
            options:[]
        }
        this.multipleChoiceService = MultipleChoiceService.instance;
        this.updateMCQ = this.updateMCQ.bind(this);
        this.updateOption = this.updateOption.bind(this);
        this.optionDeletion = this.optionDeletion.bind(this);
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
            correctOption: question.correctOption,
        })
        this.updateOption(question.options)

    }

    updateOption() {
        if(!question.options){
            let options = question.options
            if(question.options.contain(',')){
                options = question.options.split(',')
            }
            this.setState({options:options})
        }
    }

    updateState(updatedState){
        this.setState(updatedState)
    }

    optionDeletion(title) {
        var str=[]
        let count=0;
        for(var i=0;i<this.state.options.length;i++)
            if(this.state.options[i]!=title)
                str[count++]=this.state.options[i]
        this.setState({options:str})
    }

    updateMCQ(){
        let options=''
        for(var option in this.state.options)
            options = options + "~" + option

        let question={
            title: this.state.title,
            subtitle: this.state.subtitle,
            description: this.state.description,
            points: this.state.points,
            correctOption: this.state.correctOption+1,
            options: options,
            questionType:'MC'
        }

        this.multipleChoiceService.saveMultipleChoiceQuestion(this.state.question.id,question)
            .then(Alert.alert("Multiple choice question updated successfully."))
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

                <FormLabel>Options</FormLabel>
                <FormInput
                    value ={this.state.options}
                    onChangeText={ text => this.updateOption(text)}/>
                <FormValidationMessage> Options are required </FormValidationMessage>

                <Button	backgroundColor="blue"
                           color="white"
                           title="Save"
                           onPress={() => {this.updateMCQ()}}/>

                <Button	backgroundColor="yellow"
                           color="white"
                           title="Cancel"
                           onPress={() => { this.props.navigation.goBack()}}/>

                <Text h2>Preview</Text>
                <Text h3>{this.state.title}</Text>
                <Text h4>{this.state.description}</Text>
                <Text h4>{this.state.points}</Text>
                <ButtonGroup
                    onPress={this.updateCorrectOption}
                    selectedIndex={this.state.correctOption}
                    buttons={this.state.options} />
            </ScrollView>
        )
    }
}
export default MultipleChoiceQuestionWidget
