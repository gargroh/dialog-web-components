/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import { L10n } from '@dlghq/react-l10n';
import { Input, Button } from '@dlghq/dialog-ui';

import { SIGNUP_STARTED, NAME_SENT, AUTH_FINISHED } from '../constants';
import styles from './AuthorizationForm.css';

export type RegistrationInfo = {
  name: string,
};

export type RegistrationFormProps = {
  info: RegistrationInfo,
  onChange: (info: RegistrationInfo) => mixed,
  onSubmit: () => mixed,
};

export function RegistrationForm({
  info,
  step,
  error,
  onChange,
  onSubmit,
}: RegistrationFormProps) {
  function handleChange(
    value: string,
    { target: { name } }: SyntheticInputEvent<HTMLInputElement>,
  ): void {
    onChange({
      ...info,
      [name]: value,
    });
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <L10n>
      {({ l10n: { formatText } }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <Input
              type="text"
              name="name"
              intent={error ? 'danger' : 'none'}
              placeholder={formatText('Registration.name')}
              autoComplete="off"
              value={info.name}
              size="normal"
              disabled={step !== SIGNUP_STARTED}
              onChange={handleChange}
              fill
              htmlAutoFocus
            />
          </div>
          <footer className={styles.footer}>
            <Button
              type="submit"
              round
              intent="primary"
              pending={step === NAME_SENT}
              disabled={
                info.name === '' || step === NAME_SENT || step === AUTH_FINISHED
              }
            >
              {formatText('Authorization.sign_up')}
            </Button>
          </footer>
        </form>
      )}
    </L10n>
  );
}
