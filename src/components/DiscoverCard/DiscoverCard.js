/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import { hasSelection } from '@dlghq/dialog-utils';
import { CSSTransition } from 'react-transition-group';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Markdown from '../Markdown/Markdown';
import Hover from '../Hover/Hover';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';
import styles from './DiscoverCard.css';

export type Card = {
  type: 'user' | 'bot' | 'group' | 'channel',
  title: string,
  shortname: ?string,
  description: ?string,
  avatar: ?string,
  peer: Peer,
  joined?: boolean,
  members?: number,
  creator?: string,
};

export type Props = Card & {
  className?: string,
  onGoToPeer: (peer: Peer) => mixed,
};

export type State = {
  isHovered: boolean,
};

class DiscoverCard extends PureComponent<Props, State> {
  state = {
    isHovered: false,
  };

  handleClick = (event: SyntheticMouseEvent<>): void => {
    // $FlowFixMe
    if (event.target.tagName === 'A' || hasSelection()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.props.onGoToPeer(this.props.peer);
  };

  handleHover = (hover: boolean): void => {
    this.setState({ isHovered: hover });
  };

  renderAvatar() {
    const {
      avatar,
      title,
      peer: { id },
    } = this.props;
    const placeholder = getAvatarPlaceholder(id);

    return (
      <div className={styles.side}>
        <Avatar
          title={title}
          image={avatar}
          placeholder={placeholder}
          size={80}
          className={styles.avatar}
        />
      </div>
    );
  }

  renderMembers() {
    const { members } = this.props;

    if (!members) {
      return null;
    }

    return (
      <div className={styles.members}>
        <Icon glyph="person" className={styles.membersIcon} size={18} />
        {members}
      </div>
    );
  }

  renderCreator() {
    const { type, creator } = this.props;

    if (!creator || type !== 'group') {
      return null;
    }

    return (
      <div className={styles.creator}>
        <Text id="DiscoverCard.creator" />
        <PeerInfoTitle
          title={creator}
          className={styles.creatorTitle}
          emojiSize={16}
        />
      </div>
    );
  }

  renderIcon() {
    const { type } = this.props;

    switch (type) {
      case 'channel':
        return <Icon glyph="channel" className={styles.icon} size={24} />;

      case 'group':
        return <Icon glyph="group" className={styles.icon} size={26} />;

      default:
        return null;
    }
  }

  renderTitle() {
    const { title } = this.props;

    return (
      <div className={styles.title} title={title}>
        {this.renderIcon()}
        <PeerInfoTitle title={title} emojiSize={20} />
      </div>
    );
  }

  renderShortname() {
    const { shortname } = this.props;

    if (!shortname) {
      return null;
    }

    return <div className={styles.shortname}>{`@${shortname}`}</div>;
  }

  renderDescription() {
    const { description } = this.props;

    if (!description) {
      return null;
    }

    return (
      <Markdown
        title={description}
        text={description}
        emojiSize={17}
        className={styles.description}
      />
    );
  }

  render() {
    const { type, joined } = this.props;
    const { isHovered } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <Hover
        className={className}
        onClick={this.handleClick}
        onHover={this.handleHover}
        id={`discover_card_${this.props.peer.id}`}
      >
        <div className={styles.body}>
          {this.renderAvatar()}
          <div className={styles.info}>
            {this.renderTitle()}
            {this.renderShortname()}
            {this.renderDescription()}
          </div>
        </div>
        <footer className={styles.footer}>
          {this.renderMembers()}
          {this.renderCreator()}
          <CSSTransition
            in={isHovered}
            timeout={150}
            classNames={{
              enter: styles.enter,
              enterActive: styles.enterActive,
              leave: styles.leave,
              exitActive: styles.leaveActive,
            }}
            unmountOnExit
          >
            <Button
              wide
              theme="primary"
              rounded={false}
              className={styles.button}
            >
              <Text id={`DiscoverCard.${joined ? 'enter' : 'open'}.${type}`} />
            </Button>
          </CSSTransition>
        </footer>
      </Hover>
    );
  }
}

export default DiscoverCard;
