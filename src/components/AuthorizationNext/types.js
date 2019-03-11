/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

export type FormState = 'initial' | 'pending' | 'submitted';

export type AuthTypes = 'username' | 'phone' | 'email' | 'cretificate';

export type AuthSteps =
  | 'AUTH_STARTED'
  | 'LOGIN_SENT'
  | 'CODE_REQUESTED'
  | 'CODE_SENT'
  | 'SIGNUP_STARTED'
  | 'NAME_SENT'
  | 'AUTH_FINISHED';
