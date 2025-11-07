import React, { useEffect, useState } from "react";

const TitleUpdater = () => {
  const [title, setTitle] = useState("title");

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return (
    <div>
      <label htmlFor="title">Enter document title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => handleChange(e)}
        placeholder="Enter document title"
      />
    </div>
  );
};

export default TitleUpdater;
