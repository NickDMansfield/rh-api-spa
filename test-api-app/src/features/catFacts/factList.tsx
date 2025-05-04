import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectFact, hideFact, getHiddenFacts } from './factSlice';
import styles from './factList.module.css';
import { FactDetail } from './factDetail';

export function FactsList() {
  const dispatch = useAppDispatch();

  const facts = useAppSelector((state) => state.fact.factList);
  const hiddenFacts = useAppSelector(getHiddenFacts);
  const selectedFact = useAppSelector((state) => state.fact.selectedFact);
  const isLoading = useAppSelector((state) => state.fact.status);
  const errors = useAppSelector((state) => state.fact.errors);

  function handleSelectFact(fact: string) {
    window.history.pushState({ selectedFact: fact }, '', '');
    dispatch(selectFact(fact));
  }

  if (isLoading === 'loading') return <div>{isLoading}</div>;
  if (errors.length) return <div>Errors: {errors.join(', ')}</div>;

  const factsToShow = facts.filter(f => hiddenFacts.indexOf(f) < 0);
  return (
    <div className={styles.factList}>
      {factsToShow.map((fact, index) => (
        <div className={styles.listItem} key={index}>
          <div className={styles.fact} onClick={() => handleSelectFact(fact)}>{fact.split(' ').slice(0, 2).join(' ')}...</div>
          <div onClick={() => dispatch(hideFact(fact))} className={styles.hideBtn}>Hide</div>
        </div>
      ))}
    </div>
  );
}
