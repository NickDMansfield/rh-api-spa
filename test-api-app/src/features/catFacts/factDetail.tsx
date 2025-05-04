import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import walkingCat  from '../../images/walking-cat.gif'
import {
  getSelectedFact,
  selectFact
} from './factSlice';
import styles from './factDetail.module.css';

export function FactDetail() {
  const selectedFact = useAppSelector(getSelectedFact);
  const dispatch = useAppDispatch();


  function handleSelectFact(fact: string | null) {
    window.history.pushState({ selectedFact: fact }, '', '');
    dispatch(selectFact(fact));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center'}}>
      <div className={styles.centeredColumn}>
        <div>{selectedFact}</div>
        <div className={styles.learnMoreLink}> <a href={`http://google.com/search?q=${selectedFact?.replaceAll(' ', '%20')}`}
        target="_blank"
        rel="noopener noreferrer">
          Click here to learn more</a></div>
      </div>
      <div className={styles.row} style={{display: 'flex', justifyContent:'flex-end', width: '100%', cursor: 'pointer'}} onClick={() => handleSelectFact(null)}>{'<'}<img style={{ height: '10vh' }} src={walkingCat} /></div>
    </div>
  );
}
