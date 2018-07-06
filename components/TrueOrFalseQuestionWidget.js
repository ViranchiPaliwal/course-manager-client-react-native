import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon, CheckBox} from 'react-native-elements'
import TrueFalseService from "../services/TrueFalseService";

class TrueOrFalseQuestionWidget extends Component {
    static navigationOptions = {
        title: 'True or false',
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
            isTrue: false
        }
        this.trueFalseService = TrueFalseService.instance;
        this.updateTOF = this.updateTOF.bind(this);
        this.updateState = this.updateState.bind(this);
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
            isTrue: this.state.isTrue,
            type: 'TF'
        }

        this.trueFalseService.saveTrueFalseQuestion(this.state.question.id, TOFQuestion)
            .then(Alert.alert("True/false question updated successfully."))
            .then(()=>this.props.navigation.state.params.backNavigation())
            .then(()=>this.props.navigation.goBack())
    }

    deleteTOF(){
        this.trueFalseService.deleteTrueFalseQuestion(this.state.question.id)
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

                <CheckBox onPress={() => this.updateState({isTrue:!this.state.isTrue})}
                          checked={this.state.isTrue} title='The answer is true.'/>

                <Button	backgroundColor="blue"
                           style={style.buttonStyle}
                           color="white"
                           title="Save"
                           onPress={() => {this.updateTOF()}}/>

                <Button	backgroundColor="green"
                           style={style.buttonStyle}
                           color="white"
                           title="Cancel"
                           onPress={() => { this.props.navigation.goBack()}}/>

                <Button	backgroundColor="red"
                           style={style.buttonStyle}
                           color="white"
                           title="Delete"
                           onPress={() => { this.deleteTOF() }}/>


                <View style={style.partitioner}/>
                <View style={style.partitioner}/>
                <View style={style.preview}>
                    <Text h4 style={style.previewText}>Preview</Text>
                </View>
                <View style={style.viewStyle}>
                    <Text h4 >{this.state.title}</Text>
                    <Text h4 >{this.state.points} pts</Text>
                </View>
                <Text style={style.textMargin} h4>{this.state.subtitle}</Text>
                <Text style={style.descriptionStyle}>{this.state.description}</Text>
                <CheckBox style={style.textMargin} checked={this.state.isTrue} title='The answer is true.'/>
                <View style={style.partitioner}/>
                <View style={style.partitioner}/>
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
export default TrueOrFalseQuestionWidget
