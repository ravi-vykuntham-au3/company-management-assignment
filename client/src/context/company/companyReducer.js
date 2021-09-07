import {
    GET_COMPANIES,
    ADD_COMPANY,
    DELETE_COMPANY,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_COMPANY,
    FILTER_COMPANIES,
    CLEAR_FILTER,
    COMPANY_ERROR,
    CLEAR_COMPANIES
  } from '../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GET_COMPANIES:
        return {
          ...state,
          companies: action.payload,
          loading: false
        };
      case ADD_COMPANY:
        return {
          ...state,
          companies: [action.payload, ...state.companies],
          loading: false
        };
      case UPDATE_COMPANY:
        return {
          ...state,
          companies: state.companies.map(company =>
            company._id === action.payload._id ? action.payload : company
          ),
          loading: false
        };
      case DELETE_COMPANY:
        return {
          ...state,
          companies: state.companies.filter(
            company => company._id !== action.payload
          ),
          loading: false
        };
      case CLEAR_COMPANIES:
        return {
          ...state,
          companies: null,
          filtered: null,
          error: null,
          current: null
        };
      case SET_CURRENT:
        return {
          ...state,
          current: action.payload
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          current: null
        };
      case FILTER_COMPANIES:
        return {
          ...state,
          filtered: state.companies.filter(company => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return company.name.match(regex) || company.email.match(regex);
          })
        };
      case CLEAR_FILTER:
        return {
          ...state,
          filtered: null
        };
      case COMPANY_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };