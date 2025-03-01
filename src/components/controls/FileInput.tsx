import { useState } from "react";

const FileInput = ({ onChange, ...props }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    onChange(file);
  };

  return <input type="file" onChange={handleChange} {...props} />;
};

export default FileInput;
