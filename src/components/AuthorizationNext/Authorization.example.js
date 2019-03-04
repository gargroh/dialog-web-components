/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 */

import type { AuthValue } from './types';
import React, { Component } from 'react';
import { Button } from '@dlghq/dialog-ui';

import { AuthorizationNext } from './AuthorizationNext';
import {
  AUTH_STARTED,
  LOGIN_SENT,
  CODE_REQUESTED,
  CODE_SENT,
  SIGNUP_STARTED,
  NAME_SENT,
  AUTH_FINISHED,
} from './constants';

const defaultAuthCredentials = {
  email: {
    email: '',
    code: '',
  },
  phone: {
    phone: '',
    country: null,
    code: '',
  },
  username: {
    login: '',
    password: '',
  },
};

export class AuthorizationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: AUTH_STARTED,
      value: {
        type: 'email',
        credentials: defaultAuthCredentials.email,
      },
      errors: {},
    };
  }

  handleTypeChange = (type) => {
    this.setState({
      step: AUTH_STARTED,
      value: {
        type,
        credentials: defaultAuthCredentials[type],
      },
    });
  };

  handleChange = (value: AuthValue) => {
    this.setState({ value });
  };

  handleSubmit = () => {
    const {
      step,
      value: { type },
    } = this.state;

    if (type === 'username') {
      this.setState({ step: AUTH_FINISHED });
    } else {
      switch (step) {
        case AUTH_STARTED:
          this.setState({ step: LOGIN_SENT });
          if (
            this.state.value.type === 'email' &&
            this.state.value.credentials.email === 'alice@example.com'
          ) {
            console.log('email auth');
            setTimeout(
              () =>
                this.setState({ errors: { email: { message: 'lolololo' } } }),
              2000,
            );
          } else {
            setTimeout(() => this.setState({ step: CODE_REQUESTED }), 2000);
          }
          break;
        case CODE_REQUESTED:
          this.setState({ step: CODE_SENT });
          if (this.state.login === 'bob@example.com') {
            setTimeout(() => this.setState({ step: AUTH_FINISHED }), 2000);
          } else {
            setTimeout(() => this.setState({ step: SIGNUP_STARTED }), 2000);
          }
          break;
        case SIGNUP_STARTED:
          this.setState({ step: NAME_SENT });
          setTimeout(() => this.setState({ step: AUTH_FINISHED }), 2000);
          break;
        case AUTH_FINISHED:
          break;
        default:
          throw new Error(`Unexpected step ${this.state.step}`);
      }
    }
  };

  handleResendCode = () => {
    console.debug('Resend code request');
  };

  handleRetry = () => {
    this.setState({ step: AUTH_STARTED });
  };

  handleFinish = () => {
    this.setState({
      step: AUTH_STARTED,
      value: {
        type: 'username',
        credentials: defaultAuthCredentials.username,
      },
    });
  };

  render() {
    return (
      <>
        <AuthorizationNext
          allowed={['email', 'username', 'cert']}
          step={this.state.step}
          value={this.state.value}
          errors={this.state.errors}
          onChange={this.handleChange}
          onTypeChange={this.handleTypeChange}
          onSubmit={this.handleSubmit}
          onRetry={this.handleRetry}
          onResendCode={this.handleResendCode}
          autoFocus={false}
        />
        {this.state.step === AUTH_FINISHED ? (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <Button onClick={this.handleFinish}>Restart Auth</Button>
          </div>
        ) : null}
      </>
    );
  }
}
