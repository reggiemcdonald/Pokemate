import Enzyme, { shallow, mount } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import TouchableAspect from "../src/components/TouchableAspect";

Enzyme.configure({adapter: new Adapter()});
describe("Testing the touchable aspect component", () => {
    const wrapper = shallow(
        <TouchableAspect
            dataSource = {{
                data: {
                    aspectName: "Test Component",
                    style: {
                        backgroundColor: "blue"
                    }
                }
            }}
        />
    );
    it("Should render", () => {
      expect(wrapper.exists()).toBe(true);
    })
});