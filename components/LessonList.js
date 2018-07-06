import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class LessonList extends Component {
    static navigationOptions = {title: 'Lessons',
        headerTintColor:'white',
        headerStyle:{backgroundColor: "#007bff"}
    }
    constructor(props) {
        super(props)
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        this.setState({courseId: courseId})
        this.setState({moduleId: moduleId})
        fetch("http://localhost:8080/api/course/"+courseId+"/module/"+moduleId+"/lesson")
            .then(response => (response.json()))
            .then(lessons => this.setState({lessons: lessons}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.lessons.map(
                    (lesson, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("TopicList", {lessonId: lesson.id,
                                    courseId: this.state.courseId,
                                    moduleId: this.state.moduleId})}
                            key={index}
                            title={lesson.title}/>))}
            </View>
        )
    }
}
export default LessonList