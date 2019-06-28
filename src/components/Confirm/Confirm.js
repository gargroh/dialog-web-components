/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import modalStyles from '../Modal/Modal.css';
import styles from './Confirm.css';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Button from '../Button/Button';
import HotKeys from '../HotKeys/HotKeys';
import CheckButton from '../CheckButton/CheckButton';

export type Props = {
  message: string,
  submit: string,
  cancel: string,
  hasCheckbox: boolean,
  checkboxMessage: string,
  theme: ColorTheme,
  action: mixed,
  onSubmit: (action: mixed, checked: boolean) => void,
  onClose: () => mixed,
};
type State = {
  checked: boolean,
};

class Confirm extends PureComponent<Props, State> {
  static defaultProps = {
    theme: 'default',
    hasCheckbox: false,
    checkboxMessage: '',
  };

  state = {
    checked: true,
  };

  handleSuccess = (): void => {
    this.props.onSubmit(this.props.action, this.state.checked);
  };

  handleCancel = (): void => {
    this.props.onClose();
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    switch (hotkey) {
      case 'Enter':
        this.handleSuccess();
        break;
      case 'Escape':
        this.handleCancel();
        break;
      default:
      // do nothing
    }
  };

  handleCheck = (): void => {
    this.setState(({ checked }) => ({
      checked: !checked,
    }));
  };

  render() {
    const className = classNames(modalStyles.container, styles.container);
    const { checkboxMessage, hasCheckbox } = this.props;

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal isOpen className={className} overlayClassName={styles.overlay}>
          <div className={modalStyles.wrapper}>
            <ModalBody className={styles.body}>
              <Text
                id={this.props.message}
                tagName="h3"
                className={styles.message}
              />
              {hasCheckbox && (
                <div className={styles.checkboxWrapper}>
                  <CheckButton
                    size={16}
                    onClick={this.handleCheck}
                    checked={this.state.checked}
                  />
                  {checkboxMessage && (
                    <div className={styles.checkboxText}>
                      <Text id={checkboxMessage} />
                    </div>
                  )}
                </div>
              )}
            </ModalBody>
            <ModalFooter className={styles.footer}>
              <Button
                theme="primary"
                size="small"
                className={styles.button}
                view="outline"
                onClick={this.handleCancel}
                id="confirm_cancel_button"
              >
                <Text id={this.props.cancel} />
              </Button>
              <Button
                className={styles.button}
                view="outline"
                size="small"
                theme={this.props.theme}
                onClick={this.handleSuccess}
                id="confirm_success_button"
              >
                <Text id={this.props.submit} />
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </HotKeys>
    );
  }
}

export default Confirm;
