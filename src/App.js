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
import Profile from "./pages/dashboard/Profile";
import useAuth from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";
// import PersistLogin from "./logic/PersistLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Regsiter />} />
      <Route element={<Dashboard />} >
        <Route path="/dashboard/profile" element={<Profile />}></Route>
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
