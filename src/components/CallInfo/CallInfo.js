/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { PeerInfoTitle } from '../PeerInfoTitle/PeerInfoTitle';
import CallInfoState from './CallInfoState';
import styles from './CallInfo.css';

type Props = {
  className?: string,
  call: Call,
  onCall: boolean,
  withVideo: boolean,
  titleStyle: 'row' | 'column',
  onClick?: ?() => mixed,
  videoCall: boolean,
};

class CallInfo extends PureComponent<Props> {
  static defaultProps = {
    titleStyle: 'row',
    videoCall: false,
  };

  render() {
    const { call, titleStyle, videoCall } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.onCall]: this.props.onCall,
      [styles.withVideo]: this.props.withVideo,
    });

    let title = call.peer.title;
    let inline = true;
    let callerStyle = styles.caller;

    if (titleStyle === 'column') {
      title = title.replace(/\s+/g, '\n');
      inline = false;
      callerStyle = classNames(styles.caller, styles.callerColumn);
    }

    return (
      <div className={className}>
        <div className={styles.wrapper}>
          <div className={callerStyle}>
            <PeerInfoTitle
              title={title}
              inline={inline}
              onTitleClick={this.props.onClick}
              emojiSize={this.props.onCall ? 18 : 24}
            />
          </div>
          <div className={styles.state}>
            <CallInfoState
              state={call.state}
              startTime={call.startTime}
              videoCall={videoCall}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CallInfo;
