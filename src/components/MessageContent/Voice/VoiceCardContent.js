/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node, type StatelessFunctionalComponent } from 'react';
import classNames from 'classnames';
import styles from './Voice.css';

export const VoiceCardContent: StatelessFunctionalComponent<{
  className?: string,
  children?: Node,
  section?: boolean,
}> = (props) => {
  const className = classNames(
    styles.cardContent,
    props.section ? styles.cardSectionDelimiter : undefined,
    props.className,
  );

  return <div className={className}>{props.children}</div>;
};
