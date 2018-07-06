import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends Component {
    static navigationOptions = {
        title: 'Courses',
        headerTintColor:'white',
        headerStyle:{backgroundColor: "#007bff"}
    }

    constructor(props) {
        super(props)
        fetch('http://localhost:8080/api/course')
            .then(response => (response.json()))
            .then(courses => {
                this.setState({courses: courses})
            })
        this.state = {courses: []}
    }

    render() {
        return(
        <View style={{padding: 15}}>
            {this.state.courses.map
            ((course, index) => (
                <ListItem
                    title={course.title}
                    key={index}
                    onPress={() => this.props.navigation.navigate("ModuleList", {courseId: course.id})}/>
            ))}
        </View>
        )
    }
}
export default CourseList
