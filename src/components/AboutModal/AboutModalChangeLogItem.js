/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import styles from './AboutModal.css';

export type ChangeLogItem = {
  headline: string,
  items: Array<string>,
};

function AboutModalChangeLogItem(props: ChangeLogItem) {
  return (
    <div className={styles.changeLogChangesItem}>
      <span className={styles.changeLogHeadline}>{props.headline}</span>
      <ul className={styles.changeLogChangesItems}>
        {props.items && props.items.length > 0
          ? props.items.map((item) => <li key={item}>{item}</li>)
          : '-'}
      </ul>
    </div>
  );
}

export default AboutModalChangeLogItem;
