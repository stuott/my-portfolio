import classNames from "classnames";

interface TextInputProps {
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  padding?: string;
  label?: string;
}

const TextInput = (props: TextInputProps) => {
  const {
    placeholder,
    disabled,
    onChange,
    value,
    className,
    onKeyDown,
    padding,
    label,
  } = props;

  const barClasses = classNames(
    "flex-grow border-zinc-700",
    {
      "cursor-not-allowed bg-zinc-800 placeholder:text-zinc-600": disabled,
      "bg-zinc-900 border-2 text-white hover:bg-zinc-800 focus:bg-zinc-800":
        !disabled,
    },
    padding ?? "px-8 py-4",
    className
  );

  return (
    <div className="flex flex-col gap-1 w-full">
      {label}
      <input
        type="text"
        placeholder={placeholder}
        className={barClasses}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
        onKeyDown={(e) => {
          if (onKeyDown) {
            onKeyDown(e);
          }
        }}
        disabled={disabled}
        value={value}
      />
    </div>
  );
};

export default TextInput;
