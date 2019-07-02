/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './IconButton.css';

export type Props = {
  className?: string,
  id?: string,
  style?: Object,
  glyph: string,
  size: 'small' | 'normal' | 'large' | number,
  theme: ColorTheme,
  flat: boolean,
  disabled: boolean,
  active?: boolean,
  onClick?: ?(event: SyntheticEvent<HTMLButtonElement>) => mixed,
};

class IconButton extends PureComponent<Props> {
  button: ?HTMLButtonElement;

  static defaultProps = {
    size: 'normal',
    flat: false,
    theme: 'default',
    disabled: false,
  };

  getIconSize = (): number => {
    const { size } = this.props;

    switch (size) {
      case 'small':
        return 16;

      case 'normal':
        return 22;

      case 'large':
        return 30;

      default:
        return size;
    }
  };

  renderIcon() {
    const { glyph } = this.props;
    const size = this.getIconSize();

    return <Icon glyph={glyph} className={styles.icon} size={size} />;
  }

  render() {
    const {
      className,
      theme,
      size,
      disabled,
      id,
      flat,
      style,
      active,
      onClick,
      ...otherProps
    } = this.props;

    const buttonClassName = classNames(
      styles.container,
      styles[String(size)],
      {
        [styles.disabled]: disabled,
        [styles.defaultStyle]: !flat,
        [styles.flat]: flat,
        [styles[theme]]: flat,
        [styles.active]: active,
      },
      className,
    );

    return (
      <button
        className={buttonClassName}
        id={id}
        type="button"
        disabled={disabled}
        style={style}
        onClick={onClick}
        {...otherProps}
      >
        <span className={styles.fix}>{this.renderIcon()}</span>
      </button>
    );
  }
}

export default IconButton;
