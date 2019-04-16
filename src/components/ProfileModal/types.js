/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Field } from '@dlghq/dialog-types';
import type { JSONValue, JSONSchema } from '@dlghq/dialog-utils';

export type Screen = 'profile' | 'avatar';

export type FormName = 'profile' | 'customProfile';

export type ProfileUpdate = {
  avatar: ?(string | File),
  profile: ?JSONValue,
  customProfile: ?JSONValue,
};

export type CustomForm = {
  schema: ?JSONSchema,
  uiSchema: ?JSONSchema,
  value: ?JSONValue,
};

export type Contact = {
  type: 'phone' | 'email',
  title: string,
  value: string,
};

export type Props = {
  className?: string,
  uid: number,
  pending: boolean,
  avatar: ?string,
  profile: CustomForm,
  customProfile: CustomForm,
  contacts: Array<Contact>,
  context: {
    name: Field<string>,
    nick: Field<?string>,
    about: Field<?string>,
    avatar: Field<?(string | File)>,
  },
  onClose: () => void,
  onSubmit: (update: $Shape<ProfileUpdate>) => mixed,
};

export type State = {
  ...ProfileUpdate,
  screen: Screen,
  errors: Array<string>,
};
