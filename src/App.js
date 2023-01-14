import { useState } from "react";
import "./App.css";
import AddItem from "./comp/addItem";

import Table from "./comp/table";

function App() {
  const [id, setId] = useState("");

  const idHandler = (id) => {
    console.log(id);
    setId(id);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-grey">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">UTHANDIPALAYAM AUCTION</span>
        </div>
      </nav>
      <br />
      <AddItem id={id} setId={setId} />
      <br />
      <Table getId={idHandler} />
      <br />
    </>
  );
}

export default App;
