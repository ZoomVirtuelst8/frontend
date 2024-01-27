import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { dark } from '@clerk/themes';

const clerk_pub_key = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerk_pub_key) {
  throw new Error("Missing Publishable Key")
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerk_pub_key}
  appearance={{
    baseTheme: [dark]
  }} 
  >
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
    </Provider>
  </ClerkProvider>
);
