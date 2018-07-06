import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage, Icon} from 'react-native-elements'
import EssayService from "../services/EssayService";
class EssayQuestionWidget extends Component {
    static navigationOptions = {
        title: 'Essay',
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
            question:''
        }
        this.essayService = EssayService.instance
        this.updateEssay = this.updateEssay.bind(this)
    }

    componentDidMount() {
        const {navigation} = this.props;
        const question = navigation.getParam("question",{})
        this.setState({question:question})
        this.setState({
            title: question.title,
            subtitle: question.subtitle,
            description: question.description,
            points: question.points
        })
    }

    updateState(updatedState){
        this.setState(updatedState)
    }

    deleteEssay(){
        this.essayService.deleteEssayQuestion(this.state.question.id)
            .then(()=>this.props.navigation.state.params.backNavigation())
            .then(()=>this.props.navigation.goBack())
    }

    updateEssay(){
        let essayQuestion={
            title: this.state.title,
            subtitle: this.state.subtitle,
            description: this.state.description,
            points: this.state.points,
            type:'ES'
        }

        this.essayService.saveEssayQuestion(this.state.question.id,essayQuestion)
            .then(Alert.alert("Essay updated successfully."))
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

                <Button	backgroundColor="blue"
                           style={style.buttonStyle}
                           color="white"
                           title="Save"
                           onPress={() => {this.updateEssay()}}/>

                <Button	backgroundColor="green"
                           style={style.buttonStyle}
                           color="white"
                           title="Cancel"
                           onPress={() => { this.props.navigation.goBack()}}/>

                <Button	backgroundColor="red"
                           style={style.buttonStyle}
                           color="white"
                           title="Delete"
                           onPress={() => { this.deleteEssay() }}/>

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
                <TextInput style={style.essayStyle}></TextInput>
                <View style={style.partitioner}/>
                <View style={style.partitioner}/>
            </ScrollView>
        )
    }
}
export default EssayQuestionWidget
