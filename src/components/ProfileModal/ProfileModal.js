/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { JSONValue } from '@dlghq/dialog-utils';
import type {
  Props,
  State,
  CustomForm as CustomFormType,
  FormName,
} from './types';
import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import HotKeys from '../HotKeys/HotKeys';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Field from '../Field/Field';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';
import ImageEdit from '../ImageEdit/ImageEdit';
import Spinner from '../Spinner/Spinner';
import CustomForm, { type FormErrors } from '../CustomForm/CustomForm';
import CustomProfileProperty from '../CustomProfile/CustomProfileProperty';
import styles from './ProfileModal.css';

class ProfileModal extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      screen: 'profile',
      profile: null,
      customProfile: null,
      avatar: props.avatar,
      errors: [],
    };
  }

  static getDerivedStateFromProps(props: Props, state: State): ?$Shape<State> {
    if (props.profile && !state.profile) {
      return {
        profile: props.profile.value,
        customProfile: props.customProfile && props.customProfile.value,
        avatar: props.avatar,
      };
    }

    return null;
  }

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      if (this.isChanged()) {
        this.handleSubmit();
      }
    }
  };

  handleFormChange = (name: FormName) => (
    value: JSONValue,
    id: string,
    errors?: Array<FormErrors>,
  ): void => {
    this.setState((prevState) => {
      const listErrors = prevState.errors.slice();

      if (errors && errors.length > 0) {
        if (!listErrors.includes(id)) {
          listErrors.push(id);
        }
      } else {
        const index = listErrors.indexOf(id);
        if (index > -1) {
          listErrors.splice(index, 1);
        }
      }

      return {
        ...prevState,
        [name]: JSON.parse(JSON.stringify(value)),
        errors: listErrors,
      };
    });
  };

  handleSubmit = (event: ?SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }

    this.props.onSubmit({
      avatar: this.state.avatar,
      profile: this.state.profile,
      customProfile: this.state.customProfile,
    });
  };

  handleAvatarEdit = (avatar: File): void => {
    this.setState({
      screen: 'avatar',
      avatar,
    });
  };

  handleAvatarChange = (avatar: File): void => {
    this.setState({
      screen: 'profile',
      avatar,
    });
  };

  handleAvatarRemove = (): void => {
    this.setState({
      screen: 'profile',
      avatar: null,
    });
  };

  handleValidate = (value: JSONValue, errors: FormErrors) => {
    const { context } = this.props;

    for (const key in context) {
      if (context[key].error && errors[key]) {
        errors[key].addError(context[key].error);
      }
    }

    return errors;
  };

  handleGoToProfile = (): void => {
    this.setState({
      screen: 'profile',
      avatar: this.props.avatar,
    });
  };

  isAvatarChanged(): boolean {
    return this.props.avatar !== this.state.avatar;
  }

  isFormChanged(name: FormName): boolean {
    if (this.props[name]) {
      return !isEqual(this.props[name].value, this.state[name]);
    }

    return false;
  }

  isChanged(): boolean {
    return (
      this.isAvatarChanged() ||
      this.isFormChanged('profile') ||
      this.isFormChanged('customProfile')
    );
  }

  isPending(): boolean {
    const {
      context: { name, nick, about, avatar },
    } = this.props;

    return name.pending || nick.pending || about.pending || avatar.pending;
  }

  renderAvatar(): Node {
    const { uid } = this.props;
    const { avatar, profile } = this.state;

    if (!profile) {
      return null;
    }

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          title={String(profile.name)}
          size={140}
          avatar={avatar}
          placeholder={getAvatarPlaceholder(uid)}
          onChange={this.handleAvatarEdit}
          onRemove={this.state.avatar ? this.handleAvatarRemove : undefined}
        />
      </div>
    );
  }

  renderForm(name: FormName, customForm: CustomFormType): Node {
    if (!customForm) {
      return null;
    }

    const { schema, uiSchema } = customForm;
    const value = this.state[name];

    if (!schema) {
      return null;
    }

    return (
      <Field className={styles.field}>
        <CustomForm
          id={name}
          schema={schema}
          value={value}
          uiSchema={uiSchema}
          onChange={this.handleFormChange(name)}
          onValidate={this.handleValidate}
        />
      </Field>
    );
  }

  renderContacts(): Node {
    const { contacts } = this.props;

    if (contacts.length === 0) {
      return null;
    }

    return (
      <Field className={styles.field}>
        {contacts.map((contact) => {
          return (
            <CustomProfileProperty
              key={`${contact.type}_${contact.value}`}
              type={contact.type}
              title={contact.title}
              value={contact.value}
            />
          );
        })}
      </Field>
    );
  }

  renderProfile(): Node {
    if (!this.props.profile) {
      return (
        <div className={styles.pendingWrapper}>
          <Spinner size="large" />
        </div>
      );
    }

    return (
      <ModalBody className={styles.body}>
        {this.renderAvatar()}
        <div className={styles.form}>
          {this.renderForm('profile', this.props.profile)}
          {this.renderContacts()}
          {this.renderForm('customProfile', this.props.customProfile)}
        </div>
      </ModalBody>
    );
  }

  renderAvatarEdit() {
    const { avatar } = this.state;

    if (avatar && typeof avatar !== 'string') {
      return (
        <ImageEdit
          size={250}
          height={400}
          image={avatar}
          type="circle"
          onSubmit={this.handleAvatarChange}
        />
      );
    }

    return null;
  }

  renderHeader() {
    const { screen } = this.state;

    switch (screen) {
      case 'profile':
        return (
          <ModalHeader withBorder>
            <Text id="ProfileModal.title" />
            <ModalClose
              pending={this.isPending()}
              onClick={this.props.onClose}
              id="profile_modal_close_button"
            />
          </ModalHeader>
        );
      case 'avatar':
        return (
          <ModalHeader withBorder>
            <Icon
              glyph="arrow_back"
              onClick={this.handleGoToProfile}
              className={styles.back}
              id="profile_modal_back_button"
              size={28}
            />
            <Text id="ProfileModal.title_avatar" />
            <ModalClose
              pending={this.isPending()}
              onClick={this.props.onClose}
              id="profile_modal_close_button"
            />
          </ModalHeader>
        );
      default:
        return null;
    }
  }

  renderScreen(): Node {
    const { screen } = this.state;

    switch (screen) {
      case 'profile':
        return this.renderProfile();
      case 'avatar':
        return this.renderAvatarEdit();
      default:
        return null;
    }
  }

  renderFooter(): Node {
    if (this.props.profile && this.state.screen === 'profile') {
      return (
        <ModalFooter className={styles.footer}>
          <Button
            wide
            type="submit"
            theme="success"
            id="profile_modal_submit_button"
            rounded={false}
            loading={this.isPending()}
            disabled={
              !this.isChanged() ||
              this.isPending() ||
              this.state.errors.length > 0
            }
            onClick={this.handleSubmit}
          >
            <Text id="ProfileModal.save" />
          </Button>
        </ModalFooter>
      );
    }

    return null;
  }

  render(): Node {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} isOpen onClose={this.props.onClose}>
          {this.renderHeader()}
          {this.renderScreen()}
          {this.renderFooter()}
        </Modal>
      </HotKeys>
    );
  }
}

export default ProfileModal;
