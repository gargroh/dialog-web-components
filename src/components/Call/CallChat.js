/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { CallProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import fullScreen from 'screenfull';
import Hover from '../Hover/Hover';
import CallVideo from '../CallVideo/CallVideo';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import CallControls from '../CallControls/CallControls';
import CallFingerprint from '../CallFingerprint/CallFingerprint';
import Icon from '../Icon/Icon';
import CallInfoState from '../CallInfo/CallInfoState';
import isOnCall from './utils/isOnCall';
import { hasVideos, hasTheirVideos } from './utils/hasVideo';
import styles from './Call.css';

type CallChatProps = {
  showTimerOnVideo: boolean,
  selfPeerInfo: PeerInfo,
};

type Props = CallProps & CallChatProps;

type State = {
  isFullScreen: boolean,
  isControlsVisible: boolean,
};

class CallChat extends PureComponent<Props, State> {
  container: ?Node;

  static defaultProps = {
    avatarSize: 180,
    showTimerOnVideo: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isFullScreen: false,
      isControlsVisible: true,
    };
  }

  handleHover = (hover: boolean) => {
    const { call } = this.props;

    if (hasVideos(call)) {
      this.setState({ isControlsVisible: hover });
    }
  };

  handleFullScreen = () => {
    if (fullScreen.enabled && this.container) {
      fullScreen.toggle(this.container);
      this.setState((state) => {
        return {
          isFullScreen: !state.isFullScreen,
        };
      });
    }
  };

  setContainer = (container: ?Node) => {
    this.container = container;
  };

  renderVideo() {
    const { call } = this.props;

    if (!hasVideos(call) || !isOnCall(call.state)) {
      return null;
    }

    return (
      <CallVideo
        isHovered={this.state.isControlsVisible}
        ownVideos={call.ownVideos}
        theirVideos={call.theirVideos}
      />
    );
  }

  renderInfo() {
    const { call, avatarSize, showTimerOnVideo } = this.props;

    const isVideoCall = isOnCall(call.state) && hasTheirVideos(call);

    if (isVideoCall) {
      if (showTimerOnVideo) {
        return (
          <div className={styles.timerOnVideo}>
            <CallInfoState state={call.state} startTime={call.startTime} />
          </div>
        );
      }

      return null;
    }

    return (
      <div className={styles.info}>
        <CallAvatar
          animated={!isOnCall(call.state)}
          size={avatarSize}
          peer={call.peer}
          state={call.state}
        />
        <CallInfo
          className={styles.chatCallState}
          call={call}
          onCall={isOnCall(call.state)}
          withVideo={false}
        />
      </div>
    );
  }

  renderControls() {
    const { call } = this.props;

    return (
      <CallControls
        onCall={isOnCall(call.state)}
        withVideo={hasVideos(call)}
        size="large"
        isVisible={this.state.isControlsVisible}
        disabled={this.props.isControlsDisabled}
        state={call.state}
        isMuted={call.isMuted}
        isCameraOn={call.isCameraOn}
        isScreenSharingOn={call.isScreenSharingOn}
        onEnd={this.props.onEnd}
        onAnswer={this.props.onAnswer}
        onMuteToggle={this.props.onMuteToggle}
        onCameraToggle={this.props.onCameraToggle}
        onScreenShareToggle={this.props.onScreenShareToggle}
      />
    );
  }

  renderFullScreen() {
    if (!fullScreen.enabled) {
      return null;
    }

    return (
      <Icon
        glyph={this.state.isFullScreen ? 'minimize' : 'maximize'}
        className={styles.fullScreen}
        size={24}
        onClick={this.handleFullScreen}
      />
    );
  }

  renderFingerprint() {
    const { call } = this.props;

    if (!isOnCall(call.state) || !call.fingerprint) {
      return null;
    }

    return (
      <CallFingerprint
        fingerprint={call.fingerprint}
        className={styles.chatFingerprint}
        isVideoRuning={hasTheirVideos(call)}
      />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className} ref={this.setContainer}>
        <Hover onHover={this.handleHover} className={styles.hover}>
          <div className={styles.content}>
            {this.renderVideo()}
            {this.renderInfo()}
          </div>
          {this.renderFullScreen()}
          {this.renderControls()}
          {this.renderFingerprint()}
        </Hover>
      </div>
    );
  }
}

export default CallChat;
