import "./App.css";
import 'react-toastify/dist/ReactToastify.min.css';
import { FilesPage } from "./pages/my-files-page";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <h3 className="text-2xl font-semibold font-mono">Oscar Vial CrowdStrike</h3>
      <div>
        <FilesPage />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
