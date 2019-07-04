/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { User } from '@dlghq/dialog-types';
import React, { type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import Markdown from '../Markdown/Markdown';
import { PeerInfoTitle } from '../PeerInfoTitle/PeerInfoTitle';
import CustomProfile from '../CustomProfile/CustomProfile';
import Spinner from '../Spinner/Spinner';
import { UserOnline, type UserOnlineState } from '../UserOnline/UserOnline';
import { ActivityUserProfileContacts } from './ActivityUserProfileContacts/ActivityUserProfileContacts';
import styles from './ActivityProfile.css';

export type ActivityUserProfileProps = {
  info: User,
  online?: UserOnlineState,
  className?: string,
  schema?: ?string,
  children: Node,
  onAvatarClick?: () => mixed,
};

export function ActivityUserProfile(props: ActivityUserProfileProps) {
  const {
    info: {
      name,
      nick,
      bigAvatar,
      placeholder,
      about,
      customProfile,
      phones,
      emails,
      status: { type: status },
    },
    online,
    children,
    schema,
  } = props;
  const classes = classNames(styles.container, props.className);

  return (
    <div className={classes}>
      <div className={styles.header}>
        <Avatar
          className={styles.avatar}
          status={online.online ? status : null}
          size={140}
          title={name}
          image={bigAvatar}
          placeholder={placeholder}
          onClick={bigAvatar ? props.onAvatarClick : undefined}
        />
        <PeerInfoTitle
          title={name}
          userName={nick}
          className={styles.peerInfo}
          titleClassName={styles.name}
          userNameClassName={styles.nick}
          emojiSize={24}
        />
        {!online ? (
          <div className={styles.onlinePending}>
            <Spinner type="round" />
          </div>
        ) : (
          <UserOnline className={styles.online} online={online} />
        )}
        {children ? <div className={styles.actions}>{children}</div> : null}
      </div>
      {about ? (
        <div className={styles.wrapper}>
          <Text
            className={styles.title}
            tagName="div"
            id="ActivityProfile.about"
          />
          <Markdown text={about} className={styles.about} />
        </div>
      ) : null}
      {phones.length || emails.length ? (
        <div className={styles.wrapper}>
          {phones.length ? (
            <ActivityUserProfileContacts type="phone" phones={phones} />
          ) : null}
          {phones.length ? (
            <ActivityUserProfileContacts type="email" emails={emails} />
          ) : null}
        </div>
      ) : null}
      {schema && customProfile ? (
        <CustomProfile
          value={customProfile}
          schema={schema}
          className={styles.wrapper}
        />
      ) : null}
    </div>
  );
}
