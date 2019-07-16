/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint class-methods-use-this: "warn" */

import type { ProfileSettings } from '@dlghq/dialog-types';
import type { Props } from './types';
import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBodyTabs from '../Modal/ModalBodyTabs';
import Spinner from '../Spinner/Spinner';
import Scroller from '../Scroller/Scroller';
import PreferencesGeneral from './PreferencesGeneral';
import PreferencesNotifications from './PreferencesNotifications';
import PreferencesSecurity from './PreferencesSecurity/PreferencesSecurity';
import PreferencesBlocked from './PreferencesBlocked/PreferencesBlocked';
import styles from './PreferencesModal.css';

class PreferencesModal extends PureComponent<Props> {
  handleSettingsChange = (settings: $Shape<ProfileSettings>): void => {
    this.props.onSettingsChange({
      ...this.props.settings,
      ...settings,
    });
  };

  renderScreenSpinner(): Node {
    return (
      <div className={styles.spinnerScreen}>
        <Spinner size="large" />
      </div>
    );
  }

  renderScreenGeneral(): Node {
    const { settings } = this.props;

    return (
      <PreferencesGeneral
        settings={settings}
        onChange={this.handleSettingsChange}
      />
    );
  }

  renderScreenNotifications(): Node {
    const { settings } = this.props;

    return (
      <PreferencesNotifications
        settings={settings}
        onChange={this.handleSettingsChange}
      />
    );
  }

  renderScreenSecurity(): Node {
    const { sessions } = this.props;

    if (!sessions.value) {
      return this.renderScreenSpinner();
    }

    return (
      <PreferencesSecurity
        sessions={sessions.value}
        onSessionTerminate={this.props.onSessionTerminate}
        onAllSessionsTerminate={this.props.onAllSessionsTerminate}
      />
    );
  }

  renderScreenBlocked(): Node {
    const { blocked } = this.props;

    if (!blocked.value) {
      return this.renderScreenSpinner();
    }

    return (
      <PreferencesBlocked
        blocked={blocked.value}
        onUnblockUser={this.props.onUnblockUser}
      />
    );
  }

  renderScreenCurrent = (): Node => {
    const { screen } = this.props;

    switch (screen) {
      case 'general':
        return this.renderScreenGeneral();
      case 'notifications':
        return this.renderScreenNotifications();
      case 'security':
        return this.renderScreenSecurity();
      case 'blocked':
        return this.renderScreenBlocked();
      default:
        return null;
    }
  };

  render() {
    const { screen } = this.props;
    const className = classNames(styles.container, this.props.className);
    const tabs = [
      {
        id: 'general',
        title: 'PreferencesModal.general.title',
      },
      {
        id: 'notifications',
        title: 'PreferencesModal.notifications.title',
      },
      {
        id: 'security',
        title: 'PreferencesModal.security.title',
      },
      {
        id: 'blocked',
        title: 'PreferencesModal.blocked.title',
      },
    ];

    return (
      <Modal className={className} onClose={this.props.onClose}>
        <ModalHeader withBorder>
          <Text id="PreferencesModal.title" />
          <ModalClose
            onClick={this.props.onClose}
            id="preferences_modal_close"
          />
        </ModalHeader>
        <ModalBodyTabs
          className={styles.body}
          tabs={tabs}
          current={screen}
          onChange={this.props.onScreenChange}
        >
          <div className={styles.scroller}>
            <Scroller>{this.renderScreenCurrent()}</Scroller>
          </div>
        </ModalBodyTabs>
      </Modal>
    );
  }
}

export default PreferencesModal;
