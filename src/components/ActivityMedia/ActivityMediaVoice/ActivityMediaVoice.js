/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import styles from './ActivityMediaVoice.css';

export type ActivityMediaVoiceProps = {
  url: ?string,
  duration: ?number,
  sender: ?string,
};

class ActivityMediaVoice extends PureComponent<ActivityMediaVoiceProps> {
  render() {
    return (
      <div className={styles.container}>
        <AudioPlayer
          className={styles.audio}
          src={this.props.url}
          duration={this.props.duration}
          sender={this.props.sender}
          showDuration={false}
        />
      </div>
    );
  }
}

export default ActivityMediaVoice;
