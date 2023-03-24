import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeProvider from "@component/ThemeProvider";
import customTheme from "@component/stylesheet/customTheme";
import { store } from "@redux/store";
import Authentication from "./pages/authentication/Authentication";
import ChatBoard from "./pages/ChatBoard";

import "@component/stylesheet/style.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatBoard />
  },
  {
    path: "/auth",
    element: <Authentication />
  }
]);

const App = () => (
  <ThemeProvider theme={customTheme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);

export default App;
