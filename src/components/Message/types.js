/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Map } from 'immutable';
import type { Node } from 'react';
import type {
  Message as MessageType,
  MessageMediaInteractiveConfirm,
  MessageState as MessageStateType,
  Peer,
  PeerInfo,
} from '@dlghq/dialog-types';

export type Props = {
  users: Map<number, PeerInfo>,
  message: MessageType,
  short: boolean,
  state: ?MessageStateType,
  sender: ?PeerInfo,
  className?: string,
  forceHover?: boolean,
  selected: ?boolean,
  highlight?: boolean,
  maxWidth: number,
  maxHeight: number,
  isSelectionEnabled?: boolean,
  isReactionsEnabled?: boolean,
  renderActions?: () => Node,
  children?: Node,
  onSelect?: (message: MessageType) => mixed,
  onTitleClick?: (message: MessageType) => mixed,
  onAvatarClick?: (message: MessageType) => mixed,
  onMentionClick?: (message: MessageType) => mixed,
  onLightboxOpen?: (message: MessageType) => mixed,
  onReaction?: (char: string) => mixed,
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (peer: ?Peer, message: MessageType) => mixed,
  onInteractiveAction: (
    id: string,
    value: string,
    confirm?: ?MessageMediaInteractiveConfirm,
  ) => mixed,
  onForwardLightboxOpen?: (
    messages: MessageType[],
    focus: MessageType,
  ) => mixed,
};

export type State = {
  hover: boolean,
};
