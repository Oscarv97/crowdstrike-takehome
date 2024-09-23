import "./App.css";
import { PageHeader } from "./heading/heading";
import { FilesPage } from "./pages/my-files-page";

function App() {
  return (
    <>
      <PageHeader />
      <h3 className="text-3xl font-bold underline">Oscar Vial Crowdstrike</h3>
      <div>
        <FilesPage />
      </div>
    </>
  );
}

export default App;
