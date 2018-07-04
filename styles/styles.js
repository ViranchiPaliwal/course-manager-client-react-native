import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    viewStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        flexWrap: 'wrap'
    },
    essayStyle: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 0.5,
        backgroundColor:'white'
    },
    buttonStyle: {
        padding:5,
        borderRadius: 5
    },
    scrollViewStyle: {
        padding:15
    },
    addWidgetView: {
        backgroundColor:'#007bff',
        padding:10,
        flex:1,
        flexDirection:'row',
        margin:10
    },
    addWidgetTextView: {
        flex:9
    },
    addWidgetIconView: {
        flex:1,
        paddingTop:3
    },
    addWidgetTextViewInput: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor:'white',
        borderRadius:5,
        paddingLeft:5
    }
})