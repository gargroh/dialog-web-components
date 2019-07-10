/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import type { UserStatusType } from '@dlghq/dialog-types';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './UserStatus.css';

type Props = {
  className?: string,
  dotClassName?: string,
  statusClassName?: string,
  status: UserStatusType,
  withoutDot?: boolean,
};

class UserStatus extends PureComponent<Props> {
  static defaultProps = {
    status: 'unset',
  };

  render() {
    const className = classNames(styles.container, this.props.className);
    const dotClassName = classNames(
      styles.dot,
      styles[this.props.status],
      this.props.dotClassName,
    );
    const statusClassName = classNames(
      styles.status,
      this.props.statusClassName,
    );
    const dndClassName = classNames(styles.dndBrick);

    return (
      <div className={className}>
        {this.props.withoutDot ? null : (
          <div className={dotClassName}>
            {this.props.status === 'do_not_disturb' && (
              <div className={dndClassName} />
            )}
          </div>
        )}
        <Text
          id={`UserStatus.${this.props.status}`}
          className={statusClassName}
        />
      </div>
    );
  }
}

export default UserStatus;
