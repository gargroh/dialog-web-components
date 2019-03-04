/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { AuthError } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { L10n } from '@dlghq/react-l10n';
import { Button } from '@dlghq/dialog-ui';

import type { AuthValue, AuthType } from './types';
import {
  LOGIN_SENT,
  CODE_REQUESTED,
  CODE_SENT,
  AUTH_FINISHED,
} from './constants';
import { AuthorizationTypeSelector } from './AuthorizationTypeSelector';
// import { AuthorizationByPhone } from './AuthorizationByPhone';
import { AuthorizationByEmail } from './AuthorizationByEmail';
import { AuthorizationByUsername } from './AuthorizationByUsername';
import { AuthorizationByCertificate } from './AuthorizationByCertificate';
import styles from './AuthorizationNext.css';

export type AuthorizationProps = {
  className?: string,
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  value: AuthValue,
  errors: ?{ [field: string]: AuthError },
  allowed: Array<AuthType>,
  autoFocus?: boolean,
  onChange: (value: AuthValue) => mixed,
  onSubmit: (value: AuthValue) => mixed,
  onTypeChange: (type: string) => mixed,
  onRetry: () => mixed,
  // onResendCode: () => mixed,
};

export class AuthorizationNext extends PureComponent<AuthorizationProps> {
  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.props.value);
  };

  isLoading(): boolean {
    const { step } = this.props;

    return step === LOGIN_SENT || step === CODE_SENT;
  }

  getSubmitButtonText(): string {
    const {
      step,
      value: { type },
    } = this.props;

    if (type === 'username' || type === 'cert') {
      return 'Authorization.sign_in';
    }

    if (step < CODE_REQUESTED) {
      return 'Authorization.request_code';
    }

    if (step < AUTH_FINISHED) {
      return 'Authorization.sign_up';
    }

    return 'Authorization.success';
  }

  renderForm() {
    const { autoFocus, value, errors, step } = this.props;

    switch (value.type) {
      case 'email':
        return (
          <AuthorizationByEmail
            step={step}
            value={value}
            errors={errors}
            pending={this.isLoading()}
            autoFocus={autoFocus}
            onRetry={this.props.onRetry}
            onChange={this.props.onChange}
            onSubmit={this.props.onSubmit}
          />
        );

      case 'username':
        return (
          <AuthorizationByUsername
            value={value}
            errors={errors}
            pending={this.isLoading()}
            autoFocus={autoFocus}
            onChange={this.props.onChange}
          />
        );

      case 'cert':
        return <AuthorizationByCertificate errors={errors} />;

      default:
        console.warn('Unsupported auth type');

        return null;
    }
  }

  render() {
    const { step, allowed, value } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <L10n>
        {({ l10n: { formatText } }) => (
          <form
            className={className}
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <AuthorizationTypeSelector
              allowed={allowed}
              type={value.type}
              disabled={step >= CODE_REQUESTED}
              onChange={this.props.onTypeChange}
            />
            {this.renderForm()}
            <Button
              round
              className={styles.submit}
              type="submit"
              intent="primary"
              fill
              pending={this.isLoading()}
            >
              {formatText(this.getSubmitButtonText())}
            </Button>
          </form>
        )}
      </L10n>
    );
  }
}
