import { combineReducers } from "redux";

import batch_information from '../components/production_administration/components/batch_information/reducers/batch_information_reducer'
const rootReducer = combineReducers({
    batch_information
});

export default rootReducer;
