import {
  CharacterProvider,
  useCharacter,
} from "@components/character/CharacterProvider";
import { Button, Dropdown, NumberInput } from "@components/controls";
import Checkbox from "@components/controls/Checkbox";
import TextInput from "@components/controls/TextInput";
import { Section } from "@components/layout";
import Collapsible from "@components/layout/Collapsible";
import {
  faFileImport,
  faMagnifyingGlassPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassMinus";
import {
  formatModifier,
  mapClassToSubclasses,
} from "@utilities/characterUtils";
import { useRef } from "react";
import {
  abilityName,
  alignments,
  backgrounds,
  characterAlignment,
  characterBackground,
  characterClass,
  characterRace,
  characterSubclass,
  classes,
  races,
  skillName,
} from "types/character";

const Character = () => {
  return (
    <Section>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="space-y-4">
          <BasicInfo />
          <FileButtons />
        </div>
        <div className="flex flex-col gap-6 p-4 bg-zinc-900 border">
          <AbilityScores />
          <Skills />
        </div>
      </div>
    </Section>
  );
};

const FileButtons = () => {
  const { character, importCharacter } = useCharacter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const importedCharacter = JSON.parse(content);
        importCharacter(importedCharacter);
      };
      reader.readAsText(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getDefaultFileName = () => {
    if (!character.name) {
      return "character-sheet.json";
    }

    return [character.name.replace(/ /g, "_"), "character-sheet.json"]
      .join("_")
      .toLowerCase();
  };

  const saveCharacterData = () => {
    const characterData = JSON.stringify(character, null, 2);
    const blob = new Blob([characterData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = getDefaultFileName();
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-6 transition-all duration-300 justify-center">
      <div className="flex gap-6">
        <Button
          bg="bg-red-800"
          hoverBg="hover:bg-red-600"
          padding="p-4"
          onClick={openFileDialog}
          tooltip="Import Character from JSON"
          icon={faFileImport}
        >
          import
        </Button>
        <Button
          bg="bg-red-800"
          hoverBg="hover:bg-red-600"
          padding="p-4"
          onClick={saveCharacterData}
          tooltip="Save Character Data as JSON"
          icon={faSave}
        >
          save
        </Button>
      </div>
      <input
        hidden
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

const BasicInfo = () => {
  const {
    character,
    updateName,
    updateRace,
    updateClass,
    updateSubclass,
    updateBackground,
    updateAlignment,
    updateLevel,
  } = useCharacter();

  return (
    <div className="flex flex-col gap-2 bg-zinc-900 p-4 border">
      <p className="font-bold text-xl">Basic Info</p>
      <div className="flex gap-6">
        <TextInput
          padding="p-2"
          className="w-full"
          label="Name"
          value={character.name}
          onChange={(e) => updateName(e.target.value)}
        />
        <NumberInput
          showAdjustment
          label="Level"
          value={character.levelInfo.level}
          onChange={(value) => updateLevel(value)}
        />
      </div>
      <div className="space-y-4">
        <Dropdown
          label="alignment"
          options={alignments}
          placeholder="select an alignment"
          setSelection={(value) => updateAlignment(value as characterAlignment)}
          defaultValue={character.alignment}
        />
        <Dropdown
          label="race"
          options={races}
          placeholder="select a race"
          setSelection={(value) => updateRace(value as characterRace)}
          defaultValue={character.race}
        />
        <div className="flex gap-2 justify-center">
          <div className="w-1/2">
            <Dropdown
              label="class"
              options={classes}
              placeholder="class"
              setSelection={(value) => {
                updateClass(value as characterClass);
                updateSubclass("none");
              }}
              defaultValue={character.class}
            />
          </div>
          <div className="w-1/2">
            <Dropdown
              label="subclass"
              options={mapClassToSubclasses(character.class)}
              placeholder="subclass"
              disabled={!character.class}
              setSelection={(value) =>
                updateSubclass(value as characterSubclass)
              }
              defaultValue={character.subclass}
            />
          </div>
        </div>
        <Dropdown
          label="background"
          options={backgrounds}
          placeholder="select a background"
          setSelection={(value) =>
            updateBackground(value as characterBackground)
          }
          defaultValue={character.background}
        />
      </div>
    </div>
  );
};

const AbilityScores = () => {
  const { character, updateAbilityScore } = useCharacter();

  const abilityKeys = Object.keys(character.abilities) as abilityName[];

  const getAbilityControl = (abilityName: abilityName) => {
    const ability = character.abilities[abilityName];
    return (
      <NumberInput
        showAdjustment
        label={abilityName.slice(0, 3)}
        value={ability.score}
        onChange={(value) => updateAbilityScore(abilityName, value)}
      />
    );
  };

  const abilityClasses = "flex gap-2 justify-between mx-6";

  return (
    <div className="flex flex-col flex-wrap gap-2">
      <p className="font-bold text-xl">Abilities</p>
      <div className="space-y-2">
        <div className={abilityClasses}>
          {abilityKeys
            .slice(0, 3)
            .map((abilityKey) => getAbilityControl(abilityKey))}
        </div>
        <div className={abilityClasses}>
          {abilityKeys
            .slice(3)
            .map((abilityKey) => getAbilityControl(abilityKey))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { character, updateSkillProficiency } = useCharacter();

  const skillKeys = Object.keys(character.skills) as skillName[];

  const getSkillControl = (skillName: skillName) => {
    const skill = character.skills[skillName];
    return (
      <div key={skillName} className="flex gap-2">
        <div className="w-4 flex justify-center">
          {formatModifier(skill.modifier)}
        </div>
        <Checkbox
          checked={skill.proficiency}
          onChange={(e) => updateSkillProficiency(skillName, e.target.checked)}
        />
        <div>{skillName}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1 ">
      <p className="font-bold text-xl">Skills</p>
      <div className="flex gap-4">
        <div>
          {skillKeys.slice(0, 9).map((skillKey) => getSkillControl(skillKey))}
        </div>
        <div>
          {skillKeys.slice(9).map((skillKey) => getSkillControl(skillKey))}
        </div>
      </div>
    </div>
  );
};

const GeneratedCharacter = () => {
  const { character } = useCharacter();

  return (
    <Section>
      <Collapsible
        buttonCenter
        buttonTextClosed="Show Character Data"
        buttonTextExpanded="Hide Character Data"
        buttonBg="bg-red-900"
        buttonHoverBg="hover:bg-red-700"
        buttonIconClosed={faMagnifyingGlassPlus}
        buttonIconExpanded={faMagnifyingGlassMinus}
      >
        <pre className="bg-zinc-900 p-4">
          {JSON.stringify(character, null, 2)}
        </pre>
      </Collapsible>
    </Section>
  );
};

const CharacterWrapper = () => {
  return (
    <CharacterProvider>
      <Character />
      <GeneratedCharacter />
    </CharacterProvider>
  );
};

export const pageInfo = {
  path: "/character",
  name: "Character Generator",
  Component: CharacterWrapper,
  showInNavbar: false,
  background: "bg-intersect",
};
