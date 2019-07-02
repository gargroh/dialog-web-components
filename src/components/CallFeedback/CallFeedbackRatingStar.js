/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './CallFeedback.css';

type Props = {
  value: number,
  active: boolean,
  onChange: (value: number) => mixed,
  icon: string,
  iconActive: string,
  size: number,
  label: string,
};

class CallFeedbackRatingStar extends PureComponent<Props> {
  static defaultProps = {
    icon: 'star_outline',
    iconActive: 'star',
    size: 40,
    label: '',
  };

  handleChange = (): void => {
    this.props.onChange(this.props.value);
  };

  render() {
    const { active, iconActive, icon, label, size } = this.props;
    const className = classNames(styles.star, {
      [styles.starActive]: active,
    });
    const glyph = active ? iconActive : icon;

    return (
      <div className={styles.starWrapper}>
        <Icon
          className={className}
          glyph={glyph}
          size={size}
          onClick={this.handleChange}
        />
        {label !== '' && (
          <div className={styles.labelWrapper}>
            <Text id={label} />
          </div>
        )}
      </div>
    );
  }
}

export default CallFeedbackRatingStar;
