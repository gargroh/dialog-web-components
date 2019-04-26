/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint-disable react/no-unused-prop-types */

import type { ProviderContext } from '@dlghq/react-l10n';
import type { Field, Group } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { fileToBase64 } from '@dlghq/dialog-utils';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import InputNext from '../InputNext/InputNext';
import styles from '../CreateNewModal/CreateNewModal.css';
import Switcher from '../Switcher/Switcher';

export type Props = {
  id: string,
  group: Group,
  name: Field<string>,
  shortname: Field<?string>,
  about: Field<?string>,
  avatar: ?(string | File),
  className?: string,
  vertical: boolean,
  isPublicGroupsEnabled: boolean,
  shortnamePrefix?: ?string,
  aboutMaxLength?: number,
  onChange: (value: mixed, event: SyntheticInputEvent<>) => void,
  onSubmit: () => void,
  onAvatarChange: (avatar: File) => void,
  onAvatarRemove: () => void,
  onPublicToggle: (isPublic: boolean) => void,
};

export type State = {
  avatar: ?string,
  isPublic: boolean,
  shortname: string,
};

export type Context = ProviderContext;

class EditGroupModalForm extends PureComponent<Props, State> {
  shortnameInput: ?InputNext;

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  static defaultProps = {
    vertical: false,
    id: 'edit_group',
    aboutMaxLength: 3000,
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    const isPublic = props.shortname && Boolean(props.shortname.value);
    const shortname = props.shortname.value || '';

    if (!props.avatar || typeof props.avatar === 'string') {
      this.state = {
        avatar: props.avatar,
        isPublic,
        shortname,
      };
    } else {
      this.state = {
        avatar: null,
        isPublic,
        shortname,
      };
      fileToBase64(props.avatar, (avatar) => {
        this.setState({ avatar });
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.avatar || typeof nextProps.avatar === 'string') {
      this.setState({ avatar: nextProps.avatar });
    } else {
      fileToBase64(nextProps.avatar, (avatar) => {
        this.setState({ avatar });
      });
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.shortnameInput) {
      if (prevState.isPublic !== this.state.isPublic && this.state.isPublic) {
        this.shortnameInput.focus();
      }
    }
  }

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();

    this.props.onSubmit();
  };

  handlePublicToggle = (isPublic: boolean): void => {
    this.setState({ isPublic });
    this.props.onPublicToggle(isPublic);
  };

  handleShortnameChange = (
    shortname: string,
    event: SyntheticInputEvent<>,
  ): void => {
    this.setState({ shortname });
    this.props.onChange(shortname, event);
  };

  getInputState = (field: string): Object => {
    if (this.props[field].error) {
      return {
        status: 'error',
        hint: this.props[field].error,
      };
    }

    return {};
  };

  setShortnameInput = (shortnameInput: ?InputNext): void => {
    if (shortnameInput) {
      this.shortnameInput = shortnameInput;
    }
  };

  renderAvatar() {
    const { group, name } = this.props;
    const { avatar } = this.state;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          title={name.value}
          placeholder={group.placeholder}
          avatar={avatar}
          size={140}
          onRemove={this.props.onAvatarRemove}
          onChange={this.props.onAvatarChange}
        />
      </div>
    );
  }

  renderShortname() {
    const { group, id, isPublicGroupsEnabled } = this.props;

    if (!isPublicGroupsEnabled) {
      return null;
    }

    const isInitiallyPublic =
      this.props.shortname && Boolean(this.props.shortname.value);

    return (
      <div className={styles.shortnameWrapper}>
        <Switcher
          id={`${id}_public_swither`}
          name={`${id}_public_swither`}
          value={this.state.isPublic}
          disabled={isInitiallyPublic}
          onChange={this.handlePublicToggle}
          label={`EditGroupModal.${group.type}.public`}
          className={styles.switcher}
        />
        <InputNext
          id={`${id}_shortname`}
          name="shortname"
          onChange={this.handleShortnameChange}
          prefix={this.props.shortnamePrefix}
          value={this.state.shortname}
          disabled={!this.state.isPublic}
          label={`CreateNewModal.${group.type}.info.shortname`}
          ref={this.setShortnameInput}
          {...this.getInputState('shortname')}
        />
      </div>
    );
  }

  render() {
    const { group, about, name, vertical, id, aboutMaxLength } = this.props;
    const className = classNames(
      styles.info,
      {
        [styles.vertical]: vertical,
      },
      this.props.className,
    );

    return (
      <div className={className}>
        {this.renderAvatar()}
        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <InputNext
            className={styles.input}
            id={`${id}_name`}
            name="name"
            onChange={this.props.onChange}
            status={name.error ? 'error' : 'normal'}
            label={`CreateNewModal.${group.type}.info.title.label`}
            placeholder={`CreateNewModal.${group.type}.info.title.placeholder`}
            value={name.value || ''}
            htmlAutoFocus
            {...this.getInputState('name')}
          />
          <InputNext
            className={styles.input}
            id={`${id}_about`}
            name="about"
            status={about.error ? 'error' : 'normal'}
            onChange={this.props.onChange}
            maxLength={aboutMaxLength}
            label={`CreateNewModal.${group.type}.info.description.label`}
            placeholder={`CreateNewModal.${
              group.type
            }.info.description.placeholder`}
            type="textarea"
            value={about.value || ''}
            {...this.getInputState('about')}
          />
          {this.renderShortname()}
        </form>
      </div>
    );
  }
}

export default EditGroupModalForm;
