import React, {Component} from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import style from '../styles/styles';
import {Text, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

class Assignment extends Component {
    static navigationOptions = {
        title: 'Assignment',
        headerStyle:{backgroundColor: "#007bff"}
    }

    constructor(props) {
        super(props)
        this.state = {
            topicId: '',
            title: '',
            description: '',
            points: 0
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.setState({topicId:topicId})
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

    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={ text => this.update({title: text})}/>
                <FormValidationMessage> Title is required </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={ text => this.update({description: text})}/>
                <FormValidationMessage> Description is required </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={ points => this.update({points: points}) }/>
                <FormValidationMessage> Points is required </FormValidationMessage>

                <Button style={style.buttonStyle}
                        backgroundColor="green"
                        color="white"
                        title="Save"
                        onPress={() => {this.saveAssignment()}}/>
                <Button style={style.buttonStyle}
                       backgroundColor="red"
                       color="white"
                       title="Cancel"
                       onPress={() => { this.props.navigation
                                        .navigate("WidgetList", {lessonId: this.state.lessonId})
                                      }}/>
                <Text h2>Preview</Text>
                <View style={style.viewStyle}>
                <Text h3>{this.state.title}</Text>
                <Text h4>{this.state.points}</Text>
                </View>
                <Text >{this.state.description}</Text>

                <Text h4>Essay Answer</Text>
                <TextInput style={style.essayStyle}/>

                <Text h3>Upload a file</Text>

                <Text h3>Submit a Link</Text>

            </ScrollView>
        )
    }
}
export default Assignment