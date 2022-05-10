import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import userReducer from "./slices/user";

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
    whitelist: ["user"],
};

const productPersistConfig = {
    key: "product",
    storage,
    keyPrefix: "redux-",
    whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
    user: userReducer,
});

export { rootPersistConfig, rootReducer };