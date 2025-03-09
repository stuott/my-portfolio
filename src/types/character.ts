import { calculateModifier } from "@utilities/characterUtils";

export class CharacterData {
  name: string;
  abilities: abilityInfo;
  skills: skillInfo;
  levelInfo: levelInfo;
  class: characterClass | undefined;
  subclass: characterSubclass | undefined;
  race: characterRace | undefined;
  alignment: characterAlignment | undefined;
  background: characterBackground | undefined;

  constructor() {
    this.name = "";
    this.class = undefined;
    this.subclass = undefined;
    this.race = undefined;
    this.alignment = undefined;
    this.background = undefined;
    this.abilities = {
      strength: { score: 10, modifier: 0 },
      dexterity: { score: 10, modifier: 0 },
      constitution: { score: 10, modifier: 0 },
      intelligence: { score: 10, modifier: 0 },
      wisdom: { score: 10, modifier: 0 },
      charisma: { score: 10, modifier: 0 },
    };
    this.skills = {
      acrobatics: { modifier: 0, proficiency: false, ability: "dexterity" },
      animalHandling: { modifier: 0, proficiency: false, ability: "wisdom" },
      arcana: { modifier: 0, proficiency: false, ability: "intelligence" },
      athletics: { modifier: 0, proficiency: false, ability: "strength" },
      deception: { modifier: 0, proficiency: false, ability: "charisma" },
      history: { modifier: 0, proficiency: false, ability: "intelligence" },
      insight: { modifier: 0, proficiency: false, ability: "wisdom" },
      intimidation: { modifier: 0, proficiency: false, ability: "charisma" },
      investigation: {
        modifier: 0,
        proficiency: false,
        ability: "intelligence",
      },
      medicine: { modifier: 0, proficiency: false, ability: "wisdom" },
      nature: { modifier: 0, proficiency: false, ability: "intelligence" },
      perception: { modifier: 0, proficiency: false, ability: "wisdom" },
      performance: { modifier: 0, proficiency: false, ability: "charisma" },
      persuasion: { modifier: 0, proficiency: false, ability: "charisma" },
      religion: { modifier: 0, proficiency: false, ability: "intelligence" },
      sleightOfHand: { modifier: 0, proficiency: false, ability: "dexterity" },
      stealth: { modifier: 0, proficiency: false, ability: "dexterity" },
      survival: { modifier: 0, proficiency: false, ability: "wisdom" },
    };
    this.levelInfo = {
      level: 1,
      experience: 0,
      proficiencyBonus: 2,
    };
  }

  copy(characterData: CharacterData) {
    this.name = characterData.name;
    this.class = characterData.class;
    this.subclass = characterData.subclass;
    this.race = characterData.race;
    this.alignment = characterData.alignment;
    this.background = characterData.background;
    this.abilities = { ...characterData.abilities };
    this.skills = { ...characterData.skills };
    this.levelInfo = { ...characterData.levelInfo };
  }

  updateAbilityScore(ability: abilityName, value: number) {
    this.abilities[ability].score = value;
    this.abilities[ability].modifier = calculateModifier(value);
    this.updateSkillModifiers();
  }

  updateSkillProficiency(skill: skillName, proficiency: boolean) {
    this.skills[skill].proficiency = proficiency;
    this.skills[skill].modifier =
      this.abilities[this.skills[skill].ability].modifier +
      (proficiency ? this.levelInfo.proficiencyBonus : 0);
  }

  updateSkillModifiers() {
    Object.keys(this.skills).forEach((skillKey) => {
      const skillName = skillKey as skillName;
      const skill = this.skills[skillName];
      const abilityModifier = this.abilities[skill.ability].modifier;
      skill.modifier =
        abilityModifier +
        (skill.proficiency ? this.levelInfo.proficiencyBonus : 0);
    });
  }

  updateLevel(level: number) {
    this.levelInfo.level = level;
    this.levelInfo.proficiencyBonus = Math.ceil(level / 4) + 1;
    this.updateSkillModifiers();
  }

  getReport(type: reportType) {
    switch (type) {
      case "sheet":
        return this.getSheet();
      case "json":
        return this.getJSON();
      case "min":
        return this.getMin();
    }
  }

  getJSON() {
    return JSON.stringify(this, null, 2);
  }

  getSheet() {
    return (
      `
      Name: ${this.name}
      Class: ${this.class}
      Subclass: ${this.subclass}
      ` +
      Object.keys(this.abilities)
        .map((ability) => {
          return `${ability}: ${this.abilities[ability as abilityName].score}`;
        })
        .join("\n") +
      `
      ` +
      Object.keys(this.skills)
        .map((skill) => {
          return `${skill}: ${this.skills[skill as skillName].modifier}`;
        })
        .join("\n") +
      `
      Level: ${this.levelInfo.level}
      Experience: ${this.levelInfo.experience}
      Proficiency Bonus: ${this.levelInfo.proficiencyBonus}
      `
    );
  }

  getMin() {
    return `${this.name} - ${this.class} - Level ${this.levelInfo.level}`;
  }
}

export type abilityName = keyof abilityInfo;
export type skillName = keyof skillInfo;

export interface abilityInfo {
  strength: abilityScoreInfo;
  dexterity: abilityScoreInfo;
  constitution: abilityScoreInfo;
  intelligence: abilityScoreInfo;
  wisdom: abilityScoreInfo;
  charisma: abilityScoreInfo;
}

export interface skillInfo {
  acrobatics: skillScoreInfo;
  animalHandling: skillScoreInfo;
  arcana: skillScoreInfo;
  athletics: skillScoreInfo;
  deception: skillScoreInfo;
  history: skillScoreInfo;
  insight: skillScoreInfo;
  intimidation: skillScoreInfo;
  investigation: skillScoreInfo;
  medicine: skillScoreInfo;
  nature: skillScoreInfo;
  perception: skillScoreInfo;
  performance: skillScoreInfo;
  persuasion: skillScoreInfo;
  religion: skillScoreInfo;
  sleightOfHand: skillScoreInfo;
  stealth: skillScoreInfo;
  survival: skillScoreInfo;
}

export interface levelInfo {
  level: number;
  experience: number;
  proficiencyBonus: number;
}

export interface abilityScoreInfo {
  score: number;
  modifier: number;
}

export interface skillScoreInfo {
  proficiency: boolean;
  modifier: number;
  ability: abilityName;
}

export const alignments = [
  "lawful good",
  "neutral good",
  "chaotic good",
  "lawful neutral",
  "true neutral",
  "chaotic neutral",
  "lawful evil",
  "neutral evil",
  "chaotic evil",
] as const;
export type characterAlignment = (typeof alignments)[number];

export const classes = [
  "barbarian",
  "bard",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
] as const;
export type characterClass = (typeof classes)[number];

export const subclasses = [
  "none",
  "berserker",
  "totem warrior",
  "lore",
  "valor",
  "life",
  "light",
  "land",
  "moon",
  "champion",
  "battle master",
  "open hand",
  "shadow",
  "devotion",
  "ancients",
  "hunter",
  "beast master",
  "thief",
  "assassin",
  "draconic bloodline",
  "wild magic",
  "fiend",
  "archfey",
  "abjuration",
  "evocation",
] as const;
export type characterSubclass = (typeof subclasses)[number];

export const backgrounds = [
  "none",
  "acolyte",
  "charlatan",
  "criminal",
  "entertainer",
  "folk hero",
  "guild artisan",
  "hermit",
  "noble",
  "outlander",
  "sage",
  "sailor",
  "soldier",
  "urchin",
] as const;
export type characterBackground = (typeof backgrounds)[number];

export const races = [
  "human",
  "elf",
  "dwarf",
  "halfling",
  "dragonborn",
  "gnome",
  "half-elf",
  "half-orc",
  "tiefling",
] as const;
export type characterRace = (typeof races)[number];

export const reports = ["sheet", "json", "min"] as const;
export type reportType = (typeof reports)[number];
