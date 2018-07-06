import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon} from 'react-native-elements'
import FillInTheBlankService from "../services/FillInTheBlankService";

class FillInTheBlanksQuestionWidget extends Component {
    static navigationOptions = {
        title: 'Fill-in the blank',
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
            type:'FB'
        }

        this.fillInTheBlankService.saveFillInTheBlankQuestion(this.state.question.id, fibQuestion)
            .then(Alert.alert("Fill-in the blank question updated successfully."))
            .then(()=>this.props.navigation.state.params.backNavigation())
            .then(()=>this.props.navigation.goBack())
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
        var exp = expression.replace(/\[(.*?]*)\]/g,'|~|')
        this.updateState({previewExp:exp})
    }

    deleteFIB(){
        this.fillInTheBlankService.deleteFillInTheBlankQuestion(this.state.question.id)
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

                <FormLabel>Expression</FormLabel>
                <FormInput
                    value ={this.state.expression}
                    onChangeText={ text => this.updateExpression(text)}/>
                {this.state.expression === "" && <FormValidationMessage> Expression is required </FormValidationMessage>}

                <Button	backgroundColor="blue"
                           style={style.buttonStyle}
                           color="white"
                           title="Save"
                           onPress={() => {this.updateFIB()}}/>

                <Button	backgroundColor="green"
                           style={style.buttonStyle}
                           color="white"
                           title="Cancel"
                           onPress={() => { this.props.navigation.goBack()}}/>

                <Button	backgroundColor="red"
                           style={style.buttonStyle}
                           color="white"
                           title="Delete"
                           onPress={() => { this.deleteFIB() }}/>


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
                <View style={style.textMargin}>
                    {this.state.previewExp.split('|').map((text, index)=>{
                        return (
                            <View key={index}>
                                {this.previewExpression(text)}
                            </View>
                        )
                    })}
                </View>
                <View style={style.partitioner}/>
                <View style={style.partitioner}/>
            </ScrollView>
        )
    }

    previewExpression(text) {
        if(text==='~'){
            return <TextInput style={style.fibStyle} />
        }else{
            return <Text>{text}</Text>
        }
    }
}
export default FillInTheBlanksQuestionWidget
