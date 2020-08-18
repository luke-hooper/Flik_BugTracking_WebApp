import axios from "axios";

import {
  GET_TICKETS,
  TICKET_ERROR,
  CLEAR_TICKETS,
  CLEAR_TICKET,
  GET_TICKET
} from "./types";

//Get current users profile

export const getMyTickets = () => async dispatch => {
  dispatch({ type: CLEAR_TICKETS });
  try {
    const res = await axios.get("/api/tickets");

    dispatch({
      type: GET_TICKETS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export const getATicket = ticketId => async dispatch => {
  dispatch({ type: CLEAR_TICKET });
  try {
    const res = await axios.get(`/api/tickets/${ticketId}`);

    dispatch({
      type: GET_TICKET,
      payload: res.data
    });
  } catch (err) {
    console.log("err response", err);
    dispatch({
      type: TICKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};