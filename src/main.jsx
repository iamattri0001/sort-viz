import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BlocksContextProvider } from "./contexts/BlocksContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlocksContextProvider>
      <App />
      <Toaster />
    </BlocksContextProvider>
  </StrictMode>
);
