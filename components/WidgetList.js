import React, {Component} from 'react'
import {View, ScrollView, TextInput, Alert} from 'react-native'
import {Text, ListItem, Button, Icon} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import style from '../styles/styles';

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            topicId:"",
            assignments:[],
            assignmentTitle:''
        }
        this.assignmentService=AssignmentService.instance;
        this.addAssignment=this.addAssignment.bind(this);
        this.findAllAssignmentsForTopic = this.findAllAssignmentsForTopic.bind(this);

    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({topicId:topicId})
        this.findAllAssignmentsForTopic(topicId)
    }

    findAllAssignmentsForTopic(topicId) {
        this.assignmentService.findAllAssignmentsForTopic(topicId)
            .then( assignments =>
                ( this.setState({assignments: assignments})))
    }

    addAssignment() {
        if(!this.state.assignmentTitle){
            Alert.alert("Provide title to add Assignment.")
            return
        }

        let assignment = {
            title:this.state.assignmentTitle,
            description: "Assignment description",
            points: 0,
            text:"assignment",
            widgetType:"Assignment"
        }

         this.assignmentService.addAssignment(this.state.topicId, assignment)
            .then(response => (response.json()))
            .then(()=>( this.findAllAssignmentsForTopic(this.state.topicId)))
    }

    render() {
        return(
            <ScrollView style={style.scrollView}>
                <View>
                    <View style={style.addWidgetView}>
                            <View style={style.addWidgetTextView}>
                                <TextInput style={style.addWidgetTextViewInput} onChangeText={(text)=>{
                                    this.setState({assignmentTitle:text})
                                }} placeholder="Add Assignment"/>
                            </View>
                            <View style={style.addWidgetIconView}>
                                <Icon
                                    color='white'
                                    name='note-add'
                                    onPress={()=> this.addAssignment()}
                                />
                            </View>
                        </View>
                        <View>
                            {this.state.assignments.map(
                                (assignment, index) => (
                                    <ListItem
                                        onPress={() => this.props.navigation
                                            .navigate("Assignment", {assignmentId: assignment.id})}
                                        key={index}
                                        title={assignment.title}/>))}
                        </View>
                </View>
            </ScrollView>
        )
    }
}
export default WidgetList