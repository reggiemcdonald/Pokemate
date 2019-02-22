import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    detailViewTitleText: {
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: 10,
        paddingRight: 10
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
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: "center",
        alignItems: "center"
    },
    containerLeftAligned: {
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
    sectionListItem: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    placeholderText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    touchableAspect: {
        borderRadius: 3,
        height: 30,
        width: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    defaultTouchableAspectColor: {
        backgroundColor: "#cacbce",
    },
    touchableAspectText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
        marginRight: 15,
        color: "white"
    }
});

const TypeColor = StyleSheet.create({
    default: {backgroundColor: "#cacbce"},
    normal: {backgroundColor: "#A8A77A"},
    fighting: {backgroundColor: "#BE312D"},
    flying: {backgroundColor: "#A893ED"},
    poison: {backgroundColor: "#9F449E"},
    ground: {backgroundColor: "#DFBF6E"},
    rock: {backgroundColor: "#B79F41"},
    bug: {backgroundColor: "#A8B631"},
    ghost: {backgroundColor: "#705A96"},
    steel: {backgroundColor: "#B8B8CF"},
    fire: {backgroundColor: "#EE803B"},
    water: {backgroundColor: "#6A92ED"},
    grass: {backgroundColor: "#7BC657"},
    electric: {backgroundColor: "#F7CE43"},
    psychic: {backgroundColor: "#F55B89"},
    ice: {backgroundColor: "#9AD8D7"},
    dragon: {backgroundColor: "#7043F4"},
    dark: {backgroundColor: "#705849"},
    fairy: {backgroundColor: "#EC9AAC"}
})
export default styles;
export{TypeColor};