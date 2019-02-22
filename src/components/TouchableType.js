import React from "react";
import TouchableAspect from "./TouchableAspect";
import {TypeColor} from "../library/styles";

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
            data: props.dataSource.data,
            style: this.generateColor(props.dataSource.data.type)
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

    render() {
        return(
            <TouchableAspect
                dataSource = {
                    {
                        data: {
                            aspectName: this.state.data.type,
                            style: this.state.style
                        }
                    }
                }
            />
        )
    }
}