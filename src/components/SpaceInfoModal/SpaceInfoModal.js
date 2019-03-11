/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import type { Props, State } from './types';
import Modal from '../Modal/Modal';
import Confirm from '../Confirm/Confirm';
import HotKeys from '../HotKeys/HotKeys';
import SpaceInfoScreen from './SpaceInfoScreen/SpaceInfoScreen';
import SpaceAddMembersScreen from './SpaceAddMembersScreen/SpaceAddMembersScreen';
import SpaceInvitationLinkScreen from './SpaceInvitationLinkScreen';
import SpaceMembersScreen from './SpaceMembersScreen/SpaceMembersScreen';
import styles from './SpaceInfoModal.css';

class SpaceInfoModal extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      screen: 'info',
      confirmScreen: 'leave',
      /**
       * our info component and confirmation component are both modal;
       * render only one of them;
       */
      confirmEnabled: false,
    };
  }

  handleConfirmShow = () => {
    this.setState({
      confirmEnabled: true,
    });
  };

  handleConfirmHide = () => {
    this.setState({
      confirmEnabled: false,
    });
  };

  handleLeaveSpaceConfirmScreen = (): void => {
    this.setState({ confirmScreen: 'leave' }, () => {
      this.handleConfirmShow();
    });
  };

  handleDeleteSpaceConfirmScreen = (): void => {
    this.setState({ confirmScreen: 'delete' }, () => {
      this.handleConfirmShow();
    });
  };

  handlePrevScreen = (): void => {
    this.setState({
      screen: 'info',
    });
  };

  handleAddMembersScreen = (): void => {
    this.setState({
      screen: 'addMembers',
    });
  };

  handleInvitationLinkScreen = (): void => {
    this.setState({
      screen: 'invitationLink',
    });
  };

  handleMembersScreen = (): void => {
    this.setState({
      screen: 'members',
    });
  };

  handleHotkey = (hotkey: string): void => {
    const { screen } = this.state;

    if (hotkey === 'Escape') {
      if (
        screen === 'invitationLink' ||
        screen === 'members' ||
        screen === 'addMembers'
      ) {
        this.handlePrevScreen();
      }

      this.props.onClose();
    }
  };

  renderConfirmLeave() {
    return (
      <Confirm
        message="SpaceInfoModal.confirmation.leave.question"
        submit="SpaceInfoModal.confirmation.leave.action"
        cancel="SpaceInfoModal.confirmation.leave.cancel"
        theme="danger"
        action={this.props.leaveSpaceAction}
        onSubmit={this.props.onLeaveSpace}
        onClose={this.handleConfirmHide}
      />
    );
  }

  renderConfirmDelete() {
    return (
      <Confirm
        message="SpaceInfoModal.confirmation.delete.question"
        submit="SpaceInfoModal.confirmation.delete.action"
        cancel="SpaceInfoModal.confirmation.delete.cancel"
        theme="danger"
        action={this.props.deleteSpaceAction}
        onSubmit={this.props.onDeleteSpace}
        onClose={this.handleConfirmHide}
      />
    );
  }

  renderMainScreen() {
    const { screen } = this.state;

    switch (screen) {
      case 'info':
        return (
          <SpaceInfoScreen
            space={this.props.space}
            isCreator={this.props.isCreator}
            onlineMessage={this.props.onlineMessage}
            notificationEnabled={this.props.notificationEnabled}
            onNotificationChange={this.props.onNotificationChange}
            onClose={this.props.onClose}
            onAddMemberClick={this.handleAddMembersScreen}
            onInvitationLinkClick={this.handleInvitationLinkScreen}
            onMembersScreenClick={this.handleMembersScreen}
            onLeaveSpaceConfirmClick={this.handleLeaveSpaceConfirmScreen}
            onDeleteSpaceConfirmClick={this.handleDeleteSpaceConfirmScreen}
          />
        );
      case 'members':
        return (
          <SpaceMembersScreen
            uid={this.props.uid}
            onlineMessage={this.props.onlineMessage}
            members={this.props.members}
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
            onMemberKick={this.props.onMemberKick}
            onMemberClick={this.props.onMemberClick}
          />
        );
      case 'addMembers':
        return (
          <SpaceAddMembersScreen
            spaceId={this.props.space.id}
            autoFocus={this.props.autoFocusAddMember}
            pending={this.props.pendingAddMembers}
            selector={this.props.membersSelector}
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
            onChange={this.props.onMembersChange}
            onSubmit={this.props.onSubmitAddMembers}
          />
        );
      case 'invitationLink':
        return (
          <SpaceInvitationLinkScreen
            link={this.props.invitationLink}
            pending={this.props.invitationLinkPending}
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
            onRevoke={this.props.onRevoke}
          />
        );
      default:
        return null;
    }
  }

  renderConfirm() {
    const { confirmScreen } = this.state;

    switch (confirmScreen) {
      case 'leave':
        return this.renderConfirmLeave();
      case 'delete':
        return this.renderConfirmDelete();
      default:
        return null;
    }
  }

  render() {
    const { confirmEnabled } = this.state;

    if (confirmEnabled) {
      return this.renderConfirm();
    }

    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          {this.renderMainScreen()}
        </Modal>
      </HotKeys>
    );
  }
}

export default SpaceInfoModal;
