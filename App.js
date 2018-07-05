import React, {Component}  from 'react';
import {View, ScrollView} from 'react-native';
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import AssignmentWidget from './components/AssignmentWidget'
import ExamWidget from './components/ExamWidget'


import { createStackNavigator } from 'react-navigation'

const App = createStackNavigator({
    TopicList,
    WidgetList,
    AssignmentWidget,
    ExamWidget
})

export default App