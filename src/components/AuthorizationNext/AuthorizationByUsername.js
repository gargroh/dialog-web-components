/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { AuthError } from '@dlghq/dialog-types';
import { isEmpty } from 'lodash';
import React, { PureComponent, createRef } from 'react';
import { L10n } from '@dlghq/react-l10n';
import { Input, type RefObject } from '@dlghq/dialog-ui';

import type { UsernameValue } from './types';
import styles from './AuthorizationNext.css';

export type AuthorizationByUsernameProps = {
  value: UsernameValue,
  errors: ?{ [field: string]: AuthError },
  pending: boolean,
  autoFocus?: boolean,
  onChange: (value: UsernameValue) => mixed,
};

export class AuthorizationByUsername extends PureComponent<AuthorizationByUsernameProps> {
  input: RefObject<HTMLInputElement>;

  constructor(props: AuthorizationByUsernameProps): void {
    super(props);

    this.input = createRef();
  }

  componentDidMount(): void {
    if (this.input.current && this.props.autoFocus) {
      this.input.current.focus();
    }
  }

  handleChange = (
    value: string,
    { target: { name } }: SyntheticInputEvent<HTMLInputElement>,
  ): void => {
    const {
      value: { credentials },
    } = this.props;

    this.props.onChange({
      type: 'username',
      credentials: {
        ...credentials,
        [name]: value,
      },
    });
  };

  getInputHint(): ?string {
    const { errors } = this.props;

    if (errors) {
      const error = errors.login || errors.password;
      if (error) {
        return error.message;
      }
    }

    return null;
  }

  getInputIntent = (): string => {
    const { errors } = this.props;

    if (isEmpty(errors)) {
      return 'none';
    }

    return 'danger';
  };

  render() {
    const {
      pending,
      value: { credentials },
    } = this.props;

    return (
      <L10n>
        {({ l10n: { formatText } }) => (
          <div className={styles.form}>
            <Input
              ref={this.input}
              type="text"
              name="login"
              intent={this.getInputIntent()}
              placeholder={formatText('Authorization.login')}
              value={credentials.login}
              disabled={pending}
              onChange={this.handleChange}
              fill
            />
            <Input
              type="password"
              name="password"
              intent={this.getInputIntent()}
              onChange={this.handleChange}
              autoComplete="current-password"
              placeholder={formatText('Authorization.password')}
              value={credentials.password}
              disabled={pending}
              hint={this.getInputHint()}
              fill
            />
          </div>
        )}
      </L10n>
    );
  }
}
