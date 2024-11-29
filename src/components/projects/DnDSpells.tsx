import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Badges from "components/common/Badges";
import IconButton from "components/common/IconButton";
import SearchBar from "components/common/SearchBar";
import Section from "components/layout/Section";
import { useState } from "react";

interface SpellList {
  count: number;
  results: SpellListResult[];
}

interface SpellListResult {
  index: string;
  name: string;
  level: number;
  url: string;
}

interface Spell {
  index: string;
  name: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: ("V" | "S" | "M")[];
  area_of_effect: {
    type: ("sphere" | "cone" | "cube" | "line" | "cylinder")[];
    size: number;
  };
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  attack_type: string;
  damage: {
    damage_type: APIReference;
    damage_at_slot_level: {
      [key: string]: string;
    };
  };
  dc: DifficultyCheck;
  school: APIReference;
  classes: APIReference[];
  subclasses: APIReference[];
  url: string;
}

interface APIReference {
  index: string;
  name: string;
  url: string;
}

interface DifficultyCheck {
  dc_type: APIReference;
  dc_success: ("none" | "half" | "other")[];
}

const DnDSpells = () => {
  const [spellName, setSpellName] = useState("");
  const [spellSchool, setSpellSchool] = useState("");
  const [spellInfo, setSpellInfo] = useState<Spell | null>(null);
  const [spellLevel, setSpellLevel] = useState<string>("");
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSpellList = async () => {
    try {
      let requestUrl = "https://www.dnd5eapi.co/api/spells";

      if (spellLevel && spellSchool && spellSchool !== "none") {
        requestUrl += `?level=${spellLevel}&school=${spellSchool}`;
      } else if (spellSchool && spellSchool !== "none") {
        requestUrl += `?school=${spellSchool}`;
      } else if (spellLevel) {
        requestUrl += `?level=${spellLevel}`;
      }

      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch spell list");
      }
      const data = await response.json();
      setSpellList(data);
      setSpellInfo(null);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const levels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const schools = [
    "none",
    "abjuration",
    "conjuration",
    "divination",
    "enchantment",
    "evocation",
    "illusion",
    "necromancy",
  ];

  const showSpellTable = spellList && spellInfo === null;
  const showSpellInfo = spellInfo !== null;

  return (
    <Section title="D&D Spellbook" className="bg-zinc-900/50">
      <div className="flex flex-row">
        <SearchBar
          setSearch={setSpellName}
          onSearch={fetchSpellList}
          placeholder="enter spell name"
          filters={{ filters: levels, onFilter: setSpellLevel }}
          dropdown={{
            options: schools,
            placeholder: "select a school",
            setSelection: setSpellSchool,
          }}
        />
      </div>
      {error && <p>{error}</p>}
      {showSpellTable && (
        <SpellTable
          spellList={spellList.results.filter((res) =>
            res.name.toLowerCase().includes(spellName.toLowerCase())
          )}
          setSpellInfo={setSpellInfo}
        />
      )}
      {showSpellInfo && (
        <SpellInfo
          spell={spellInfo}
          clearSpell={() => {
            setSpellInfo(null);
          }}
        />
      )}
    </Section>
  );
};

interface SpellTableProps {
  spellList: SpellListResult[];
  setSpellInfo: (spell: Spell | null) => void;
}

const SpellTable = ({ spellList, setSpellInfo }: SpellTableProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg font-bold">loaded {spellList.length} spells</p>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {spellList.map((spell) => (
          <SpellCell key={spell.index} {...spell} setSpellInfo={setSpellInfo} />
        ))}
      </div>
    </div>
  );
};

interface SpellCellProps {
  index: string;
  name: string;
  level: number;
  url: string;
  setSpellInfo: (spell: Spell | null) => void;
}

const SpellCell = ({ index, name, level, setSpellInfo }: SpellCellProps) => {
  const fetchSpellInfo = async () => {
    try {
      const response = await fetch(
        `https://www.dnd5eapi.co/api/spells/${index.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Spell not found");
      }
      const data = await response.json();
      setSpellInfo(data);
    } catch (err: any) {
      setSpellInfo(null);
    }
  };

  return (
    <div
      className="bg-zinc-800 p-2 border flex flex-row justify-between"
      key={index}
    >
      <div>
        <h2 className="font-bold">{name.toLowerCase()}</h2>
        <p className="italic">level {level}</p>
      </div>
      <IconButton
        icon={faArrowRight}
        iconClassName="hover:text-cyan-800 text-lg"
        onClick={fetchSpellInfo}
      />
    </div>
  );
};

interface SpellInfoProps {
  spell: Spell;
  clearSpell: () => void;
}

const SpellInfo = ({ spell, clearSpell }: SpellInfoProps) => {
  return (
    <div className="bg-zinc-800 p-4 border rounded-xl">
      <IconButton
        icon={faArrowLeft}
        onClick={clearSpell}
        text="back"
        className="hover:text-cyan-600 hover:font-bold p-2"
      />
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex flex-col gap-4 md:w-1/3">
          <div>
            <h1 className="font-bold text-2xl">{spell.name.toLowerCase()}</h1>
            <p className="italic text-lg">
              {spell.school.name.toLowerCase()} level {spell.level}
            </p>
          </div>
          {spell.attack_type && spell.range && (
            <p>
              <span className="font-bold underline">attack type / range</span>{" "}
              {spell.attack_type.toLowerCase()} {spell.range.toLowerCase()}
            </p>
          )}
          {spell.damage && (
            <p>
              <span className="font-bold underline">damage</span>{" "}
              {spell.damage.damage_at_slot_level[spell.level]}{" "}
              {spell.damage.damage_type.name.toLowerCase()}
            </p>
          )}
          {spell.casting_time && (
            <p>
              <span className="font-bold underline">casting time</span>{" "}
              {spell.casting_time}
            </p>
          )}
          {spell.duration && (
            <p>
              <span className="font-bold underline">duration</span>{" "}
              {spell.duration}
            </p>
          )}
          {spell.components && (
            <div className="flex gap-2">
              <p>
                <span className="font-bold underline">components</span>{" "}
              </p>
              <Badges captions={spell.components} />
            </div>
          )}
          {spell.higher_level.length > 0 && (
            <div>
              <h2 className="font-bold underline">at higher levels</h2>
              <p>{spell.higher_level[0]}</p>
            </div>
          )}
        </div>
        <div className="md:w-2/3 space-y-2">
          {spell.desc && spell.desc.map((desc, index) => <p>{desc}</p>)}
        </div>
      </div>
    </div>
  );
};

export default DnDSpells;
