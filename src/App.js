import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Login />} />
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
