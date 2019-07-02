/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { Group, Peer } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import Markdown from '../Markdown/Markdown';
import { PeerInfoTitle } from '../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivityProfile.css';

export type ActivityGroupProfileProps = {
  className?: string,
  info: Group,
  children: Node,
  onAvatarClick?: () => mixed,
  onCreatorClick: (peer: Peer) => mixed,
};

export class ActivityGroupProfile extends PureComponent<ActivityGroupProfileProps> {
  handleGoToCreator = () => {
    const creator = this.getCreator();

    if (creator) {
      this.props.onCreatorClick(creator.peerInfo.peer);
    }
  };

  getCreator = () => {
    const {
      info: { members, adminId },
    } = this.props;

    return members.find((member) => {
      return member.peerInfo.peer.id === adminId;
    });
  };

  renderAvatar() {
    const {
      info: { name, bigAvatar, placeholder },
    } = this.props;

    return (
      <Avatar
        className={styles.avatar}
        size={140}
        title={name}
        image={bigAvatar}
        placeholder={placeholder}
        onClick={bigAvatar ? this.props.onAvatarClick : undefined}
      />
    );
  }

  renderTitle() {
    const {
      info: { name, shortname },
    } = this.props;

    return (
      <PeerInfoTitle
        title={name}
        className={styles.peerInfo}
        userName={shortname}
        titleClassName={styles.name}
        userNameClassName={styles.nick}
        emojiSize={24}
      />
    );
  }

  renderCreator() {
    const {
      info: { type },
    } = this.props;

    if (type !== 'group') {
      return null;
    }

    const creator = this.getCreator();

    if (!creator) {
      return null;
    }

    return (
      <div className={styles.creator}>
        <Text id="ActivityProfile.created_by" />
        {'\u00A0'}
        <PeerInfoTitle
          title={creator.peerInfo.title}
          onTitleClick={this.handleGoToCreator}
          emojiSize={18}
        />
      </div>
    );
  }

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

  renderChildren() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return <div className={styles.actions}>{children}</div>;
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.header}>
          {this.renderAvatar()}
          {this.renderTitle()}
          {this.renderCreator()}
          {this.renderChildren()}
        </div>
        {this.renderAbout()}
      </div>
    );
  }
}
