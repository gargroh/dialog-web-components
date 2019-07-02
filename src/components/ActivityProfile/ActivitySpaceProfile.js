/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { Space } from '../SpaceInfoModal/types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import { PeerInfoTitle } from '../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivityProfile.css';
import Text from '@dlghq/react-l10n/src/Text';
import Markdown from '../Markdown/Markdown';

export type ActivitySpaceProfileProps = {
  className?: string,
  info: Space,
};

export class ActivitySpaceProfile extends PureComponent<ActivitySpaceProfileProps> {
  renderAbout() {
    const {
      info: { about },
    } = this.props;

    if (!about) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        <Text
          className={styles.title}
          tagName="div"
          id="ActivityProfile.about"
        />
        <Markdown text={about} className={styles.about} emojiSize={18} />
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);
    const {
      info: { name, bigAvatar, placeholder, shortname },
    } = this.props;

    return (
      <div className={className}>
        <div className={styles.header}>
          <Avatar
            className={styles.avatar}
            size={140}
            title={name}
            image={bigAvatar}
            placeholder={placeholder}
          />
          <PeerInfoTitle
            title={name}
            userName={shortname}
            titleClassName={styles.name}
            userNameClassName={styles.nick}
            emojiSize={24}
          />
        </div>
        {this.renderAbout()}
      </div>
    );
  }
}
