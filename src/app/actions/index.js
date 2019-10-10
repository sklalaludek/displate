import axios from "axios"
import * as actions from "./types.js";

const dataUrl = "https://sapi.displate.com//categories/artworks?page=1&size=60";

export const fetchData = () => dispatch => {
  dispatch({ type: actions.FETCH_DATA_START })

  return axios.get(dataUrl)
    .then(res => {
      const displatesList = res.data.data;

      return dispatch({
        type: actions.FETCH_DATA_SUCCESS,
        displatesList
      })
    })
    .catch(err => dispatch({ type: actions.FETCH_DATA_FAILURE }))
};

export const addRow = actionData => ({
  type: actions.ADD_ROW,
  payload: {
    actionData
  }
});

export const deleteRow = rowId => ({
  type: actions.DELETE_ROW,
  rowId
});