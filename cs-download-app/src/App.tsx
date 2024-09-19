import "./App.css";
import { FilesTable } from "./files-table/files-table";
import { PageHeader } from "./heading/heading";

function App() {
  return (
    <>
      <PageHeader />
      <h1>Vite + React</h1>
      <div>
        <FilesTable />
      </div>
    </>
  );
}

export default App;
