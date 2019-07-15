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
import AboutModalChangeLogItem, {
  type ChangeLogItem,
} from './AboutModalChangeLogItem';
import styles from './AboutModal.css';

type LocaleType = string;

type ChangeLogItems = {
  [LocaleType]: Array<ChangeLogItem>,
};

export type AboutModalChangeLogItemProps = {
  date: string,
  version: string,
  changes: ChangeLogItems,
};

function AboutModalChangeLogItems(
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
    <div key={`${date}_${version}`} className={styles.changeLogItem}>
      <Text
        className={styles.changeLogVersion}
        id="AboutModal.changeLogVersion"
        values={{
          version,
          date,
        }}
      />
      {localizedChanges.length > 0
        ? localizedChanges.map((change) => (
            <AboutModalChangeLogItem
              {...change}
              key={`${version}_${change.headline}`}
            />
          ))
        : '-'}
    </div>
  );
}

AboutModalChangeLogItems.contextTypes = {
  l10n: LocalizationContextType,
};

export default AboutModalChangeLogItems;
