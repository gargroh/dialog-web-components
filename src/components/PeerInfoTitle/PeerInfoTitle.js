/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import Icon from '../Icon/Icon';
import classNames from 'classnames';
import Markdown from '../Markdown/Markdown';
import decorators from './decorators';
import styles from './PeerInfoTitle.css';

export type PeerInfoTitleProps = {
  title: string,
  inline: boolean,
  userName?: ?string,
  className?: string,
  titleClassName?: string,
  userNameClassName?: string,
  verifiedIconClassName?: string,
  onTitleClick?: ?(event: SyntheticMouseEvent<>) => mixed,
  onUserNameClick?: ?(event: SyntheticMouseEvent<>) => mixed,
  addSpacebars: boolean,
  emojiSize?: number,
  isVerified?: ?boolean,
  isFluid: boolean,
};

export function PeerInfoTitle(props: PeerInfoTitleProps) {
  const spacebars = props.addSpacebars ? '\u00A0\u00A0' : null;

  return (
    <span
      className={classNames(
        styles.container,
        { [styles.fluid]: props.isFluid },
        props.className,
      )}
    >
      <span
        className={classNames(styles.title, props.titleClassName)}
        style={props.onTitleClick ? { cursor: 'pointer' } : undefined}
        onClick={props.onTitleClick}
        title={props.title}
      >
        <Markdown
          inline={props.inline}
          emojiSize={props.emojiSize}
          decorators={decorators}
          text={props.title}
        />
        {spacebars}
      </span>
      {props.userName ? (
        <span
          className={classNames(styles.userName, props.userNameClassName)}
          style={props.onUserNameClick ? { cursor: 'pointer' } : undefined}
          onClick={props.onUserNameClick}
          title={`@${props.userName}`}
        >
          {`@${props.userName}`}
          {spacebars}
        </span>
      ) : null}
      {props.isVerified ? (
        <Icon
          glyph="verified"
          size={16}
          className={classNames(
            styles.verifiedIcon,
            props.verifiedIconClassName,
          )}
        />
      ) : null}
    </span>
  );
}

PeerInfoTitle.defaultProps = {
  addSpacebars: false,
  inline: true,
  isFluid: false,
};
