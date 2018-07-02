import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class Assignment extends Component {
    static navigationOptions = {
        title: 'Assignment',
        headerStyle:{backgroundColor: "#007bff"}
    }

    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
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
export default Assignment
