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

export function PeerInfoTitle({
  title,
  inline,
  userName,
  className,
  titleClassName,
  userNameClassName,
  verifiedIconClassName,
  onTitleClick,
  onUserNameClick,
  addSpacebars,
  emojiSize,
  isVerified,
  isFluid,
}: PeerInfoTitleProps) {
  const spacebars = addSpacebars ? '\u00A0\u00A0' : null;

  return (
    <span
      className={classNames(
        styles.container,
        { [styles.fluid]: isFluid },
        className,
      )}
    >
      <span
        className={classNames(styles.title, titleClassName)}
        style={onTitleClick ? { cursor: 'pointer' } : undefined}
        onClick={onTitleClick}
        title={title}
      >
        <Markdown
          inline={inline}
          emojiSize={emojiSize}
          decorators={decorators}
          text={title}
        />
        {spacebars}
      </span>
      {userName ? (
        <span
          className={classNames(styles.userName, userNameClassName)}
          style={onUserNameClick ? { cursor: 'pointer' } : undefined}
          onClick={onUserNameClick}
          title={`@${userName}`}
        >
          {`@${userName}`}
          {spacebars}
        </span>
      ) : null}
      {isVerified ? (
        <Icon
          glyph="verified"
          size={16}
          className={classNames(styles.verifiedIcon, verifiedIconClassName)}
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
