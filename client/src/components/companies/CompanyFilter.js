import React, { useContext, useRef, useEffect } from 'react';
import CompanyContext from '../../context/company/companyContext';

const CompanyFilter = () => {
  const companyContext = useContext(CompanyContext);
  const text = useRef('');

  const { filterCompanies, clearFilter, filtered } = companyContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterCompanies(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Companies...'
        onChange={onChange}
      />
    </form>
  );
};

export default CompanyFilter;