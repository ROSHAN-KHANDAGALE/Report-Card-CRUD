import "./App.css";
import SignUp from "./modules/signup/SignUp";
// import ReportForm from "./components/ReportForm";
// import TableView from "./components/TableView";
// import ViewRecordModal from "./components/ViewRecordModal";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">Report Management</h1>
      <div className="Form-body">
        <SignUp />
      </div>
      {/* <div className="Form-body">
        <ReportForm />
      </div>
      <h1 className="App-header">Available Records</h1>
      <div className="Table-body">
        <TableView />
      </div>
      <div>
        <ViewRecordModal />
      </div> */}
    </div>
  );
}

export default App;
