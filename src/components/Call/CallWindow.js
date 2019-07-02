/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Hover from '../Hover/Hover';
import CallControls from '../CallControls/CallControls';
import CallVideo from '../CallVideo/CallVideo';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import CallHeader from '../CallHeader/CallHeader';
import getWindowSize from './utils/getWindowSize';
import isOnCall from './utils/isOnCall';
import { hasTheirVideos } from './utils/hasVideo';
import styles from './Call.css';

type CallWindowProps = {
  showCallDirectionLabel: boolean,
  coverVideo: boolean,
};

type Props = CallProps & CallWindowProps;

type State = {
  hover: boolean,
};

class CallWindow extends PureComponent<Props, State> {
  static defaultProps = {
    avatarSize: 136,
    showCallDirectionLabel: false,
    coverVideo: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      hover: true,
    };
  }

  componentDidMount() {
    const { call } = this.props;
    this.props.onResize(getWindowSize(call));
  }

  componentDidUpdate() {
    const { call } = this.props;
    this.props.onResize(getWindowSize(call));
  }

  handleGoToPeer = () => {
    if (!this.isSIP()) {
      this.props.onGoToPeer(this.props.call.peer.peer);
      this.props.onChatToggle(false);
    }
  };

  handleHover = (hover: boolean) => {
    const { call } = this.props;

    if (hasTheirVideos(call) && isOnCall(call.state)) {
      this.setState({ hover });
    }
  };

  isSIP(): boolean {
    return this.props.call.peer.peer.type === 'sip';
  }

  renderHeader() {
    const { call } = this.props;
    const withVideo = hasTheirVideos(call);

    return (
      <CallHeader
        withVideo={withVideo}
        call={call}
        isVisible={this.state.hover}
        onClick={this.isSIP() ? null : this.handleGoToPeer}
      />
    );
  }

  renderVideo() {
    const { call, coverVideo } = this.props;

    if (!hasTheirVideos(call)) {
      return null;
    }

    return <CallVideo theirVideos={call.theirVideos} cover={coverVideo} />;
  }

  renderCallDirectionLabel() {
    if (this.props.showCallDirectionLabel) {
      const suffix = this.props.call.isOutgoing
        ? 'outgoing_call'
        : 'incoming_call';

      return (
        <Text className={styles.callDirectionLabel} id={`Call.${suffix}`} />
      );
    }

    return null;
  }

  renderAvatarOrVideo() {
    const { call, avatarSize, coverVideo } = this.props;

    if (hasTheirVideos(call) && coverVideo) {
      return this.renderVideo();
    }

    return (
      <CallAvatar
        animated
        size={avatarSize}
        peer={call.peer}
        state={call.state}
        onClick={this.isSIP() ? undefined : this.handleGoToPeer}
      />
    );
  }

  renderContent() {
    const { call, coverVideo } = this.props;

    if (!isOnCall(call.state) || coverVideo) {
      return (
        <div className={styles.content}>
          <div className={styles.info}>
            {this.renderCallDirectionLabel()}
            {this.renderAvatarOrVideo()}
            <CallInfo
              className={styles.callState}
              call={call}
              onCall={false}
              withVideo={false}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={styles.content}>
        {this.renderHeader()}
        {this.renderVideo()}
      </div>
    );
  }

  renderControls() {
    const { call } = this.props;

    return (
      <CallControls
        onCall={isOnCall(call.state)}
        withVideo={hasTheirVideos(call)}
        size="normal"
        isVisible={this.state.hover}
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

  render() {
    const { call } = this.props;
    const className = classNames(styles.window, this.props.className);
    const style = getWindowSize(call);

    return (
      <div
        className={className}
        style={style}
        onDoubleClick={this.isSIP() ? null : this.handleGoToPeer}
      >
        <Hover onHover={this.handleHover} className={styles.hover}>
          {this.renderContent()}
          {this.renderControls()}
        </Hover>
      </div>
    );
  }
}

export default CallWindow;
