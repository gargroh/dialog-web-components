/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { AuthType } from './types';
import React from 'react';
import { Text } from '@dlghq/react-l10n';
import { RadioGroup, Radio } from '@dlghq/dialog-ui';

import styles from './AuthorizationNext.css';

export type AuthorizationTypeSelectorProps = {
  type: AuthType,
  allowed: Array<AuthType>,
  disabled: boolean,
  onChange: (type: string) => mixed,
};

export function AuthorizationTypeSelector(
  props: AuthorizationTypeSelectorProps,
) {
  if (props.allowed.length < 2) {
    return null;
  }

  return (
    <RadioGroup
      name="type"
      value={props.type}
      disabled={props.disabled}
      onChange={props.onChange}
      className={styles.typeSelector}
      intent="none"
    >
      {props.allowed.map((type) => {
        return (
          <Radio value={type} key={type} className={styles.type}>
            <Text id={`Authorization.type.${type}`} />
          </Radio>
        );
      })}
    </RadioGroup>
  );
}
