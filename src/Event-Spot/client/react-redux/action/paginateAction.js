// actions.js

import axios from '../../components/Api_Resources/axios';

export const eventPaginate = () => ({
  type: "EVENT_PAGINATE"
});

export const paginationSuccess = (data, totalPages, currentPage) => ({
  type: "PAGINATION_SUCCESS",
  payload: { data, totalPages, currentPage }
});

export const paginationError = (error) => ({
  type: "PAGINATION_ERROR",
  payload: error
});

export const pagination = (page) => {
  return async (dispatch) => {
    dispatch(eventPaginate());
    try {
      const response = await axios.get(`/api/paginate/event?page=${page}`);
      const { events, totalPages, currentPage } = response.data;
      dispatch(paginationSuccess(events, totalPages, currentPage));
    } catch (err) {
      console.error(err);
      dispatch(paginationError('Internal Server Error'));
    }
  };
};
