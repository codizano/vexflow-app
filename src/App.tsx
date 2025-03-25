import React from "react";
import PianoSheetMusic from "./component/SheetMusic";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Partitura de Piano</h1>
      <PianoSheetMusic />
    </div>
  );
};

export default App;
