/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type {
  Peer,
  PeerInfo,
  GroupMember,
  AvatarPlaceholder,
} from '@dlghq/dialog-types';

export type Screen = 'info' | 'members' | 'addMembers' | 'invitationLink';
export type ConfirmScreen = 'leave' | 'delete';

type SpaceType = 'space';

/**
 * TODO: Space type to @dlghq/dialog-types; need info to know, what data will be represented in this interface
 */
export type Space = {
  id: number,
  type: SpaceType,
  name: string,
  shortname: string,
  about: ?string,
  avatar: ?string,
  bigAvatar: ?string,
  placeholder: AvatarPlaceholder,
  adminId: number,
  isMember: boolean,
  members: GroupMember[],
};

export type SpaceMember = GroupMember & {
  kickState: {
    pending: boolean,
    error: ?string,
  },
};

export type Props = {
  uid: number,
  className?: string,
  space: Space,

  isCreator: boolean,
  isAdmin: boolean,

  onClose: () => void,

  membersSelector: SelectorState<PeerInfo>,
  onMembersChange: (selector: SelectorState<PeerInfo>) => mixed,
  autoFocusAddMember: boolean,
  onSubmitAddMembers: (gid: number, uids: number[]) => mixed,
  pendingAddMembers: boolean,

  notificationEnabled: boolean,
  onNotificationChange: () => void,

  invitationLink: string,
  onRevoke: () => void,
  invitationLinkPending: boolean,

  onLeaveSpace: () => void,
  onDeleteSpace: () => void,
  deleteSpaceAction: mixed,
  leaveSpaceAction: mixed,

  onlineMessage: string,
  members: SpaceMember[],
  onMemberClick: (peer: Peer) => mixed,
  onMemberKick: (peer: Peer) => mixed,
};

export type State = {
  screen: Screen,
  confirmEnabled: boolean,
  confirmScreen: ConfirmScreen,
};
