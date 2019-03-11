/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import { Button } from '@dlghq/dialog-ui';

import type { AuthSteps } from './types';
import { LOGIN_SENT } from './constants';
import Error from '../Error/Error';
import styles from './AuthorizationForm/AuthorizationForm.css';

export type AuthorizationByCertificateProps = {
  step: AuthSteps,
  error: ?{ message: string },
  onSubmit: () => mixed,
};

export function AuthorizationByCertificate({
  step,
  error,
  onSubmit,
}: AuthorizationByCertificateProps) {
  function handleSubmit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <Error className={styles.error}>
          <Text id="AuthorizationNext.cert_error" html />
        </Error>
      ) : null}
      <footer className={styles.footer}>
        <Button
          type="submit"
          intent="primary"
          pending={step === LOGIN_SENT}
          disabled={step === LOGIN_SENT}
          round
        >
          <Text id="AuthorizationNext.sign_in" />
        </Button>
      </footer>
    </form>
  );
}
