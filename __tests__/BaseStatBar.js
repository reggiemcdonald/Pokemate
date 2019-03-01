import React from "react";
import renderer from "react-test-renderer";
import BaseStatBar from "../src/components/BaseStatBar";
import ErrorBoundary from "../src/components/ErrorBoundary";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Text}  from "react-native";
import InvalidValue from "../src/library/errors/InvalidValue";
describe("Base Stat Bar Render", () => {
    const statValue = 45;
    it("BaseStatBar should render without error when using default style", () => {
        // Bulbasaur base HP : 45
        const statName = "hp";
        const statValue = 45;
        const tree = renderer.create(
            <BaseStatBar
                statName={statName}
                statValue={statValue}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("BaseStatBar should render ErrorBoundary with invalid value", () => {
        // No value can be greater than 255
        const statName = "hp";
        const extremeStatValue = 300;
        const tree = renderer.create(
            <ErrorBoundary>
                <BaseStatBar
                    statName={statName}
                    statValue={extremeStatValue}
                />
            </ErrorBoundary>
        );
        expect(tree).toMatchSnapshot()
    });
    Enzyme.configure({adapter: new Adapter()});
    it("BaseStatBar should properly format the name of the stat for display", () =>{
        const statName = "hp";
        const wrapper = shallow(
            <BaseStatBar
                statName={statName}
                statValue={statValue}
            />
        );
        // const render = wrapper.dive();

        expect(wrapper.contains(<Text testID={"statName"}>HP</Text>)).toBe(true);

    });
    it("BaseStatBar should properly format the name of the stat that has a dash in it", () =>{
        const statName = "special-attack";
        const wrapper = shallow(
            <BaseStatBar
                statName={statName}
                statValue={statValue}
            />
        );
        // const render = wrapper.dive();

        expect(wrapper.contains(<Text testID={"statName"}>Special Attack</Text>)).toBe(true);

    });
    it("BaseStatBar should throw an error when not given a name", () =>{
        try {
            const wrapper = shallow(
                <BaseStatBar
                    statValue={statValue}
                />
            );
            expect(true).toBe(false);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidValue);
        }
    });
    it("BaseStatBar should throw an error when the stat isn't a real stat but not null either", () => {
        const badStatName = "hitpoints";
        try {
            const wrapper = shallow(
                <BaseStatBar
                    statName={badStatName}
                    statValue={statValue}
                />
            );
            expect(true).toBe(false);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidValue);
        }
    })
});