import RegisterSimple from "../Components/Pages/Auth/RegisterSimple";

import ErrorPage1 from "../Components/Pages/ErrorPages/ErrorPage400";
import ErrorPage2 from "../Components/Pages/ErrorPages/ErrorPage401";
import ErrorPage3 from "../Components/Pages/ErrorPages/ErrorPage403";
import ErrorPage4 from "../Components/Pages/ErrorPages/ErrorPage404";
import Logins from "../Auth/Signin";
export const authRoutes = [
  { path: `${process.env.PUBLIC_URL}/login`, Component: <Logins /> },
  { path: `${process.env.PUBLIC_URL}/register`, Component: <RegisterSimple /> },

  //Error
  {
    path: `${process.env.PUBLIC_URL}/pages/errors/error400/:layout`,
    Component: <ErrorPage1 />,
  },
  {
    path: `${process.env.PUBLIC_URL}/pages/errors/error401/:layout`,
    Component: <ErrorPage2 />,
  },
  {
    path: `${process.env.PUBLIC_URL}/pages/errors/error403/:layout`,
    Component: <ErrorPage3 />,
  },
  {
    path: `${process.env.PUBLIC_URL}/pages/errors/error404/:layout`,
    Component: <ErrorPage4 />,
  },
];
