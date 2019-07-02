/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text, L10n } from '@dlghq/react-l10n';
import classNames from 'classnames';
import { getUserLastSeen } from './utils/getUserLastSeen';
import styles from './UserOnline.css';

export type Online = { online: true, updateDate: Date };
export type Offline = { online: false, updateDate: Date, lastSeen?: Date };
export type UserOnlineState = Online | Offline;

export type Props = {
  className?: string,
  online: UserOnlineState,
};

export function UserOnline(props: Props) {
  const { online } = props;
  const classes = classNames(styles.container, props.className);

  if (online.online) {
    return <Text className={classes} id="UserOnline.online" />;
  }

  if (online.lastSeen) {
    return (
      <L10n>
        {({ l10n }) => (
          <span className={classes}>
            {getUserLastSeen(online, l10n.locale)}
          </span>
        )}
      </L10n>
    );
  }

  return <Text className={classes} id="UserOnline.offline" />;
}
