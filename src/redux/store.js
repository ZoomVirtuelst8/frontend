import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducer";
import thunkMiddleware from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "ZoomVirtuel",
  storage,
  whiteList: [
    "spg",
    "coad", //corte adult
    "copad", //corte parcial adult
    "coam", //corte amateur
    "cobo", //corte bonga
    "coca", //corte cam4
    "coch", //corte chaturbate
    "codi", //corte dirty
    "coil", //corte islive
    "cose", //corte sender
    "cosk", //corte skype
    "cost", //corte stripchat
    "covx", //corte vx
    "coxl", //corte xlove
    "coxln",
    "user",
    "darkMode",
  ], //corte xlove
  // agregar una whiteList si queremos que se guarde solo una parte de nuestros estados globales
  blacklist: ["init", "Error"],
};
const persitedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persitedReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);
const persistor = persistStore(store);

export default store;
export { persistor };
