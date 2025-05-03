import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectFact } from './factSlice';
import styles from './factList.module.css';
import { FactDetail } from './factDetail';

export function FactsList() {
  const dispatch = useAppDispatch();

  const facts = useAppSelector((state) => state.fact.factList);
  const selectedFact = useAppSelector((state) => state.fact.selectedFact);
  const isLoading = useAppSelector((state) => state.fact.status);
  const errors = useAppSelector((state) => state.fact.errors);

  function handleSelectFact(fact: string) {
    window.history.pushState({ selectedFact: fact }, '', '');
    dispatch(selectFact(fact));
  }

  if (isLoading === 'loading') return <div>{isLoading}</div>;
  if (errors.length) return <div>Errors: {errors.join(', ')}</div>;

  return (
    <div className={styles.factList}>
      {facts.map((fact, index) => (
        <div className={styles.listItem} onClick={() => handleSelectFact(fact)} key={index}>
          {fact.split(' ').slice(0, 2).join(' ')}...
        </div>
      ))}
    </div>
  );
}
