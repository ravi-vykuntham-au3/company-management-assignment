import React, { useState, useContext, useEffect } from 'react';
import CompanyContext from "../../context/company/companyContext";
const CompanyForm = () => {
  const companyContext = useContext(CompanyContext);

  const { addCompany, updateCompany, clearCurrent, current } = companyContext;

  useEffect(() => {
    if (current !== null) {
      setCompany(current);
    } else {
      setCompany({
        name: '',
        email: '',
        website: '',
        industry: ''
      });
    }
  }, [companyContext, current]);

  const [company, setCompany] = useState({
    name: '',
    email: '',
    website: '',
    industry: ''
  });

  const { name, email, website, industry } = company;

  const onChange = e =>
    setCompany({ ...company, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addCompany(company);
    } else {
      updateCompany(company);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Company' : 'Add Company'}
      </h2>
      <input
        type='text'
        placeholder='Company Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Website'
        name='website'
        value={website}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Industry'
        name='industry'
        value={industry}
        onChange={onChange}
      />
      
      <div>
        <input
          type='submit'
          value={current ? 'Update Company' : 'Add Company'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default CompanyForm;