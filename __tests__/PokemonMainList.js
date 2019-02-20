import Enzyme, { shallow, mount } from "enzyme";
import React from "react";
import PokemonMainList from "../src/components/PokemonMainList"
import PokeDataProcessor from "../src/library/networking/PokeDataProcessor"
import Adapter from "enzyme-adapter-react-16";
import ExpectedResults from "../queryResults/ExpectedResults";

Enzyme.configure({adapter: new Adapter()})
describe("Test creation", () => {
    it("should render", () => {
        const wrapper = shallow(
            <PokemonMainList list = {[]}/>)
        expect(wrapper.exists()).toBe(true);
    });

    it("When created, a list should be created containing all the list items and section headers", () => {

        const pokemonList = [
            "Abra",
            "Alakazam",
            "Bulbasaur",
            "Blastoise",
            "Charmander",
            "Charizard",
            "Charmeleon",
            "Zapados"
        ];
        const expected = [
            {
                header: "A",
                data: [
                    "Abra",
                    "Alakazam"
                ]
            },
            {
                header: "B",
                data: [
                    "Bulbasaur",
                    "Blastoise"
                ]
            },
            {
                header: "C",
                data: [
                    "Charmander",
                    "Charizard",
                    "Charmeleon"
                ]
            },
            {
                header: "Z",
                data: ["Zapados"]
            }
        ];
        const wrapper = shallow(<PokemonMainList
            list = {pokemonList}
        />);
        expect(wrapper.state().list).toEqual(expected);
    });
    it("Should be able to render a list of all the pokemon", async function() {
        let dataProcessor = new PokeDataProcessor();
        let pokemon = await dataProcessor.getListOfPokemon();
        const wrapper = shallow(
            <PokemonMainList list = {pokemon}/>
        );
        console.log(wrapper.state().list);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.state().list.length).toEqual(26);
    })

});