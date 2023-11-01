
import { StyleSheet } from 'react-native';
import COLORS from '../colors/color';
const STYLES = StyleSheet.create({

    container: {
        backgroundColor: COLORS.light,
        borderBottomLeftRadius: 42,
        borderBottomRightRadius: 42,
        padding: 15,
    },

    containereg: {
        backgroundColor: COLORS.light,
        borderBottomLeftRadius: 42,
        borderBottomRightRadius: 42,
        height: '30%'
    },
    front: {
        height: 200,
        width: 200,
        marginTop: 12,
        alignSelf: 'center',

    },
    inputContainer: {

    },
    person: {
        width: '12%',
        height: '24%',
        marginLeft: '77%',
        marginTop: '-12%'
    },
    reg: {
        height: '10%',
        width: '70%',

        // alignSelf: 'center'

    },
    textvalue: {
        borderWidth: 1,
        borderColor: COLORS.light,
        width: '77%',
        height: '20%',
        borderRadius: 15,
        fontSize: 16,
        // marginTop: -15,
        alignSelf: 'center'
    },
    uservalue: {
        borderWidth: 1,
        borderColor: COLORS.light,
        width: '77%',
        // height: '20%',
        borderRadius: 15,
        fontSize: 16,
        marginTop: 15,
        alignSelf: 'center'
    },
    text2value: {
        borderWidth: 1,
        borderColor: COLORS.light,
        width: '77%',
        height: '20%',
        borderRadius: 15,
        fontSize: 16,
        marginTop: 15,
        alignSelf: 'center',
        // backgroundColor: COLORS.light,
    },
    cloudButton: {
        backgroundColor: COLORS.light,
        borderRadius: 20,
        padding: 14,
        width: '27%',
        marginTop: -42,
        alignSelf: 'center'
    },
    closeButton: {
        backgroundColor: COLORS.light,
        borderRadius: 20,
        padding: 14,
        width: '26%',
        marginTop: -42,
        marginLeft: 15,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center',
        width: '90%',
        // justifyContent: 'center'


    },
    registerText: {
        alignSelf: 'flex-end',
        marginRight: 45,
        marginTop: -24,
        color: COLORS.light,
        textDecorationLine: 'underline',
        fontSize: 17
    },
    searchimg: {
        width: 45, height: 33,
    },
    postinput: {
        borderBottomWidth: 1, // Add a 1-pixel underline
        borderColor: COLORS.light, // Border color
        padding: 12,
        fontSize: 16,
        width: '85%',
        alignSelf: 'center'
    },
})

export default STYLES;