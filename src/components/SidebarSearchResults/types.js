/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type {
  Peer,
  Message,
  PeerInfo,
  Field,
  UserOnline,
} from '@dlghq/dialog-types';
import type { Map as ImmutableMap } from 'immutable';

export type SearchEntity = {
  info: PeerInfo,
  focus: Message,
  before: Message[],
  after: Message[],
};

export type SidebarSearchResultsProps = {
  className?: string,
  query: string,
  peers: PeerInfo[],
  messages: Field<SearchEntity[]>,
  onGoToPeer: (peer: Peer) => mixed,
  online: ImmutableMap<number, UserOnline>,
  onGoToMessage: (peer: Peer, message: Message) => mixed,
  minQueryLength?: number,
};
