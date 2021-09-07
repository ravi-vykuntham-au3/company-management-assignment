import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CompanyItem from './CompanyItem';
import Spinner from '../layout/Spinner';
import CompanyContext from '../../context/company/companyContext';

const Companies = () => {
  const companyContext = useContext(CompanyContext);

  const { companies, filtered, getCompanies, loading } = companyContext;

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line
  }, []);

  if (companies !== null && companies.length === 0 && !loading) {
    return <h4>Please add a company</h4>;
  }

  return (
    <Fragment>
      {companies !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(company => (
                <CSSTransition
                  key={company._id}
                  timeout={500}
                  classNames='item'
                >
                  <CompanyItem company={company} />
                </CSSTransition>
              ))
            : companies.map(company => (
                <CSSTransition
                  key={company._id}
                  timeout={500}
                  classNames='item'
                >
                  <CompanyItem company={company} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Companies;