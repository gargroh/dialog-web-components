/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Field } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import Icon from '../Icon/Icon';
import ModalBody from '../Modal/ModalBody';
import Logo from '../Logo/Logo';
import ButtonNext from '../ButtonNext/ButtonNext';
import AboutModalChangeLogItem, {
  type AboutModalChangeLogItemProps,
} from './AboutModalChangeLogItem';
import styles from './AboutModal.css';

type AboutModalProps = {
  className?: string,
  appName: string,
  appVersion: string,
  updatesDisabled: boolean,
  changeLog: Array<AboutModalChangeLogItemProps>,
  updateState: Field<'upToDate' | 'available'>,
  onCheck: () => mixed,
  onUpdate: () => mixed,
  onClose: () => mixed,
  onVersionClick: () => mixed,
};

type AboutModalState = {
  changeLogExpanded: boolean,
};

class AboutModal extends Component<AboutModalProps, AboutModalState> {
  state = {
    changeLogExpanded: false,
  };

  handleToggleChangeLog = () => {
    this.setState((prevState) => {
      return {
        changeLogExpanded: !prevState.changeLogExpanded,
      };
    });
  };

  renderState() {
    const { appName, updateState, updatesDisabled } = this.props;

    if (updatesDisabled) {
      return null;
    }

    if (updateState.error) {
      return <div className={styles.error}>{updateState.error.message}</div>;
    }

    if (updateState.pending) {
      return (
        <Text
          id={`AboutModal.pending.${updateState.value}`}
          values={{ appName }}
        />
      );
    }

    return (
      <Text id={`AboutModal.state.${updateState.value}`} values={{ appName }} />
    );
  }

  renderUpdateButton() {
    const { updateState, updatesDisabled } = this.props;

    if (updatesDisabled) {
      return null;
    }

    if (!updateState.error && updateState.value === 'available') {
      return (
        <ButtonNext
          size="small"
          id="about_update_button"
          loading={updateState.pending}
          onClick={this.props.onUpdate}
          className={styles.button}
        >
          <Text id="AboutModal.update" />
        </ButtonNext>
      );
    }

    return (
      <ButtonNext
        size="small"
        id="about_check_button"
        loading={updateState.pending}
        onClick={this.props.onCheck}
        className={styles.button}
      >
        <Text id="AboutModal.check" />
      </ButtonNext>
    );
  }

  renderChangeLogButton() {
    const { changeLog } = this.props;
    const { changeLogExpanded } = this.state;

    if (!changeLog || changeLog.length === 0) {
      return null;
    }

    return (
      <button
        type="button"
        id="about_change_log_button"
        onClick={this.handleToggleChangeLog}
        className={styles.changeLogButton}
      >
        <Text
          id={
            changeLogExpanded
              ? 'AboutModal.hideChangeLog'
              : 'AboutModal.showChangeLog'
          }
        />
      </button>
    );
  }

  renderChangeLogBlock() {
    const { changeLogExpanded } = this.state;
    const { changeLog } = this.props;

    if (!changeLogExpanded) {
      return null;
    }

    if (!changeLog || changeLog.length === 0) {
      return null;
    }

    return (
      <div className={styles.changeLogBlock}>
        {changeLog.map((log) => (
          <AboutModalChangeLogItem
            key={`${log.version}_${log.date.toString()}`}
            version={log.version}
            date={log.date}
            changes={log.changes}
          />
        ))}
      </div>
    );
  }

  render() {
    const { appName, appVersion } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalBody className={styles.body}>
          <Icon
            id="about_close_button"
            size={20}
            glyph="close"
            onClick={this.props.onClose}
            className={styles.close}
          />
          <Logo className={styles.logo} />
          <h1 className={styles.appName}>{appName}</h1>
          <Text
            id="AboutModal.version"
            values={{ appVersion }}
            tagName="div"
            onClick={this.props.onVersionClick}
            className={styles.version}
          />
          <div className={styles.state}>{this.renderState()}</div>
          {this.renderUpdateButton()}
          {this.renderChangeLogButton()}
          {this.renderChangeLogBlock()}
        </ModalBody>
      </Modal>
    );
  }
}

export default AboutModal;
