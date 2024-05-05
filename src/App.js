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
import Dashboard from "./pages/dashboard/Dashboard"
import Files from "./pages/dashboard/Files";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Regsiter />} />
      <Route element={<Dashboard />} >
        <Route path="/dashboard/files" element={<Files />}></Route>
      </Route>
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
