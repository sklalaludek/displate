import * as actions from "../actions/types.js";

const initialState = {
	displatesList: [],
	loading: false
};

const displatesReducers = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_DATA_START:
			return {
				...state,
				loading: true
			};

		case actions.FETCH_DATA_SUCCESS:
			return {
				...state,
				displatesList: [
					...action.displatesList
				],
				loading: false
			};

		case actions.ADD_ROW:
			return {
				...state,
				displatesList: [...state.displatesList, action.payload.actionData]
			};
		case actions.DELETE_ROW:
			return {
				...state,
				displatesList: state.displatesList
					.filter(displate => displate.id !== action.rowId)
			};


		default:
			return state;
	}
};

export default displatesReducers;