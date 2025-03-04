import { characterClass } from "types/character";

export const formatModifier = (modifier: number) => {
  return modifier > 0 ? `+${modifier}` : `${modifier}`;
};

export const calculateModifier = (score: number) => {
  return Math.floor((score - 10) / 2);
};

const classToSubclassesMap: Record<string, string[]> = {
  barbarian: ["berserker", "totem warrior"],
  bard: ["lore", "valor"],
  cleric: ["life", "light"],
  druid: ["land", "moon"],
  fighter: ["champion", "battle master"],
  monk: ["open hand", "shadow"],
  paladin: ["devotion", "ancients"],
  ranger: ["hunter", "beast master"],
  rogue: ["thief", "assassin"],
  sorcerer: ["draconic bloodline", "wild magic"],
  warlock: ["fiend", "archfey"],
  wizard: ["abjuration", "evocation"],
};

export const mapClassToSubclasses = (classType: characterClass | undefined) => {
  if (classType == undefined) {
    return [];
  }

  return ["none"].concat(classToSubclassesMap[classType]);
};
