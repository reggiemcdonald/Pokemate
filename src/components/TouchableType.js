import React from "react";
import TouchableAspect from "./TouchableAspect";
import {TypeColor} from "../library/styles";
import {
    View,
    Modal,
    Text,
    TouchableOpacity
} from "react-native";
import styles from "../library/styles";

/**
 * ************
 * A Type Icon
 * ***********
 * An icon that represents a Pokemon type, that can be used
 * to open a detailed view of type information
 */
export default class TouchableType extends React.Component {

    constructor(props) {
        super(props);
        // TODO
        this.state = {
            data: props.dataSource.data ? props.dataSource.data : {
                aspectName: "Aspect Name",
                style: undefined
            },
            style: this.generateColor(props.dataSource.data.type),
            modalVisible: false
        }
    }
    /**
     * Given a type, returns the appropriate style from the stylesheet
     */
    generateColor(type) {
        if (type) {
            return TypeColor[type];
        } else {
            return TypeColor.psychic;
        }
    }

    handlePress(elem) {
        let visibility = !this.state.modalVisible;
        this.setState({
            modalVisible: visibility
        });
    }

    render() {
        return(
            <View>
                <Modal
                    transparent={false}
                    visible={this.state.modalVisible}
                    animationType={"slide"}
                >
                    <View style={styles.containerCentered}>
                        <Text>This is some text in that cool new modal you've just opened</Text>
                        <TouchableOpacity onPress={this.handlePress.bind(this)}>
                                <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <TouchableAspect
                    dataSource = {
                        {
                            data: {
                                aspectName: this.state.data.type,
                                style: this.state.style
                            }
                        }
                    }
                    handlePress={this.handlePress.bind(this)}
                />
            </View>
        )
    }
}