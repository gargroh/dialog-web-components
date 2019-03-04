/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { AuthError } from '@dlghq/dialog-types';
import React from 'react';
import { L10n, Text } from '@dlghq/react-l10n';
import { Input } from '@dlghq/dialog-ui';

import type { EmailValue } from './types';
import { LOGIN_SENT, CODE_REQUESTED, CODE_SENT } from './constants';
import styles from './AuthorizationNext.css';

export type AuthorizationByEmailProps = {
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  value: EmailValue,
  errors: ?{ [field: string]: AuthError },
  autoFocus?: boolean,
  onRetry: () => mixed,
  onChange: (value: EmailValue) => mixed,
};

export function AuthorizationByEmail(props: AuthorizationByEmailProps) {
  const {
    step,
    value: { credentials },
    errors,
  } = props;

  function handleChange(
    value: string,
    { target: { name } }: SyntheticInputEvent<HTMLInputElement>,
  ): void {
    props.onChange({
      type: 'email',
      credentials: {
        ...credentials,
        [name]: value,
      },
    });
  }

  function getInputState(name: string): ?{ hint: string, intent: 'danger' } {
    if (errors && errors[name]) {
      return {
        hint: errors[name].message,
        intent: 'danger',
      };
    }

    return null;
  }

  return (
    <L10n>
      {({ l10n: { formatText } }) => (
        <div className={styles.form}>
          <div className={styles.inputWrapper}>
            <Input
              type="email"
              name="email"
              intent="none"
              placeholder={formatText('Authorization.email')}
              value={credentials.email}
              disabled={step >= LOGIN_SENT}
              onChange={handleChange}
              autoFocus={props.autoFocus}
              fill
              {...getInputState('email')}
            />
            {step >= LOGIN_SENT ? (
              <Text
                id="Authorization.wrong"
                onClick={props.onRetry}
                className={styles.retry}
                tagName="a"
              />
            ) : null}
          </div>
          {step < CODE_REQUESTED || step > CODE_SENT ? null : (
            <div className={styles.inputWrapper}>
              <Input
                name="code"
                type="text"
                intent="none"
                placeholder={formatText('Authorization.code')}
                value={credentials.code}
                disabled={step >= CODE_SENT}
                onChange={handleChange}
                autoFocus={props.autoFocus}
                fill
                {...getInputState('code')}
              />
            </div>
          )}
          {props.step > LOGIN_SENT ? (
            <Text
              tagName="div"
              className={styles.agreement}
              id="Authorization.data_processing_agreement"
            />
          ) : null}
        </div>
      )}
    </L10n>
  );
}
