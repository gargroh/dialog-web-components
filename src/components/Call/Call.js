/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallWrapperProps as Props } from './types';
import React, { PureComponent } from 'react';
import CallChat from './CallChat';
import CallWindow from './CallWindow';

class Call extends PureComponent<Props> {
  handleEnd = () => {
    const { call } = this.props;
    if (call) {
      this.props.onEnd(call.id);
    }
  };

  handleAnswer = () => {
    const { call } = this.props;
    if (call) {
      this.props.onAnswer(call.id);
    }
  };

  handleMuteToggle = () => {
    const { call } = this.props;
    if (call) {
      this.props.onMuteToggle(call.id, !call.isMuted);
    }
  };

  handleCameraToggle = () => {
    const { call } = this.props;
    if (call) {
      this.props.onCameraToggle(call.id, !call.isCameraOn);
    }
  };

  handleScreenShareToggle = () => {
    const { call } = this.props;
    if (call) {
      this.props.onScreenShareToggle(call.id, !call.isScreenSharingOn);
    }
  };

  render() {
    const { call, small, isVideoEnabled, isScreenSharingEnabled } = this.props;

    if (!call) {
      return null;
    }

    const props = {
      call,
      onEnd: this.handleEnd,
      onAnswer: this.handleAnswer,
      onResize: this.props.onResize,
      onGoToPeer: this.props.onGoToPeer,
      onMuteToggle: this.handleMuteToggle,
      onChatToggle: this.props.onChatToggle,
      onCameraToggle: isVideoEnabled ? this.handleCameraToggle : null,
      onScreenShareToggle: isScreenSharingEnabled
        ? this.handleScreenShareToggle
        : null,
    };

    if (small) {
      return <CallWindow {...props} />;
    }

    return <CallChat {...props} selfPeerInfo={this.props.selfPeerInfo} />;
  }
}

export default Call;
