import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getCatFacts } from './factSlice';
import styles from './factList.module.css';

export function FactsList() {
  const dispatch = useAppDispatch();

  const facts = useAppSelector((state) => state.fact.factList);
  const isLoading = useAppSelector((state) => state.fact.status);
  const errors = useAppSelector((state) => state.fact.errors);

  useEffect(() => {
    dispatch(getCatFacts());
  }, [dispatch]);

  if (isLoading === 'loading') return <div>{isLoading}</div>;
  if (errors.length) return <div>Errors: {errors.join(',')}</div>;
  
  return (
    <div className={styles.factList}>
      {facts.map((fact, index) => (
        <div key={index}>
          {fact}
        </div>
      ))}
    </div>
  );
}
