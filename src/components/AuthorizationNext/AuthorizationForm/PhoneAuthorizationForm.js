/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import { Text, L10n } from '@dlghq/react-l10n';
import { Button } from '@dlghq/dialog-ui';
import { isEqual } from 'lodash';

import type { Country } from '../../CountryCodeSelector/utils/countries';
import { CountryCodeSelectorNext } from '../../CountryCodeSelectorNext/CountryCodeSelectorNext';
import { PhoneInputNext } from '../../PhoneInputNext/PhoneInputNext';
import { AuthorizationAgreement } from '../AuthorizationAgreement';
import { AUTH_STARTED, LOGIN_SENT } from '../constants';
import type { AuthSteps } from '../types';
import styles from './AuthorizationForm.css';

export type Phone = {
  number: string,
  country: ?Country,
};

export type PhoneAuthorizationFormProps = {
  phone: Phone,
  step: AuthSteps,
  error: ?{ message: string },
  onChange: (phone: Phone) => mixed,
  onSubmit: () => mixed,
  onRetry: () => mixed,
};

export function PhoneAuthorizationForm({
  phone,
  step,
  error,
  onChange,
  onSubmit,
  onRetry,
}: PhoneAuthorizationFormProps) {
  function handleCountryChange(country: Country): void {
    if (!isEqual(country, phone.country)) {
      onChange({
        number: country.code,
        country,
      });
    }
  }

  function handleChange(number: string, country: ?Country): void {
    onChange({
      number,
      country,
    });
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit();
  }

  return (
    <L10n>
      {({ l10n: { formatText } }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          {step === AUTH_STARTED || step === LOGIN_SENT ? (
            <div className={styles.inputWrapper}>
              <CountryCodeSelectorNext
                label="AuthorizationNext.choose_country"
                onChange={handleCountryChange}
                value={phone.country}
                disabled={step !== AUTH_STARTED}
              />
            </div>
          ) : null}
          <div className={styles.inputWrapper}>
            <PhoneInputNext
              placeholder={formatText('AuthorizationNext.phone')}
              value={phone.number}
              disabled={step !== AUTH_STARTED && !error}
              onChange={handleChange}
              intent={error ? 'danger' : 'none'}
              hint={error ? error.message : undefined}
              fill
              htmlAutoFocus
            />
            {step !== AUTH_STARTED ? (
              <Text
                id="AuthorizationNext.retry"
                onClick={onRetry}
                tagName="a"
                className={styles.retry}
              />
            ) : null}
          </div>
          {step === AUTH_STARTED || step === LOGIN_SENT ? (
            <footer className={styles.footer}>
              <Button
                round
                type="submit"
                intent="primary"
                pending={step === LOGIN_SENT && !error}
                disabled={step === LOGIN_SENT && !error}
              >
                {formatText('AuthorizationNext.request_code')}
              </Button>
              <AuthorizationAgreement className={styles.agreement} />
            </footer>
          ) : null}
        </form>
      )}
    </L10n>
  );
}
