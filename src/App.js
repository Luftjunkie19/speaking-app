import "./index.css";

import AddForm from "./components/AddForm";
import NavigationBar from "./components/NavigationBar";
import TextInputManagment from "./components/TextInputManagment";
import TilesHolder from "./components/TilesHolder";

function App() {
  return (
    <div>
      <NavigationBar />

      <div className="flex items-center justify-around flex-col">
        <div className="flex flex-col justify-center items-center my-2">
          <p>WELCOME TO</p>
          <p className="text-6xl font-bold mb-6">RIDE&SPEAK</p>
        </div>

        <TextInputManagment />

        <TilesHolder />
      </div>

      <AddForm />
    </div>
  );
}

export default App;
