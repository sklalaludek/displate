import { combineReducers } from "redux";

import displatesReducers from "./displatesReducers";

const rootReducer = combineReducers({
  displates: displatesReducers
});

export default rootReducer;