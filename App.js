import React, {Component}  from 'react';
import {View, ScrollView} from 'react-native';
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import Assignment from './components/Assignment'

import { createStackNavigator } from 'react-navigation'

const App = createStackNavigator({
    TopicList,
    WidgetList,
    Assignment
})

export default App