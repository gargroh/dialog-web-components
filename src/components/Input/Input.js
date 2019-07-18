/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent, createRef } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Input.css';

type ReactRef<T> = {|current: null | T|};

type HTMLAbstractInputElement = HTMLInputElement | HTMLTextAreaElement;
export type Props = {
  className?: string,
  inputClassName?: string,
  wrapperClassName?: string,
  prefixClassName?: string,
  id: string,
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'search'
    | 'tel'
    | 'url'
    | 'password'
    | 'textarea',
  value: string | number,
  name?: string,
  label?: string,
  large?: boolean,
  placeholder?: string,
  prefix?: ?string,
  disabled?: boolean,
  hint?: string,
  status: 'normal' | 'success' | 'error' | 'warning',
  autoFocus?: boolean,
  htmlAutoFocus?: boolean,
  tabIndex?: number,
  spellcheck?: boolean,
  onChange: (
    value: string,
    event: SyntheticInputEvent<HTMLAbstractInputElement>,
  ) => mixed,
  onFocus?: (event: SyntheticFocusEvent<HTMLAbstractInputElement>) => mixed,
  onBlur?: (event: SyntheticFocusEvent<HTMLAbstractInputElement>) => mixed,
  onKeyUp?: (event: SyntheticKeyboardEvent<HTMLAbstractInputElement>) => mixed,
  onKeyDown?: (
    event: SyntheticKeyboardEvent<HTMLAbstractInputElement>,
  ) => mixed,
  onKeyPress?: (
    event: SyntheticKeyboardEvent<HTMLAbstractInputElement>,
  ) => mixed,
};

export type State = {
  isFocused: boolean,
};

export type Context = ProviderContext;

class Input extends PureComponent<Props, State> {
  context: Context;
  ref: ReactRef<HTMLAbstractInputElement>;

  static defaultProps = {
    type: 'text',
    status: 'normal',
    spellcheck: false,
  };

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.state = {
      isFocused: false,
    };

    this.ref = createRef();
  }

  componentDidMount(): void {
    this.autoFocus();
  }

  componentDidUpdate(): void {
    this.autoFocus();
  }

  handleChange = (
    event: SyntheticInputEvent<HTMLAbstractInputElement>,
  ): void => {
    this.props.onChange(event.target.value, event);
  };

  handleFocus = (
    event: SyntheticFocusEvent<HTMLAbstractInputElement>,
  ): void => {
    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLAbstractInputElement>): void => {
    if (this.isAutoFocus()) {
      event.preventDefault();
      event.currentTarget.focus();

      return;
    }

    this.setState({ isFocused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleLabelMouseDown = (event: $FlowIssue): void => {
    event.preventDefault();

    if (this.ref.current) {
      this.ref.current.focus();
    }
  };

  isAutoFocus(): boolean {
    return Boolean(this.props.autoFocus) && !this.props.disabled;
  }

  autoFocus(): void {
    if (this.isAutoFocus() && this.ref.current) {
      if (document.activeElement !== this.ref.current) {
        this.ref.current.focus();
      }
    }
  }

  focus(): void {
    if (
      this.ref.current &&
      document.activeElement !== this.ref.current
    ) {
      this.ref.current.focus();
    }
  }

  blur(): void {
    if (this.ref.current) {
      this.ref.current.blur();
    }
  }

  renderLabel() {
    const { id, label } = this.props;
    const { l10n } = this.context;

    if (!label) {
      return null;
    }

    return (
      <label
        className={styles.label}
        htmlFor={id}
        onMouseDown={this.handleLabelMouseDown}
      >
        {l10n.formatText(label)}
      </label>
    );
  }

  renderHint() {
    const { hint } = this.props;
    const { l10n } = this.context;

    if (!hint) {
      return null;
    }

    return <p className={styles.hint}>{l10n.formatText(hint)}</p>;
  }

  renderPrefix() {
    const { prefix, id } = this.props;

    if (!prefix) {
      return null;
    }
    const className = classNames(styles.prefix, this.props.prefixClassName);

    return (
      <label
        htmlFor={id}
        className={className}
        onMouseDown={this.handleLabelMouseDown}
      >
        {prefix}
      </label>
    );
  }

  renderInput() {
    const {
      props: {
        id,
        name,
        type,
        value,
        disabled,
        tabIndex,
        placeholder,
        htmlAutoFocus,
        onKeyUp,
        onKeyDown,
        onKeyPress,
        spellcheck,
      },
      context: { l10n },
    } = this;

    const props = {
      ref: this.ref,
      className: classNames(styles.input, this.props.inputClassName),
      disabled,
      id,
      name,
      placeholder: placeholder ? l10n.formatText(placeholder) : null,
      type,
      value,
      tabIndex,
      autoFocus: htmlAutoFocus,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
    };

    if (type === 'textarea') {
      return <textarea {...props} spellCheck={spellcheck ? 'true' : 'false'} />;
    }

    return <input {...props} spellCheck={spellcheck ? 'true' : 'false'} />;
  }

  render() {
    const {
      props: { value, disabled, status, large },
      state: { isFocused },
    } = this;

    const className = classNames(
      styles.container,
      this.props.className,
      status ? styles[status] : null,
      value ? styles.filled : null,
      isFocused ? styles.focused : null,
      disabled ? styles.disabled : null,
      large ? styles.large : null,
    );

    const wrapperClassName = classNames(
      styles.inputWrapper,
      this.props.wrapperClassName,
    );

    return (
      <div className={className}>
        {this.renderLabel()}
        <div className={wrapperClassName}>
          {this.renderPrefix()}
          {this.renderInput()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}

export default Input;
