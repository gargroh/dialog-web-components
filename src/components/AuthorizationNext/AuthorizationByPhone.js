/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React, { useState } from 'react';

import { getPreferredCountryCodes } from '../../utils/language';
import getCountryByPhone from '../PhoneInput/utils/getCountryByPhone';
import {
  PhoneAuthorizationForm,
  type Phone,
} from './AuthorizationForm/PhoneAuthorizationForm';
import { CodeAuthorizationForm } from './AuthorizationForm/CodeAuthorizationForm';
import {
  RegistrationForm,
  type RegistrationInfo,
} from './AuthorizationForm/RegistrationForm';
import {
  AUTH_STARTED,
  LOGIN_SENT,
  SIGNUP_STARTED,
  NAME_SENT,
  AUTH_FINISHED,
  CODE_RESEND_TIMEOUT,
  CODE_LENGTH,
} from './constants';
import type { AuthSteps } from './types';

export type AuthorizationByPhoneProps = {
  initialPhoneNumber: string,
  error: ?{ message: string },
  step: AuthSteps,
  codeLength: number,
  codeResendTimeout: number,
  onPhoneSubmit: (phone: Phone) => mixed,
  onCodeSubmit: (code: string) => mixed,
  onInfoSubmit: (info: RegistrationInfo) => mixed,
  onCodeResend: () => mixed,
  onRetry: () => mixed,
};

export function AuthorizationByPhone({
  initialPhoneNumber,
  error,
  step,
  codeLength,
  codeResendTimeout,
  onPhoneSubmit,
  onCodeSubmit,
  onInfoSubmit,
  onCodeResend,
  onRetry,
}: AuthorizationByPhoneProps) {
  const initialPhone = {
    number: initialPhoneNumber,
    country: getCountryByPhone(initialPhoneNumber, getPreferredCountryCodes()),
  };
  const [phone, setPhone] = useState<Phone>(initialPhone);
  const [code, setCode] = useState<string>('');
  const [info, setInfo] = useState<RegistrationInfo>({ name: '' });

  function handlePhoneSubmit(): void {
    onPhoneSubmit(phone);
  }

  function handleCodeSubmit(): void {
    onCodeSubmit(code);
  }

  function handleInfoSubmit(): void {
    onInfoSubmit(info);
  }

  function handleRetry(): void {
    setPhone(initialPhone);
    onRetry();
  }

  return (
    <>
      <PhoneAuthorizationForm
        phone={phone}
        error={error}
        step={step}
        onChange={setPhone}
        onSubmit={handlePhoneSubmit}
        onRetry={handleRetry}
      />
      {step !== AUTH_STARTED && step !== LOGIN_SENT ? (
        <CodeAuthorizationForm
          code={code}
          codeLength={codeLength}
          error={error}
          step={step}
          onChange={setCode}
          onSubmit={handleCodeSubmit}
          codeResendTimeout={codeResendTimeout}
          onCodeResend={onCodeResend}
        />
      ) : null}
      {step === SIGNUP_STARTED ||
      step === NAME_SENT ||
      step === AUTH_FINISHED ? (
        <RegistrationForm
          info={info}
          error={error}
          step={step}
          onChange={setInfo}
          onSubmit={handleInfoSubmit}
        />
      ) : null}
    </>
  );
}

AuthorizationByPhone.defaultProps = {
  codeResendTimeout: CODE_RESEND_TIMEOUT,
  codeLength: CODE_LENGTH,
  error: null,
};
