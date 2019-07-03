/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import styles from './AboutModal.css';

export type AboutModalChangeLogItemProps = {
  date: number,
  version: string,
  changes: Array<string>,
};

function AboutModalChangeLogItem(props: AboutModalChangeLogItemProps) {
  const { date, version, changes } = props;

  return (
    <div
      key={date.toString() + version.toString()}
      className={styles.changeLogItem}
    >
      <Text
        className={styles.changeLogVersion}
        id="AboutModal.changeLogVersion"
        values={{
          version,
          date,
        }}
      />
      <ul className={styles.changeLogChanges}>
        {changes && changes.length > 0 ? (
          changes.map((change) => <li key={change.toString()}>{change}</li>)
        ) : (
          <li>-</li>
        )}
      </ul>
    </div>
  );
}

export default AboutModalChangeLogItem;
