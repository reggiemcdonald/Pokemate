import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    titleBar: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: "#e6e6e6",
        backgroundColor: "#F5FCFF",
        shadowOffset:{
            height: 2,
            width:0
        },
        shadowRadius: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    detailViewTitleText: {
        fontSize: 30,
        fontWeight: "bold",
        marginRight: 5,
        backgroundColor: "transparent"
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",

    },
    detailViewSubText: {
        fontSize: 18,

    },
    spriteContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    sprite: {
        width: 250,
        height: 200,
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
        backgroundColor: '#F5FCFF',
        paddingLeft: 10
    },
    characterViewContainer: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#F5FCFF',
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
        borderRadius: 20,
        height: 30,
        width: 90,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    defaultTouchableAspectColor: {
        backgroundColor: "#cacbce",
    },
    touchableAspectText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 15,
        marginRight: 15,
        color: "white"
    },
    defenseStats: {
        borderRadius: 10,
        marginRight:10,
        marginTop: 5,
        marginBottom: 5,
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOpacity: 0.1,
        shadowOffset: {
            height: 3,
            width: 0
        }
    },
    defenseDefault: {
        backgroundColor: "#ccccff"
    },
    defenseStatTextViewDefault: {
        backgroundColor: "#8080ff"
    },
    defenseStatText:{
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 5,
        color: "white"
    },
    defenseStatTextView: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    defenseGreen: {
        backgroundColor: "#bcf9bc"
    },
    defenseRed: {
        backgroundColor: "#ffcccc"
    },
    defenseStatTextViewRed: {
        backgroundColor: "#ff5b51",
    },
    defenseStatTextViewGreen: {
        backgroundColor: "#1f8d00"
    },
    evolutionChainSprite: {
        width: 100,
        height: 100,
    },
    evolutionChainScrollView: {
        flexGrow: 1,
        borderRadius: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        margin: 5
    },
    evolutionChain:{
        borderRadius: 10,
        marginRight: 10,
        marginTop: 5,
        backgroundColor: "#b3d9ff",
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOpacity: 0.1,
        shadowOffset: {
            height: 3,
            width: 0
        }
    },
    evolutionChainTextView: {
        backgroundColor: "#4da6ff"
    },
    evolutionChainItemWithArrow: {
        flexDirection: 'row',
        alignItems: "flex-start",
        backgroundColor: "transparent"
    },
    evolutionChainArrowText: {
        fontSize: 10
    },
    baseStatBar: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    sta: {
        backgroundColor: "#cacbce"
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
});
const BaseStatBarLow = {
    progressTint: "#ff3333",
    trackTint: "#ff9999"
};
const BaseStatBarMed = {
    progressTint: "#ff751a",
    trackTint: "#ffc299"
};
const BaseStatBarHigh = {
    progressTint: "#00b33c",
    trackTint: "#66ff99"
};

export default styles;
export{TypeColor, BaseStatBarHigh, BaseStatBarMed, BaseStatBarLow,};