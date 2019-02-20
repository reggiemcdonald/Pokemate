import Enzyme, { shallow, mount } from "enzyme";
import React from "react";
import PokemonMainList from "../src/components/PokemonMainList"
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()})
describe("Test creation", () => {
    const wrapper = shallow(<PokemonMainList/>);
    it("should render", () => {
        expect(wrapper.exists()).toBe(true);
    });
    it("should have a state data", () => {
        expect(wrapper.state().data).toEqual([]);
    })
});