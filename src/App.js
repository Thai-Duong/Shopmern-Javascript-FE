import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRouteElement from "./useRouteElement";

function App() {
  const routerElement = useRouteElement();

  return (
    <>
      {routerElement}
      <ToastContainer />
    </>
  );
}

export default App;
