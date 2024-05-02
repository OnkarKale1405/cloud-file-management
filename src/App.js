import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Regsiter from "./pages/Regsiter";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Landing />} />
      <Route index path="/login" element={<Login />} />
      <Route index path="/register" element={<Regsiter />} />
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
