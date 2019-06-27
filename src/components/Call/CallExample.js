/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 */

import type { Call as CallType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import Button from '../Button/Button';
import Call from './Call';

type Props = {
  withVideo?: boolean,
  withScreenSharing?: boolean,
};

type State = {
  call: ?CallType,
  small: boolean,
};

function getVideoStream(callback) {
  if (navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        callback({
          stream,
          isMirrored: true,
        });
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }
}

export class CallExample extends PureComponent<Props, State> {
  static getInitialState(): State {
    return {
      call: null,
      small: false,
    };
  }

  constructor(props: Props) {
    super(props);

    this.state = CallExample.getInitialState();
  }

  handleCall = () => {
    this.setState(
      {
        call: {
          id: String(Math.random()),
          state: 'ringing_outgoing',
          peer: {
            peer: {
              id: 1,
              type: 'user',
            },
            type: 'user',
            avatar: 'https://avatars0.githubusercontent.com/u/3505878',
            bigAvatar: null,
            placeholder: 'green',
            title: 'Nikita',
            userName: 'nkt',
          },
          startTime: 0,
          members: [],
          ownVideos: [],
          theirVideos: [],
          isMuted: false,
          isOutgoing: true,
          isCameraOn: false,
          isScreenSharingOn: false,
          fingerprint: null,
        },
      },
      () => {
        setTimeout(this.handleConnecting, 2000);
      },
    );
  };

  handleConnecting = () => {
    this.setState(
      ({ call }) => {
        return {
          call: {
            ...call,
            state: 'connecting',
          },
        };
      },
      () => {
        setTimeout(this.handleInProgress, 1000);
      },
    );
  };

  handleEnd = () => {
    const { call } = this.state;

    if (call) {
      call.ownVideos.forEach(({ stream }) => {
        // $FlowFixMe: webrtc support
        for (const track of stream.getTracks()) {
          track.stop();
        }
      });

      call.theirVideos.forEach(({ stream }) => {
        // $FlowFixMe: webrtc support
        for (const track of stream.getTracks()) {
          track.stop();
        }
      });
    }

    this.setState(CallExample.getInitialState());
  };

  handleAnswer = () => {
    setTimeout(this.handleInProgress, 2000);
  };

  handleInProgress = () => {
    this.setState(({ call }) => {
      return {
        call: {
          ...call,
          state: 'in_progress',
          startTime: Date.now(),
          fingerprint: '🦄🦖🐓☎️',
        },
      };
    });
  };

  handleMuteToggle = () => {
    const { call } = this.state;

    if (call) {
      this.setState({
        call: {
          ...call,
          isMuted: !call.isMuted,
        },
      });
    }
  };

  handleCameraToggle = () => {
    const { call } = this.state;

    if (call) {
      if (call.isCameraOn) {
        this.setState({
          call: {
            ...call,
            isCameraOn: false,
            ownVideos: [],
          },
        });
      } else {
        this.setState(
          {
            call: {
              ...call,
              isCameraOn: true,
            },
          },
          () => {
            getVideoStream((stream) => {
              this.setState((prevState) => {
                return {
                  call: {
                    ...prevState.call,
                    ownVideos: [stream],
                    theirVideos: [stream, stream],
                  },
                };
              });
            });
          },
        );
      }
    }
  };

  handleScreenShareToggle = () => {
    const { call } = this.state;

    if (call) {
      if (call.isScreenSharingOn) {
        this.setState({
          call: {
            ...call,
            isScreenSharingOn: false,
          },
        });
      } else {
        this.setState({
          call: {
            ...call,
            isScreenSharingOn: true,
          },
        });
      }
    }
  };

  handleResize = (dimensions: $FlowIssue) => {
    console.debug('[call] resize', dimensions); // eslint-disable-line
  };

  handleSizeToggle = () => {
    this.setState(({ small }) => {
      return {
        small: !small,
      };
    });
  };

  handleGoToPeer = (peer: $FlowIssue) => {
    console.debug('[call] go to', peer); // eslint-disable-line
  };

  handleChatToggle = () => {
    console.debug('[call] open chat'); // eslint-disable-line
  };

  renderCall() {
    if (!this.state.call) {
      return null;
    }

    return (
      <Call
        key={this.state.call.id}
        call={this.state.call}
        small={this.state.small}
        isVideoEnabled={Boolean(this.props.withVideo)}
        isScreenSharingEnabled={Boolean(this.props.withScreenSharing)}
        onEnd={this.handleEnd}
        onAnswer={this.handleAnswer}
        onResize={this.handleResize}
        onGoToPeer={this.handleGoToPeer}
        onMuteToggle={this.handleMuteToggle}
        onChatToggle={this.handleChatToggle}
        onCameraToggle={this.handleCameraToggle}
        onScreenShareToggle={this.handleScreenShareToggle}
      />
    );
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleCall} theme="primary" size="small">
          {'Call'}
        </Button>
        <div style={{ width: 6, display: 'inline-block' }} />
        <Button onClick={this.handleSizeToggle} theme="primary" size="small">
          {'Toggle size'}
        </Button>
        <div style={{ height: 500, width: '100%' }}>{this.renderCall()}</div>
      </div>
    );
  }
}
