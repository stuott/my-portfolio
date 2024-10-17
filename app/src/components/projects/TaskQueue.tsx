import { faAdd, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface task {
  title: string;
  priority: boolean;
  description?: string;
  due?: Date;
}

export default function TaskQueue() {
  const [tasks, setTasks] = useState((): task[] => []);

  return (
    <div className="text-white">
      <TaskEntry tasks={tasks} setTasks={setTasks} />
      <div className="grid gap-3 pt-3 overflow-y-auto max-h-80">
        {tasks.map((todo) => (
          <TaskCard task={todo} />
        ))}
      </div>
    </div>
  );
}

interface taskEntryProps {
  tasks: task[];
  setTasks: (value: task[]) => void;
}

function TaskEntry(props: taskEntryProps) {
  const { tasks, setTasks } = props;

  const [title, setTitle] = useState<string>();
  const [priority, setPriority] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const entryField = "w-full p-2 bg-zinc-600";

  return (
    <div className="grid gap-3 bg-neutral-800 p-4">
      <div className="flex w-full gap-3">
        <div className="flex-col w-full">
          <label className="text-sm">Title</label>
          <input
            className={entryField}
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="flex-col w-full">
          <label className="text-sm">Due</label>
          <input
            className={entryField}
            type="date"
            onChange={(event) => {
              const dateString = event.target.value + " 00:00:00";
              setDate(new Date(dateString));
            }}
          />
        </div>
        <div className="flex-col">
          <label className="text-sm">Priority</label>
          <input
            className="w-full"
            type="checkbox"
            onChange={(event) => {
              setPriority(event.target.checked);
            }}
          />
        </div>
      </div>
      <label className="text-sm">Description</label>
      <textarea
        className={entryField}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button
        className="p-3 rounded-lg bg-cyan-600 active:bg-cyan-400"
        onClick={() => {
          if (!title) {
            return;
          }

          const newTasks = [
            ...tasks,
            {
              title: title,
              priority: priority,
              description: description,
              due: date,
            },
          ];

          setTasks(
            newTasks.sort((first, second) => {
              if (first.priority && !second.priority) return -1;
              if (!first.priority && second.priority) return 1;

              if (!first.due) {
                return second.due ? 1 : 0;
              }
              if (!second.due) {
                return -1;
              }

              if (first.due < second.due) {
                return -1;
              } else if (second.due < first.due) {
                return 1;
              } else {
                return 0;
              }
            })
          );
        }}
      >
        <FontAwesomeIcon icon={faAdd} />
      </button>
    </div>
  );
}

function TaskCard(props: { task: task }) {
  const { task } = props;

  return (
    <div
      className={
        "flex items-center p-3 gap-3 rounded-lg" +
        (task.priority ? " bg-red-900" : " bg-neutral-800")
      }
    >
      <div className="flex-col w-full">
        <p className="underline text-xl font-bold">{task.title}</p>
        <p>{task.description}</p>
      </div>
      {task.due ? (
        <div className="flex-col">
          <p className="text-sm font-mono">{task.due?.toDateString()}</p>
        </div>
      ) : (
        <></>
      )}
      {task.priority ? (
        <div className="flex-col w-1/12 items-center text-center">
          <p className="text-red-500">
            <FontAwesomeIcon icon={faExclamation} />
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
