
import { StyleSheet } from 'react-native';
import COLORS from '../colors/color';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const STYLES = StyleSheet.create({
    container: {
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomLeftRadius: 48,
        borderBottomRightRadius: 48,
    },
    containereg: {
        backgroundColor: COLORS.light,
        alignItems: 'center',
        borderBottomLeftRadius: 48,
        borderBottomRightRadius: 48,
        // backgroundColor: 'red'
    },
    front: {
        height: width * 0.7,
        width: width * 0.8,
        // backgroundColor: "red"
    },
    inputContainer: {

    },
    person: {
        width: '15%',
        height: '47%',
        marginLeft: '74%',
        marginTop: '-12%'
    },
    personuser: {
        width: '19%',
        height: 55,
        marginTop: -59,

        marginLeft: 310,
        // marginRight: 17
    },
    reg: {
        height: '10%',
        width: '70%',

        // alignSelf: 'center'

    },
    line: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.dark,
        marginTop: 18,
        // position: 'absolute'
    },
    appliedline: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.dark,
        marginTop: 18,
        // position: 'absolute'
    },
    card: {
        backgroundColor: COLORS.light,
        borderRadius: 10,
        padding: 23,
        margin: 8,
        elevation: 4,
        borderRadius: 15,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
    },
    carddashboard: {
        backgroundColor: COLORS.light,
        borderRadius: 10,
        // padding: 53,
        margin: 23,
        width: '40%',
        height: 130,
        elevation: 7,
        borderRadius: 15,
        shadowColor: COLORS.dark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
    },
    cardposted: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 34,
        margin: 8,
        elevation: 7,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 15,
        shadowColor: COLORS.dark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 6,
    },
    cardfav: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 14,
        margin: 8,
        elevation: 7,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 15,
        shadowColor: COLORS.dark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 6,
    },

    jobTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: '800'
    },
    textvalue: {
        width: '80%',
        height: 65,
        borderWidth: 1,
        borderColor: COLORS.light,
        paddingHorizontal: 20,
        marginTop: 16,
        borderRadius: 15,
        fontSize: 16,
        alignSelf: 'center'
    },
    uservalue: {
        borderWidth: 1,
        borderColor: COLORS.light,
        width: '80%',
        // height: '20%',
        borderRadius: 15,
        fontSize: 16,
        marginTop: 15,
        alignSelf: 'center'
    },
    useredit: {
        borderWidth: 1,
        borderColor: COLORS.light,
        width: '80%',
        // height: '20%',
        borderRadius: 15,
        fontSize: 15,
        marginTop: 25,
        alignSelf: 'center'
    },
    search: {
        borderWidth: 1,
        borderColor: COLORS.dark,
        width: '80%',
        // height: '20%',
        // marginLeft: 10,
        borderRadius: 15,
        fontSize: 16,
        marginTop: 15,
        alignSelf: 'center'
    },
    userprofileedit: {
        borderWidth: 1,
        borderColor: COLORS.dark,
        width: '80%',
        // height: '20%',
        borderRadius: 15,
        fontSize: 16,
        marginTop: 2,
        marginLeft: 22,
        alignSelf: 'center'
    },
    text2value: {
        borderWidth: 1,
        borderColor: COLORS.light,
        width: '80%',
        height: 65,
        paddingHorizontal: 20,
        borderRadius: 15,
        fontSize: 16,
        marginTop: 15,
        alignSelf: 'center',
        // backgroundColor: COLORS.light,
    },
    cloudButton: {
        backgroundColor: COLORS.light,
        borderRadius: 20,
        // paddingHorizontal: 32,
        paddingVertical: 16,
        width: width * 0.35,
        marginTop: 25,
        alignSelf: 'center'
    },
    shortButton: {
        backgroundColor: 'green',
        borderRadius: 20,
        // paddingHorizontal: 32,
        paddingVertical: 10,
        width: width * 0.20,
        marginTop: 25,
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
        // justifyContent: 'center'


    },

    registerText: {
        color: COLORS.light,
        textDecorationLine: 'underline',
        fontSize: 17,
        marginLeft: 5,
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
    profiledetails: {
        flexDirection: 'row', fontSize: 33, marginTop: 12,
        fontWeight: '600',
        fontSize: 19,
        color: COLORS.dark,
        alignSelf: 'center'

    },
    modaledit: {

        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F5EEF8',
        margin: 20,
        width: '70%',
        borderRadius: 10,
        elevation: 4,
        shadowColor: COLORS.dark,
        alignItems: 'center',
        alignSelf: 'center'

    },
    editjob: {
        backgroundColor: '#F5EEF8',
        borderRadius: 10,
        padding: 10,

        margin: 20,
        width: '70%',
        elevation: 7,
        alignItems: 'center',
    },

    jobDpackage: {
        marginLeft: 10,
        color: COLORS.dark
    },
    jobDescription: {
        color: COLORS.dark,

    },
    postedjob: {
        color: COLORS.light,
        fontSize: 22,
        marginTop: -19
    }
})

export default STYLES;