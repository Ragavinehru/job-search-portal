
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
        alignSelf: 'center'

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
        width: '26%',
        marginTop: -42,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    registerText: {
        alignSelf: 'flex-end',
        marginRight: 65,
        marginTop: -24,
        color: COLORS.light,
        textDecorationLine: 'underline',
        fontSize: 17
    },
})

export default STYLES;