import { RouterProvider } from "react-router-dom";
import router from "./routers.jsx";
// import { store } from "./app/store.js";
// import { Provider } from "react-redux";

function App() {
  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
