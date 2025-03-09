import { createContext, useContext, useState } from "react";
import {
  abilityName,
  characterAlignment,
  characterBackground,
  characterClass,
  CharacterData,
  characterRace,
  characterSubclass,
  reportType,
  skillName,
} from "types/character";

interface CharacterContextProps {
  character: CharacterData;
  updateAbilityScore: (ability: abilityName, score: number) => void;
  updateSkillProficiency: (skill: skillName, proficiency: boolean) => void;
  updateLevel: (level: number) => void;
  updateName: (name: string) => void;
  importCharacter: (data: CharacterData) => void;
  exportCharacter: () => CharacterData;
  updateRace: (race: characterRace) => void;
  updateClass: (classType: characterClass) => void;
  updateSubclass: (subclass: characterSubclass) => void;
  updateAlignment: (alignment: characterAlignment) => void;
  updateBackground: (background: characterBackground) => void;
  getReport: (type: reportType) => string;
}

export const CharacterContext = createContext<
  CharacterContextProps | undefined
>(undefined);

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};
export const CharacterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [character, setCharacter] = useState(new CharacterData());

  const characterDataChange = (
    dataChange: (character: CharacterData) => void
  ) => {
    setCharacter((prevCharacter) => {
      const newCharacter = new CharacterData();
      Object.assign(newCharacter, prevCharacter);
      dataChange(newCharacter);
      return newCharacter;
    });
  };

  const callbacks = {
    importCharacter: (data: CharacterData) => {
      characterDataChange((character) => {
        character.copy(data);
      });
    },
    exportCharacter: () => {
      return character;
    },
    updateName: (name: string) => {
      characterDataChange((newCharacter) => {
        newCharacter.name = name;
      });
    },
    updateAbilityScore: (ability: abilityName, score: number) => {
      characterDataChange((newCharacter) =>
        newCharacter.updateAbilityScore(ability, score)
      );
    },
    updateSkillProficiency: (skill: skillName, proficiency: boolean) => {
      characterDataChange((newCharacter) =>
        newCharacter.updateSkillProficiency(skill, proficiency)
      );
    },
    updateLevel: (level: number) => {
      characterDataChange((newCharacter) => newCharacter.updateLevel(level));
    },
    updateRace: (race: characterRace) => {
      characterDataChange((newCharacter) => (newCharacter.race = race));
    },
    updateClass: (classType: characterClass) => {
      characterDataChange((newCharacter) => (newCharacter.class = classType));
    },
    updateSubclass: (subclass: characterSubclass) => {
      characterDataChange((newCharacter) => (newCharacter.subclass = subclass));
    },
    updateAlignment: (alignment: characterAlignment) => {
      characterDataChange(
        (newCharacter) => (newCharacter.alignment = alignment)
      );
    },
    updateBackground: (background: characterBackground) => {
      characterDataChange(
        (newCharacter) => (newCharacter.background = background)
      );
    },
    getReport: (type: reportType) => {
      return character.getReport(type);
    },
  };

  return (
    <CharacterContext.Provider
      value={{
        character,
        ...callbacks,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
