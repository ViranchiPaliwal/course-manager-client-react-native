import React, {Component}  from 'react';
import {View, ScrollView} from 'react-native';
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import { createStackNavigator } from 'react-navigation'

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ScrollView>
                <StatusBar barStyle="light-content"/>
            </ScrollView>
        )
    }
}
const App = createStackNavigator({
    CourseList,
    ModuleList,
    LessonList
})

export default App