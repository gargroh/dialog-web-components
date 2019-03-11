/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React, { useState } from 'react';

import {
  UsernameAuthorizationForm,
  type Credentials,
} from './AuthorizationForm/UsernameAuthorizationForm';

export type AuthorizationByUsernameProps = {
  step: 'AUTH_STARTED' | 'LOGIN_SENT' | 'AUTH_FINISHED',
  error: ?{ message: string },
  onSubmit: ({
    username: string,
    password: string,
  }) => mixed,
};

export function AuthorizationByUsername({
  step,
  error,
  onSubmit,
}: AuthorizationByUsernameProps) {
  const initialCredentials = {
    username: '',
    password: '',
  };
  const [credentials, setCredentials] = useState<Credentials>(
    initialCredentials,
  );

  function handleSubmit(): void {
    onSubmit(credentials);
  }

  return (
    <UsernameAuthorizationForm
      credentials={credentials}
      step={step}
      error={error}
      onChange={setCredentials}
      onSubmit={handleSubmit}
    />
  );
}
