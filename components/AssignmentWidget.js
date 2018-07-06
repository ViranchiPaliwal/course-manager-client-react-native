import React, {Component} from 'react'
import {View, Alert, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";

class AssignmentWidget extends Component {
    static navigationOptions = {
        title: 'Assignment',
        headerTintColor:'white',
        headerStyle:{backgroundColor: "#007bff"}
    }

    constructor(props) {
        super(props)
        this.state = {
            assignmentId: '',
            title: '',
            description: '',
            points: 0
        }
        this.assignmentService = AssignmentService.instance;
        this.saveAssignment=this.saveAssignment.bind(this);
        this.update=this.update.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId",1)
        this.setState({assignmentId:assignmentId})
        this.assignmentService.findAssignmentById(assignmentId)
            .then(assignment=>(
                this.setState({
                    title:assignment.title,
                    description:assignment.description,
                    points:assignment.points})
            ))
    }

    update(updatedState){
        this.setState(updatedState);
    }

    saveAssignment(){
        let assignment = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            widgetType: 'Assignment'
        }
        this.assignmentService.saveAssignment(this.state.assignmentId, assignment)
            .then(Alert.alert("Assignment updated successfully"))
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={ text => this.update({title: text})}/>
                {this.state.title === "" && <FormValidationMessage> Title is required </FormValidationMessage>}

                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={ text => this.update({description: text})}/>
                {this.state.description === "" && <FormValidationMessage> Description is required </FormValidationMessage>}

                <FormLabel>Points</FormLabel>
                <FormInput value={(this.state.points).toString()} onChangeText={ points => this.update({points: points}) }/>
                {this.state.points === "" && <FormValidationMessage> Points are required </FormValidationMessage>}

                <Button style={style.buttonStyle}
                        backgroundColor="green"
                        color="white"
                        title="Submit"
                        onPress={() => {this.saveAssignment()}}/>
                <Button style={style.buttonStyle}
                        backgroundColor="red"
                        color="white"
                        title="Cancel"
                        onPress={() => { this.props.navigation.goBack()}}/>
                <View style={style.partitioner}/>
                <View style={style.partitioner}/>
                <View style={style.preview}>
                    <Text h4 style={style.previewText}>Preview</Text>
                </View>
                <View style={style.viewStyle}>
                    <Text h4 >{this.state.title}</Text>
                    <Text h4 >{this.state.points} pts</Text>
                </View>
                <Text style={style.descriptionStyle}>{this.state.description}</Text>

                <Text h4 style={style.textMargin}>Essay Answer</Text>
                <TextInput style={style.essayStyle}/>

                <Text h4 style={style.textMargin}>Upload a file</Text>
                <Button style={style.buttonStyle}
                        backgroundColor="#007bff"
                        color="white"
                        title="Choose File"
                        onPress={() => {this.saveAssignment()}}/>

                <Text h4 style={style.textMargin}>Submit a Link</Text>
                <TextInput style={style.linkStyle}/>
                <View style={style.partitioner}/>
                <View style={style.partitioner}/>

            </ScrollView>
        )
    }
}
export default AssignmentWidget
