/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node, PureComponent } from 'react';
import classNames from 'classnames';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import styles from './Voice.css';
import { VoiceCardContent } from './VoiceCardContent';

export type Props = {
  className?: string,
  duration: number,
  fileUrl: ?string,
  isUploading: boolean,
  maxWidth: number,
  children?: Node,
};

class Voice extends PureComponent<Props> {
  render() {
    const { isUploading, maxWidth, fileUrl, duration } = this.props;
    const className = classNames(
      styles.container,
      styles.voiceCard,
      this.props.className,
    );

    return (
      <div
        className={className}
        style={{ width: maxWidth === 0 ? '100%' : maxWidth }}
      >
        <VoiceCardContent className={styles.voiceControlsContainer}>
          <AudioPlayer
            src={fileUrl}
            duration={duration}
            pending={isUploading}
          />
        </VoiceCardContent>

        {this.props.children}
      </div>
    );
  }
}

export default Voice;
