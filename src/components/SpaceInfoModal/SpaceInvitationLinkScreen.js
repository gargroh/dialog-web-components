/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Text from '@dlghq/react-l10n/src/Text';

import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalClose from '../Modal/ModalClose';
import ActivityInvite from '../ActivityInvite/ActivityInvite';
import Icon from '../Icon/Icon';
import styles from './SpaceInfoModal.css';

type Props = {
  onClose: () => void,
  onPrevScreen: () => void,
  link: string,
  pending: boolean,
  onRevoke: () => mixed,
};

class SpaceInvitationLinkScreen extends PureComponent<Props> {
  render() {
    return (
      <div className={styles.invitationWrapper}>
        <ModalHeader withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.props.onPrevScreen}
            className={styles.back}
          />
          <Text id="SpaceInfoModal.invitationLink" />
          <ModalClose
            onClick={this.props.onClose}
            id="space_add_members_close_button"
          />
        </ModalHeader>
        <ModalBody className={styles.invitationBody}>
          <ActivityInvite
            link={this.props.link}
            pending={this.props.pending}
            onRevoke={this.props.onRevoke}
          />
        </ModalBody>
      </div>
    );
  }
}

export default SpaceInvitationLinkScreen;
