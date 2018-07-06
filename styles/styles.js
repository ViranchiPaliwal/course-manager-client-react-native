import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    viewStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        flexWrap: 'wrap',
        margin: 5
    },
    essayStyle: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 0.5,
        backgroundColor:'white'
    },
    linkStyle: {
        borderColor: 'gray',
        borderWidth: 0.5,
        height: 30,
        backgroundColor:'white'
    },
    buttonStyle: {
        padding:5,
        borderRadius: 20
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
    },
    examWidgetTitle: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:'lightgrey',
        padding:5,
        justifyContent: 'center'
    },
    preview: {
        justifyContent: 'center',
        flex:1,
        flexDirection: "row"
    },
    previewText: {
        color: '#007bff',
        fontWeight: 'bold'
    },
    partitioner: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        margin:5
    },
    textMargin: {
        margin:5
    },
    descriptionStyle: {
        fontSize: 18,
        margin: 5
    },
    fibStyle: {
        height: 25,
        width: 60,
        borderColor: 'gray',
        borderWidth: 0.5,
        backgroundColor:'white'
    }
})