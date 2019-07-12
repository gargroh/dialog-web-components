/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { fileToBase64 } from '@dlghq/dialog-utils';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import InputNext from '../InputNext/InputNext';
import Switcher from '../Switcher/Switcher';
import styles from './CreateNewModal.css';

export type Props = {
  id: string,
  type: 'group' | 'channel',
  title: string,
  isPublic: boolean,
  vertical: boolean,
  isPublicGroupsEnabled: boolean,
  shortname: ?string,
  shortnamePrefix: ?string,
  about: ?string,
  avatar: ?File,
  className?: string,
  aboutMaxLength?: number,
  onSubmit: (event: SyntheticEvent<>) => void,
  onChange: (value: string, event: SyntheticInputEvent<>) => void,
  onAvatarRemove: () => void,
  onAvatarChange: (avatar: File) => void,
  onPublicToggle: (isPublic: boolean) => void,
};
export type State = {
  avatar: ?string,
};

export type Context = ProviderContext;

class CreateGroupInfoForm extends PureComponent<Props, State> {
  shortnameInput: ?InputNext;

  static defaultProps = {
    aboutMaxLength: 3000,
    vertical: false,
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.state = {
      avatar: null,
    };
  }

  componentDidMount() {
    if (this.props.avatar) {
      fileToBase64(this.props.avatar, (avatar) => this.setState({ avatar }));
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.avatar) {
      fileToBase64(nextProps.avatar, (avatar) => this.setState({ avatar }));
    } else {
      this.setState({ avatar: nextProps.avatar });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.shortnameInput) {
      if (prevProps.isPublic !== this.props.isPublic && this.props.isPublic) {
        this.shortnameInput.focus();
      }
    }
  }

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();

    this.props.onSubmit(event);
  };

  handlePublicToggle = (isPublic: boolean): void => {
    this.props.onPublicToggle(isPublic);
  };

  setShortnameInput = (shortnameInput: ?InputNext): void => {
    if (shortnameInput) {
      this.shortnameInput = shortnameInput;
    }
  };

  renderAvatar() {
    const { title } = this.props;
    const { avatar } = this.state;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          title={title}
          placeholder="empty"
          avatar={avatar}
          size={140}
          onRemove={this.props.onAvatarRemove}
          onChange={this.props.onAvatarChange}
        />
      </div>
    );
  }

  renderShortname() {
    const { type, shortname, id, isPublicGroupsEnabled } = this.props;

    if (!isPublicGroupsEnabled) {
      return null;
    }

    return (
      <div className={styles.shortnameWrapper}>
        <Switcher
          id={`${id}_public_swither`}
          name={`${id}_public_swither`}
          value={this.props.isPublic}
          onChange={this.handlePublicToggle}
          label={`CreateNewModal.${type}.public`}
          className={styles.switcher}
        />
        <InputNext
          id={`${id}_shortname`}
          name="shortname"
          value={shortname || ''}
          prefix={this.props.shortnamePrefix}
          disabled={!this.props.isPublic}
          label={`CreateNewModal.${type}.info.shortname`}
          ref={this.setShortnameInput}
          onChange={this.props.onChange}
        />
      </div>
    );
  }

  render() {
    const { id, type, about, aboutMaxLength, title, vertical } = this.props;
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
        <form id={id} autoComplete="off" className={styles.form}>
          <InputNext
            className={styles.input}
            id={`${id}_title`}
            name="title"
            onChange={this.props.onChange}
            placeholder={`CreateNewModal.${type}.info.title.placeholder`}
            label={`CreateNewModal.${type}.info.title.label`}
            value={title}
            htmlAutoFocus
          />
          <InputNext
            className={styles.input}
            id={`${id}_about`}
            name="about"
            onChange={this.props.onChange}
            label={`CreateNewModal.${type}.info.description.label`}
            placeholder={`CreateNewModal.${type}.info.description.placeholder`}
            type="textarea"
            value={about || ''}
            maxLength={aboutMaxLength}
          />
          {this.renderShortname()}
        </form>
      </div>
    );
  }
}

export default CreateGroupInfoForm;
