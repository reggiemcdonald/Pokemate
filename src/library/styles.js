import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    detailViewTitleText: {
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 10
    },
    detailViewSubText: {
        fontSize: 18,
        paddingLeft: 10
    },
    spriteContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    sprite: {
        width: 300,
        height: 300,
    },
    containerCentered: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: "#F5FCFF"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});
export default styles;