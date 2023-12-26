import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ApplicationForm from './pages/ApplicationForm';
import ApplicationSuccess from './pages/ApplicationSuccess';
import AdminLogin from './pages/AdminLogin';
import AdminApplicationList from './pages/AdminApplicationList';
import ApplicationLayout from './components/ApplicationLayout';
import ApplicationDetails from './pages/ApplicationDetails';
import QueryApplication from './pages/QueryApplication';
import UserApplicationDetails from './pages/UserApplicationDetails';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ApplicationForm />
    },
    {
      path: "/basvuru-basarili",
      element: <ApplicationSuccess />
    },
    {
      path: "/basvuru-sorgula",
      element: <QueryApplication />
    },
    {
      path: "/basvuru/:basvuruNo",
      element: <UserApplicationDetails />
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/admin/basvuru-listesi",
      element: <ApplicationLayout><AdminApplicationList/></ApplicationLayout>
    },
    {
      path: "/admin/basvuru/:basvuruNo",
      element: <ApplicationLayout><ApplicationDetails/></ApplicationLayout>
    },
  ]);

  return (
    <>
     <RouterProvider  router={router} />
    </>
  )
}

export default App
