/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React, { useState, useEffect, useRef } from 'react';
import { Text, L10n } from '@dlghq/react-l10n';
import { Input, Button } from '@dlghq/dialog-ui';

import { CODE_REQUESTED, CODE_SENT, SIGNUP_STARTED } from '../constants';
import getHumanTime from '../../../utils/getHumanTime';
import styles from './AuthorizationForm.css';

export type CodeAuthorizationFormProps = {
  code: string,
  codeLength: number,
  codeResendTimeout: number,
  step: 'CODE_REQUESTED' | 'CODE_SENT',
  error: ?{ message: string },
  onChange: (code: string) => mixed,
  onSubmit: () => mixed,
  onCodeResend: () => mixed,
};

export function CodeAuthorizationForm({
  code,
  codeLength,
  codeResendTimeout,
  step,
  error,
  onChange,
  onSubmit,
  onCodeResend,
}: CodeAuthorizationFormProps) {
  const intervalRef = useRef<?IntervalID>(null);
  const [isCodeResendRequested, setIsCodeResendRequested] = useState<boolean>(
    step === CODE_REQUESTED,
  );
  const [resendTimeout, setResendTimeout] = useState<number>(codeResendTimeout);

  function intervalClear(): void {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsCodeResendRequested(false);
      setResendTimeout(codeResendTimeout);
      intervalRef.current = null;
    }
  }

  function intervalUpdate(): void {
    setResendTimeout(
      (prevResendTimeout): number => {
        if (prevResendTimeout === 0) {
          intervalClear();

          return prevResendTimeout;
        }

        return prevResendTimeout - 1;
      },
    );
  }

  function handleCodeResend(): void {
    setIsCodeResendRequested(true);
    intervalClear();
    intervalRef.current = setInterval(intervalUpdate, 1000);
    onCodeResend();
  }

  function handleCodeChange(updatedCode: string): void {
    onChange(updatedCode);

    if (updatedCode.length === codeLength) {
      intervalClear();
      onSubmit();
    }
  }

  function handleSubmit(event: SyntheticEvent<>): void {
    event.preventDefault();
    intervalClear();
    onSubmit();
  }

  // Clear interval on component unmount
  useEffect(() => {
    handleCodeResend();

    return () => intervalClear();
  }, []);

  return (
    <L10n>
      {({ l10n: { formatText } }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <Input
              type="text"
              size="normal"
              intent={error ? 'danger' : 'none'}
              placeholder={formatText('AuthorizationNext.code')}
              hint={
                isCodeResendRequested
                  ? formatText('AuthorizationNext.resend_timer', {
                      time: getHumanTime(resendTimeout * 1000),
                    })
                  : undefined
              }
              autoComplete="off"
              value={code}
              disabled={step !== CODE_REQUESTED}
              onChange={handleCodeChange}
              fill
              htmlAutoFocus
            />
            {(!isCodeResendRequested && step === CODE_REQUESTED) ||
            (isCodeResendRequested &&
              (step === CODE_SENT || step === SIGNUP_STARTED)) ? (
              <Text
                id="AuthorizationNext.resend_code"
                onClick={handleCodeResend}
                tagName="a"
                className={styles.retry}
              />
            ) : null}
          </div>
          {step === CODE_REQUESTED || step === CODE_SENT ? (
            <footer className={styles.footer}>
              <Button
                round
                intent="primary"
                type="submit"
                pending={step === CODE_SENT}
                disabled={step === CODE_SENT || !code.length}
              >
                {formatText('AuthorizationNext.check_code')}
              </Button>
            </footer>
          ) : null}
        </form>
      )}
    </L10n>
  );
}
