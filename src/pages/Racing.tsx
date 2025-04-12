import { Dropdown } from "@components/controls";
import Selector from "@components/controls/Selector";
import { Section } from "@components/layout";
import DriverCard from "@components/racing/DriverCard";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { Driver, Lap, Position, Session } from "types/racing";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Racing = () => {
  const sessionsAPI = useMemo(() => {
    const url = new URL("https://api.openf1.org/v1/sessions");
    url.searchParams.append("year", "2025");
    url.searchParams.append("session_type", "Race");
    url.searchParams.append("session_name", "Race");
    return url.href;
  }, []);

  // State to store the fetched data
  const [selectedSession, setSelectedSession] = useState(-1);
  const [sessionsData, setSessionsData] = useState<Session[] | null>(null);

  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(sessionsAPI);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = (await response.json()) as Session[];
        setSessionsData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionsAPI]);

  return (
    <Section title="F1 Racing" className="pt-6">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {sessionsData && (
        <Dropdown
          label="Select a session"
          placeholder="session"
          options={sessionsData.map((session, index) => ({
            label: session.country_name,
            value: index.toString(),
          }))}
          setSelection={(value: string) => {
            setSelectedSession(parseInt(value));
          }}
        />
      )}
      {sessionsData && <DriverTable session={sessionsData[selectedSession]} />}
    </Section>
  );
};

const DriverTable = ({ session }: { session: Session }) => {
  if (!session) return null;

  // State to store the fetched data
  const [driverData, setDriverData] = useState<Driver[] | null>(null);
  const [firstDriverNumber, setFirstDriverNumber] = useState<number>(1);
  const [secondDriverNumber, setSecondDriverNumber] = useState<number>(1);
  const [firstDriverLaps, setFirstDriverLaps] = useState<Lap[] | null>(null);
  const [secondDriverLaps, setSecondDriverLaps] = useState<Lap[] | null>(null);
  const [firstDriver, setFirstDriver] = useState<Driver | null>(null);
  const [secondDriver, setSecondDriver] = useState<Driver | null>(null);
  const [firstPositions, setFirstPositions] = useState<Position[] | null>(null);
  const [secondPositions, setSecondPositions] = useState<Position[] | null>(
    null
  );

  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const driverAPI = useMemo(() => {
    const url = new URL("https://api.openf1.org/v1/drivers");
    url.searchParams.append("session_key", session.session_key.toString());
    return url.href;
  }, [session]);

  const firstLapAPI = useMemo(() => {
    const url = new URL("https://api.openf1.org/v1/laps");
    url.searchParams.append("driver_number", firstDriverNumber.toString());
    url.searchParams.append("session_key", session.session_key.toString());
    return url.href;
  }, [firstDriverNumber, session]);

  const secondLapAPI = useMemo(() => {
    const url = new URL("https://api.openf1.org/v1/laps");
    url.searchParams.append("driver_number", secondDriverNumber.toString());
    url.searchParams.append("session_key", session.session_key.toString());
    return url.href;
  }, [secondDriverNumber, session]);

  const firstPositionAPI = useMemo(() => {
    const url = new URL("https://api.openf1.org/v1/position");
    url.searchParams.append("driver_number", firstDriverNumber.toString());
    url.searchParams.append("session_key", session.session_key.toString());
    return url.href;
  }, [firstDriverNumber, session]);

  const secondPositionAPI = useMemo(() => {
    const url = new URL("https://api.openf1.org/v1/position");
    url.searchParams.append("driver_number", secondDriverNumber.toString());
    url.searchParams.append("session_key", session.session_key.toString());
    return url.href;
  }, [secondDriverNumber, session]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(driverAPI);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = (await response.json()) as Driver[];
        setDriverData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [driverAPI]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(firstLapAPI);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = (await response.json()) as Lap[];
        setFirstDriverLaps(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setFirstDriver(
      driverData?.filter(
        (driver) => driver.driver_number == firstDriverNumber
      )[0] ?? null
    );
  }, [firstLapAPI]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(secondLapAPI);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = (await response.json()) as Lap[];
        setSecondDriverLaps(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setSecondDriver(
      driverData?.filter(
        (driver) => driver.driver_number == secondDriverNumber
      )[0] ?? null
    );
  }, [secondLapAPI]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(firstPositionAPI);
        console.log(firstPositionAPI);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = (await response.json()) as Position[];
        setFirstPositions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [firstPositionAPI]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(secondPositionAPI);
        console.log(secondPositionAPI);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = (await response.json()) as Position[];
        setSecondPositions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [secondPositionAPI]);

  const lapTimesData = useMemo(() => {
    if (!firstDriverLaps || !secondDriverLaps) return null;

    return {
      labels: firstDriverLaps.map((_, index) => `${index + 1}`), // X-axis labels
      datasets: [
        {
          label: firstDriver?.name_acronym,
          data: firstDriverLaps.map((lap) => lap.lap_duration), // Y-axis data
          borderColor: "#" + firstDriver?.team_colour,
          backgroundColor: "#" + firstDriver?.team_colour,
          tension: 0.4, // Smooth curve
        },
        {
          label: secondDriver?.name_acronym,
          data: secondDriverLaps.map((lap) => lap.lap_duration), // Y-axis data
          borderColor: "#" + secondDriver?.team_colour,
          backgroundColor: "#" + secondDriver?.team_colour,
          tension: 0.4, // Smooth curve
        },
      ],
    };
  }, [firstDriverLaps, secondDriverLaps, firstDriver, secondDriver]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Lap Duration (seconds)",
        },
        grid: {
          color: "#333333",
        },
      },
      x: {
        title: {
          display: true,
          text: "Lap Number",
        },
        grid: {
          color: "#333333",
        },
      },
    },
  };

  const driverTableClasses = classNames("grid md:grid-cols-2 gap-4", "w-full");

  const positionTableClasses = classNames(
    "grid md:grid-cols-2 gap-4",
    "w-full text-center "
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="space-y-6">
        {driverData && (
          <div className={driverTableClasses}>
            <Selector
              options={driverData?.map((driver) => ({
                label:
                  "#" + driver.driver_number + " - " + driver.broadcast_name,
                value: driver.driver_number.toString(),
                content: (
                  <DriverCard driver={driver} key={driver.driver_number} />
                ),
              }))}
              onChange={(value) => setFirstDriverNumber(parseInt(value))}
            />
            <Selector
              options={driverData?.map((driver) => ({
                label:
                  "#" + driver.driver_number + " - " + driver.broadcast_name,
                value: driver.driver_number.toString(),
                content: (
                  <DriverCard driver={driver} key={driver.driver_number} />
                ),
              }))}
              onChange={(value) => setSecondDriverNumber(parseInt(value))}
            />
          </div>
        )}
        {firstPositions && secondPositions && (
          <div className={positionTableClasses}>
            <p>
              {firstPositions[0].position} -{">"}{" "}
              {firstPositions[firstPositions.length - 1].position}
            </p>
            <p>
              {secondPositions[0].position} -{">"}{" "}
              {secondPositions[secondPositions.length - 1].position}
            </p>
          </div>
        )}
        <div className="bg-zinc-900 p-4 border-2 border-zinc-700">
          {lapTimesData && <Line data={lapTimesData} options={options} />}
        </div>
      </div>
    </div>
  );
};

export const pageInfo = {
  path: "/f1-racing",
  name: "F1 Dashboard",
  Component: Racing,
  showInNavbar: false,
};
