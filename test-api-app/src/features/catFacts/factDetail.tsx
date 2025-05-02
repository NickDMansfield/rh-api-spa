import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getSelectedFact,
} from './factSlice';
import styles from './factDetail.module.css';

export function FactDetail() {
  const fact = useAppSelector(getSelectedFact);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        
      </div>
    </div>
  );
}
