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

type Props = {
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
  wrap: boolean,
};

export function PeerInfoTitle(props: Props) {
  const spacebars = props.addSpacebars ? '\u00A0\u00A0' : null;
  const { userName, title, isFluid, wrap } = props;

  return (
    <span
      className={classNames(
        styles.container,
        { [styles.fluid]: isFluid },
        props.className,
      )}
    >
      <span
        className={classNames(styles.title, props.titleClassName, {
          [styles.wrap]: wrap,
        })}
        style={props.onTitleClick ? { cursor: 'pointer' } : undefined}
        onClick={props.onTitleClick}
        title={title}
      >
        <Markdown
          inline={props.inline}
          emojiSize={props.emojiSize}
          decorators={decorators}
          text={title}
        />
        {spacebars}
      </span>
      {userName ? (
        <span
          className={classNames(styles.userName, props.userNameClassName)}
          style={props.onUserNameClick ? { cursor: 'pointer' } : undefined}
          onClick={props.onUserNameClick}
          title={`@${userName}`}
        >
          {`@${userName}`}
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
  wrap: false,
};
