/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from '../Toolbar/Toolbar.css';

export type Props = {
  className?: string,
  children?: React.Element<any>
};

function ToolbarButtons(props: Props): React.Element<any> {
  const className = classNames(styles.buttons, props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default ToolbarButtons;
