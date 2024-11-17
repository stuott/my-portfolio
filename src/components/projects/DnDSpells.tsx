import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "components/common/IconButton";
import NumberInput from "components/common/NumberInput";
import SearchBar from "components/common/SearchBar";
import Section from "components/layout/Section";
import React, { useState } from "react";

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
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  attack_type: string;
  damage: {
    damage_type: APIPoint;
    damage_at_slot_level: {
      [key: string]: string;
    };
  };
  school: APIPoint;
  classes: APIPoint[];
  subclasses: APIPoint[];
  url: string;
}

interface APIPoint {
  index: string;
  name: string;
  url: string;
}

const DnDSpells = () => {
  const [spellName, setSpellName] = useState("");
  const [school, setSchool] = useState("");
  const [spellInfo, setSpellInfo] = useState<Spell | null>(null);
  const [spellLevel, setSpellLevel] = useState<string>("");
  const [spellList, setSpellList] = useState<SpellList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSpellList = async () => {
    try {
      let requestUrl = "https://www.dnd5eapi.co/api/spells";
      if (spellLevel !== "") {
        requestUrl += `?level=${spellLevel}`;
      }
      if (school !== "") {
        requestUrl += `&school=${school}`;
      }
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch spell list");
      }
      const data = await response.json();
      setSpellList(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchSpellInfo = async () => {
    try {
      const response = await fetch(
        `https://www.dnd5eapi.co/api/spells/${spellName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Spell not found");
      }
      const data = await response.json();
      setSpellInfo(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSpellInfo(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpellName(e.target.value);
  };

  const handleSearch = () => {
    if (spellName.trim() !== "") {
      fetchSpellList();
    }
  };

  const levels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <Section title="D&D Spellbook">
      <div className="flex flex-row">
        <SearchBar
          placeholder="Enter spell name"
          setSearch={setSpellName}
          filters={levels}
          setFilter={setSpellLevel}
        />
        <button onClick={fetchSpellList}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {spellList && (
        <div className="grid grid-cols-3 gap-4">
          {spellList.results.map((spell) => (
            <div
              className="bg-zinc-800 p-2 border flex flex-row justify-between"
              key={spell.index}
            >
              <div>
                <h2>{spell.name}</h2>
                <p>
                  <strong>Level:</strong> {spell.level}
                </p>
              </div>
              <IconButton
                icon={faArrowRight}
                iconClassName="hover:text-cyan-800 text-lg"
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};

export default DnDSpells;
