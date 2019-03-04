/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { AuthError } from '@dlghq/dialog-types';
import type { Country } from '../CountryCodeSelector/types';

export type EmailValue = {
  type: 'email',
  credentials: {
    code: string,
    email: string,
  },
};

export type PhoneValue = {
  type: 'phone',
  credentials: {
    code: string,
    country: ?Country,
    phone: string,
  },
};

export type UsernameValue = {
  type: 'username',
  credentials: {
    login: string,
    password: string,
  },
};

export type CertValue = {
  type: 'cert',
};

export type AuthValue = EmailValue | PhoneValue | UsernameValue | CertValue;
export type AuthType = $PropertyType<AuthValue, 'type'>;

export type AuthorizationProps = {
  id: string,
  className?: string,
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  value: AuthValue,
  errors: ?{ [field: string]: AuthError },
  allowed: AuthType[],
  autoFocus?: boolean,
  isGenderEnabled: boolean,
  onChange: (value: AuthValue) => mixed,
  onSubmit: (value: AuthValue) => mixed,
  onTypeChange: (type: string) => mixed,
  onRetry: () => mixed,
  onResendCode: () => mixed,
};
