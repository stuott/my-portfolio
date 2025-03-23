import classNames from "classnames";
import { Driver } from "types/racing";

const DriverCard = ({ driver }: { driver: Driver }) => {
  const driverCardClasses = classNames(
    "flex p-2 w-full justify-between",
    "border bg-zinc-900"
  );

  return (
    <div
      className={driverCardClasses}
      key={driver.driver_number}
      style={{ borderColor: "#" + driver.team_colour }}
    >
      <p className="font-bold text-5xl">{driver.driver_number}</p>
      <div>
        <h2 className="font-bold">{driver.full_name}</h2>
        <p className="italic" style={{ color: "#" + driver.team_colour }}>
          {driver.team_name}
        </p>
      </div>
      <img src={driver.headshot_url} alt={driver.full_name} />
    </div>
  );
};

export default DriverCard;
