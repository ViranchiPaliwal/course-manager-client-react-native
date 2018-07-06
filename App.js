import React, {Component}  from 'react';
import {View, ScrollView} from 'react-native';
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import AssignmentWidget from './components/AssignmentWidget'
import ExamWidget from './components/ExamWidget'
import MultipleChoiceQuestionWidget from './components/MultipleChoiceQuestionWidget'
import FillInTheBlanksQuestionWidget from './components/FillInTheBlanksQuestionWidget'
import TrueOrFalseQuestionWidget from './components/TrueOrFalseQuestionWidget'
import EssayQuestionWidget from './components/EssayQuestionWidget'

import { createStackNavigator } from 'react-navigation'

const App = createStackNavigator({
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    AssignmentWidget,
    ExamWidget,
    MultipleChoiceQuestionWidget,
    FillInTheBlanksQuestionWidget,
    TrueOrFalseQuestionWidget,
    EssayQuestionWidget
})

export default App