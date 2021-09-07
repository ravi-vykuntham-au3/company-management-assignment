import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CompanyContext from '../../context/company/companyContext';

const CompanyItem = ({ company }) => {
  const companyContext = useContext(CompanyContext);
  const { deleteCompany, setCurrent, clearCurrent } = companyContext;

  const { _id, name, email, website, industry } = company;

  const onDelete = () => {
    deleteCompany(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className= "badge badge-primary"
        >
          {industry.charAt(0).toUpperCase() + industry.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope' /> {email}
          </li>
        )}
        {website && (
          <li>
            <i className='fas fa-globe' /> {website}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(company)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

CompanyItem.propTypes = {
  company: PropTypes.object.isRequired
};

export default CompanyItem;