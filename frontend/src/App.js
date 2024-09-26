import "./App.css";
import Route from "../src/materials/routes/Routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <RouterProvider router={Route} />
    </div>
  );
}

export default App;
