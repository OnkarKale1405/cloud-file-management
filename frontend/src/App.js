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
import RequireAuth from "./redux/auth/RequireAuth";
// import PersistLogin from "./logic/PersistLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Regsiter />} />
      {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth />}>
          <Route element={<Dashboard />} >
            <Route path="/dashboard/profile" element={<Profile />}></Route>
            <Route path="/dashboard/files" element={<Files />}></Route>
          </Route>
        </Route>
      {/* </Route> */}
    </>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
