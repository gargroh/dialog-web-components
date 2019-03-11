/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { AuthTypes } from './types';
import React from 'react';
import { Text } from '@dlghq/react-l10n';
import { Tabs, Tab } from '@dlghq/dialog-ui';

// import styles from './AuthorizationNext.css';

export type AuthorizationTypeSelectorProps = {
  type: AuthTypes,
  allowed: Array<AuthTypes>,
  onChange: (type: string) => mixed,
};

export function AuthorizationTypeSelector({
  allowed,
  type,
  onChange,
}: AuthorizationTypeSelectorProps) {
  if (allowed.length < 2) {
    return null;
  }

  return (
    <Tabs current={type} onChange={onChange} intent="primary">
      {allowed.map((authType) => (
        <Tab value={authType} key={authType}>
          <Text id={`AuthorizationNext.type.${authType}`} />
        </Tab>
      ))}
    </Tabs>
  );
}
