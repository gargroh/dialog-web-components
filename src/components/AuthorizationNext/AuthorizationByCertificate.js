/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { AuthError } from '@dlghq/dialog-types';
import React from 'react';
import { Text } from '@dlghq/react-l10n';
import Error from '../Error/Error';
import styles from './AuthorizationNext.css';

export type AuthorizationByCertificateProps = {
  errors: ?{ [field: string]: AuthError },
};

export function AuthorizationByCertificate(
  props: AuthorizationByCertificateProps,
) {
  return (
    <div className={styles.form}>
      {props.errors && props.errors.cert ? (
        <Error>
          <Text id="Authorization.cert_error" html />
        </Error>
      ) : null}
    </div>
  );
}
