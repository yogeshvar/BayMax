import React from "react";
import ReactDOM from "react-dom/client";
import {
    ChakraProvider
} from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./Pages/NotFound";
import reportWebVitals from "./reportWebVitals";
import ChatWidget from "./Container/Chat";
import Protector from "./Container/Protector";
import { ColorModeScript } from "@chakra-ui/react";
import "antd/dist/reset.css";
import theme from "./theme";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/chat",
        element: <ChatWidget />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/protector",
        element: <Protector />,
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
