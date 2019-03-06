import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ModalBaseStat from "../src/components/modalsContent/ModalBaseStat";
import ExpectedResults from "../queryResults/ExpectedResults";
import PokeDataManager from "../src/library/networking/PokeDataManager";
import {Text} from "react-native";

describe("ModalBaseStat: render", () => {
    const manager = new PokeDataManager();
    it("Should render without error when given a valid base stats data structure", () => {
        const tree =
            renderer.create(<ModalBaseStat data={ExpectedResults.baseStatsHp}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("Should render a novel base stats data structure without error", async () => {
        const data = await manager.getBaseStat("defense");
        const tree =
            renderer.create(<ModalBaseStat data={data}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("The name should be displayed correctly", () => {
        Enzyme.configure({adapter: new Adapter()});
        const wrapper = shallow(
                    <ModalBaseStat
                        data={ExpectedResults.baseStatsHp}
                    />
                );

        expect(wrapper.contains(<Text testID={'testIdName'}>HP</Text>)).toBe(true);

    })
});