/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import { L10n } from '@dlghq/react-l10n';
import { Input, Button } from '@dlghq/dialog-ui';

import { LOGIN_SENT } from '../constants';
import type { AuthSteps } from '../types';
import styles from './AuthorizationForm.css';

export type Credentials = {
  username: string,
  password: string,
};

export type UsernameAuthorizationFormProps = {
  credentials: Credentials,
  step: AuthSteps,
  error: ?{ message: string },
  onChange: (credentials: Credentials) => mixed,
  onSubmit: () => mixed,
};

export function UsernameAuthorizationForm({
  credentials,
  step,
  error,
  onChange,
  onSubmit,
}: UsernameAuthorizationFormProps) {
  function handleChange(
    value: string,
    event: ?SyntheticInputEvent<HTMLInputElement>,
  ): void {
    if (event) {
      onChange({
        ...credentials,
        [event.target.name]: value,
      });
    }
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit();
  }

  return (
    <L10n>
      {({ l10n: { formatText } }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            name="username"
            size="normal"
            intent={error ? 'danger' : 'none'}
            placeholder={formatText('AuthorizationNext.username')}
            autoComplete="off"
            value={credentials.username}
            disabled={step === LOGIN_SENT && !error}
            onChange={handleChange}
            fill
            htmlAutoFocus
          />
          <Input
            type="password"
            name="password"
            size="normal"
            intent={error ? 'danger' : 'none'}
            placeholder={formatText('AuthorizationNext.password')}
            autoComplete="current-password"
            value={credentials.password}
            disabled={step === LOGIN_SENT && !error}
            onChange={handleChange}
            hint={error ? error.message : undefined}
            fill
          />
          <footer className={styles.footer}>
            <Button
              type="submit"
              intent="primary"
              pending={step === LOGIN_SENT}
              disabled={
                (!(
                  credentials.username.length && credentials.password.length
                ) ||
                  step === LOGIN_SENT) &&
                !error
              }
              round
            >
              {formatText('AuthorizationNext.sign_in')}
            </Button>
          </footer>
        </form>
      )}
    </L10n>
  );
}
