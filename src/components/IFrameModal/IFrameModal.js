/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import Button from '../Button/Button';
import styles from './IFrameModal.css';

type Props = {
  url: string,
  onAccept: () => void,
  onReject: () => void,
  className?: string,
};

class IFrameModal extends PureComponent<Props> {
  handleAccept = () => {
    this.props.onAccept();
  };

  handleReject = () => {
    this.props.onReject();
  };

  render() {
    const { url } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal shouldCloseOnOverlayClick={false} className={className}>
        <ModalBody className={styles.body}>
          <iframe className={styles.content} src={url} />
        </ModalBody>
        <div className={styles.footer}>
          <Button
            className={styles.button}
            theme="warning"
            onClick={this.handleReject}
          >
            <Text id="IFrameModal.reject" />
          </Button>
          <Button
            className={styles.button}
            theme="success"
            onClick={this.handleAccept}
          >
            <Text id="IFrameModal.accept" />
          </Button>
        </div>
      </Modal>
    );
  }
}

export default IFrameModal;
