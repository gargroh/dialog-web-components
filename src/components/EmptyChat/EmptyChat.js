/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint max-len:0 */

import * as React from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './EmptyChat.css';
import DialogLogo from './DialogLogo';

export type EmptyChatProps = {
  className?: string,
};

function EmptyChat(props: EmptyChatProps) {
  const className = classNames(styles.container, props.className);

  return (
    <div className={className}>
      <DialogLogo />
      <Text id="EmptyChat.title" tagName="h2" className={styles.title} />
      <Text id="EmptyChat.text" tagName="p" className={styles.text} />
    </div>
  );
}

export default EmptyChat;
