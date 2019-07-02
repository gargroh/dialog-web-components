/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallState } from '@dlghq/dialog-types';
import * as React from 'react';
import { Text } from '@dlghq/react-l10n';
import TimeTimer from '../Timer/TimeTimer';

type Props = {
  state: CallState,
  startTime: number,
  videoCall?: ?boolean,
};

function CallInfoState(props: Props) {
  switch (props.state) {
    case 'ringing_incoming':
      return (
        <Text
          id={
            props.videoCall
              ? 'Call.ringing_incoming_video'
              : 'Call.ringing_incoming'
          }
        />
      );
    case 'connecting_to_peer':
    case 'ringing_outgoing':
    case 'connecting':
    case 'ended':
      return <Text id={`Call.${props.state}`} />;

    case 'in_progress':
      return <TimeTimer start={props.startTime} />;

    default:
      return <Text id="Call.unknown" />;
  }
}

export default CallInfoState;
