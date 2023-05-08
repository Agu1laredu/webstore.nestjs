/* eslint-disable jsx-a11y/alt-text */
import Headers from "../../Components/Headers/index";
import Folletos from "../../assets/folletos.jpg";
function App() {
  return (
    <div className="App">
      <Headers />
      <img src={Folletos} style={{ margin: "1% 5%" }} />
    </div>
  );
}

export default App;
