/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node } from 'react';
import classNames from 'classnames';
import { PeerInfoTitle } from '../PeerInfoTitle/PeerInfoTitle';
import styles from './Toolbar.css';

export type Props = {
  className?: string,
  title: string,
  status: Node,
  isVerified?: ?boolean,
};

export function ToolbarInfo(props: Props) {
  return (
    <div className={classNames(styles.info, props.className)}>
      <PeerInfoTitle
        title={props.title}
        className={styles.nameWrapper}
        titleClassName={styles.name}
        verifiedIconClassName={styles.verifiedIcon}
        emojiSize={20}
        isVerified={props.isVerified}
      />
      <div className={styles.status}>{props.status}</div>
    </div>
  );
}
