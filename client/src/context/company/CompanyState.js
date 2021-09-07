import React, { useReducer } from 'react';
import axios from 'axios';
import CompanyContext from './companyContext';
import companyReducer from './companyReducer';
import {
  GET_COMPANIES,
  ADD_COMPANY,
  DELETE_COMPANY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COMPANY,
  FILTER_COMPANIES,
  CLEAR_COMPANIES,
  CLEAR_FILTER,
  COMPANY_ERROR
} from '../types';

const CompanyState = props => {
  const initialState = {
    companies: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(companyReducer, initialState);

  // Get Companies
  const getCompanies = async () => {
    try {
      const res = await axios.get('/api/companies');

      dispatch({
        type: GET_COMPANIES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMPANY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Company
  const addCompany = async company => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/companies', company, config);

      dispatch({
        type: ADD_COMPANY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMPANY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Company
  const deleteCompany = async id => {
    try {
      await axios.delete(`/api/companies/${id}`);

      dispatch({
        type: DELETE_COMPANY,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: COMPANY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Company
  const updateCompany = async company => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/companies/${company._id}`,
        company,
        config
      );

      dispatch({
        type: UPDATE_COMPANY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMPANY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Companies
  const clearCompanies = () => {
    dispatch({ type: CLEAR_COMPANIES });
  };

  // Set Current Company
  const setCurrent = company => {
    dispatch({ type: SET_CURRENT, payload: company });
  };

  // Clear Current Company
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Companies
  const filterCompanies = text => {
    dispatch({ type: FILTER_COMPANIES, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <CompanyContext.Provider
      value={{
        companies: state.companies,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addCompany,
        deleteCompany,
        setCurrent,
        clearCurrent,
        updateCompany,
        filterCompanies,
        clearFilter,
        getCompanies,
        clearCompanies
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};

export default CompanyState;