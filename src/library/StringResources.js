export const StatNameFormats = {
    speed: "Speed",
    "special-defense": "Sp. Def",
    "special-attack": "Sp. Atk",
    defense: "Defense",
    attack: "Attack",
    hp: "HP",
};

/**
 * Base Stat descriptions paraphrased from:
 * https://bulbapedia.bulbagarden.net/wiki/Statistic
 */
const hp = "Hit Points (HP) determine how much damage a Pokemon can sustain before fainting. During a battle, " +
    "Hit Points are shown as a green bar on the screen.";
const attack = "Attack plays a role in determining how much damage a Pokemon deals when using " +
    "a physical move.";
const defense = "Defense plays a role in determining the amount of damage sustained by a Pokemon " +
    "following a physical attack.";
const spAttack = "Special Attack plays a role in determining the amount of damage dealt by a Pokemon when " +
    "using a special move. Note: Special Attack was introduced in Generation II " +
    "stemming from the original Special stat.";
const spDefense = "Special Defense plays a role in determining the amount of damage sustained by a " +
    "Pokemon from a special move. Note: special defense was introduced in Generation II, " +
    "stemming from the original special stat.";
const speed = "Speed determines the turn order of turns by Pokemon in battle. During a battle, the Pokemon " +
    "with the higher Speed stat will be more likely to "
export const baseStatDescriptions = {
    hp: hp,
    attack: attack,
    defense: defense,
    "special-attack": spAttack,
    "special-defense": spDefense,
    speed: speed,
};
