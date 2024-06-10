import "./App.css";
import axios from "axios";

function App() {
  const fetchKotlin = async (): Promise<void> => {
    const data = await axios("/api/notes");
    console.log(data.data[0].createdAt);
    console.log(new Date(data.data[0].createdAt));
  };

  return (
    <>
      <h1>Spring Note</h1>
      <button onClick={fetchKotlin}>FromKotlin</button>
    </>
  );
}

export default App;
