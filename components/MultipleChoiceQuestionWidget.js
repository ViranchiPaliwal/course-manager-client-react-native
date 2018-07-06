import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon, ButtonGroup} from 'react-native-elements'
import MultipleChoiceService from "../services/MultipleChoiceService";

class MultipleChoiceQuestionWidget extends Component {
    static navigationOptions = {
        title: 'MCQ',
        headerTintColor:'white',
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
            correctOption:0,
            options:'',
            optionList:[]
        }
        this.multipleChoiceService = MultipleChoiceService.instance
        this.updateMCQ = this.updateMCQ.bind(this)
        this.updateOption = this.updateOption.bind(this)
        this.updateState = this.updateState.bind(this)
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
            correctOption: question.correctOption
        })
        this.updateOption(question.options)

    }

    updateOption(options) {
        if(options){
            let option = options
            if(options.includes(',')){
                option = options.split(',')
                this.setState({optionList:option})
            }
            else{
                this.setState({optionList:[option]})
            }
        }
        this.setState({options:options})
    }

    deleteMCQ(){
        this.multipleChoiceService.deleteMultiChoiceQuestion(this.state.question.id)
            .then(()=>this.props.navigation.state.params.backNavigation())
            .then(()=>this.props.navigation.goBack())
    }

    updateState(updatedState){
        this.setState(updatedState)
    }

    updateMCQ(){
        let question={
            title: this.state.title,
            subtitle: this.state.subtitle,
            description: this.state.description,
            points: this.state.points,
            correctOption: this.state.correctOption,
            options: this.state.options,
            type:'MC'
        }

        this.multipleChoiceService.saveMultipleChoiceQuestion(this.state.question.id,question)
            .then(Alert.alert("Multiple choice question updated successfully."))
            .then(()=>this.props.navigation.state.params.backNavigation())
            .then(()=>this.props.navigation.goBack())
    }
    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.title}
                    onChangeText={ text => this.updateState({title: text})}/>
                {this.state.title === "" && <FormValidationMessage> Title is required </FormValidationMessage>}

                <FormLabel>SubTitle</FormLabel>
                <FormInput
                    value ={this.state.subtitle}
                    onChangeText={text => this.updateState({subtitle: text})}/>
                {this.state.subtitle === "" && <FormValidationMessage> Subtitle is required </FormValidationMessage>}

                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.description}
                    onChangeText={text => this.updateState({description: text})}/>
                {this.state.description === "" && <FormValidationMessage>Description is required</FormValidationMessage>}

                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.points).toString()}
                    onChangeText={ text => this.updateState({points: text})}/>
                {this.state.points === "" && <FormValidationMessage>Points are required</FormValidationMessage>}

                <FormLabel>Options</FormLabel>
                <FormInput
                    value ={this.state.options}
                    onChangeText={ text => this.updateOption(text)}/>
                {this.state.options === "" && <FormValidationMessage> Options are required </FormValidationMessage>}

                <Button	backgroundColor="blue"
                           style={style.buttonStyle}
                           color="white"
                           title="Save"
                           onPress={() => {this.updateMCQ()}}/>

                <Button	backgroundColor="green"
                           style={style.buttonStyle}
                           color="white"
                           title="Cancel"
                           onPress={() => { this.props.navigation.goBack()}}/>

                <Button	backgroundColor="red"
                           style={style.buttonStyle}
                           color="white"
                           title="Delete"
                           onPress={() => { this.deleteMCQ() }}/>


                <View style={style.partitioner}/>
                <View style={style.partitioner}/>
                <View style={style.preview}>
                    <Text h4 style={style.previewText}>Preview</Text>
                </View>
                <View style={style.viewStyle}>
                    <Text h4 >{this.state.title}</Text>
                    <Text h4 >{this.state.points} pts</Text>
                </View>
                <Text h4 style={style.textMargin}>{this.state.subtitle}</Text>
                <Text style={style.descriptionStyle}>{this.state.description}</Text>
                <ButtonGroup
                    onPress={index => this.updateState({correctOption: index})}
                    selectedIndex={this.state.correctOption}
                    buttons={this.state.optionList} />
                <View style={style.partitioner}/>
                <View style={style.partitioner}/>
            </ScrollView>
        )
    }
}
export default MultipleChoiceQuestionWidget
