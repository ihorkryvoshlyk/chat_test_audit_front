import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Authentication from "./pages/authentication/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "auth",
        element: <Authentication />
      }
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
