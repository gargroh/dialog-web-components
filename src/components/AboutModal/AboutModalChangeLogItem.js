/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import {
  Text,
  LocalizationContextType,
  type ProviderContext,
} from '@dlghq/react-l10n';
import styles from './AboutModal.css';

type LocaleType = string;

type ChangeLogItem = {
  [LocaleType]: Array<string>,
};

export type AboutModalChangeLogItemProps = {
  date: string,
  version: string,
  changes: ChangeLogItem,
};

function AboutModalChangeLogItem(
  props: AboutModalChangeLogItemProps,
  context: ProviderContext,
) {
  const {
    l10n: { locale },
  } = context;
  const { date, version, changes } = props;

  let localizedChanges = [];
  const availableLocales = Object.keys(changes);

  if (availableLocales.length) {
    if (changes[locale]) {
      localizedChanges = changes[locale];
    } else {
      // any available language
      localizedChanges = changes[availableLocales[0]];
    }
  }

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
        {localizedChanges.length > 0 ? (
          localizedChanges.map((change) => (
            <li key={change.toString()}>{change}</li>
          ))
        ) : (
          <li>-</li>
        )}
      </ul>
    </div>
  );
}

AboutModalChangeLogItem.contextTypes = {
  l10n: LocalizationContextType,
};

export default AboutModalChangeLogItem;
