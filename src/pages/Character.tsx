const Character = () => {
  return (
    <div>
      <h1>Character</h1>
      <p>description</p>
    </div>
  );
};

export const pageInfo = {
  path: "/character",
  name: "Character Generator",
  Component: Character,
  showInNavbar: false,
  background: "bg-intersect",
};
