/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalClose from '../Modal/ModalClose';
import InputNext from '../InputNext/InputNext';
import Switcher from '../Switcher/Switcher';
import Button from '../Button/Button';
import styles from './FeedbackModal.css';
import HotKeys from '../HotKeys/HotKeys';

type Feedback = {
  text: string,
  addLogs: boolean,
};

type Props = {
  id: string,
  className?: string,
  onSubmit: (feedback: Feedback) => mixed,
  onClose: () => mixed,
  onSaveLogs?: () => mixed,
  feedbackRequired: boolean,
  minimumFeedbackLength: number,
};

type State = Feedback;

class FeedbackModal extends PureComponent<Props, State> {
  static defaultProps = {
    id: 'feedback_modal',
    feedbackRequired: true,
    minimumFeedbackLength: 5,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      text: '',
      addLogs: true,
    };
  }

  handleSubmit = (event: ?SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }

    this.props.onSubmit(this.state);
  };

  handleFeedbackChange = (text: string): void => {
    this.setState({ text });
  };

  handleAddLogsToggle = (addLogs: boolean): void => {
    this.setState({ addLogs });
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit();
    }
  };

  validateTextLength = () => {
    return (
      !this.props.feedbackRequired ||
      (this.state.text &&
        this.state.text.length >= this.props.minimumFeedbackLength)
    );
  };

  renderSaveLogs = () => {
    const { onSaveLogs } = this.props;
    if (!onSaveLogs) {
      return null;
    }

    return (
      <span className={styles.saveLogs}>
        <Text
          tagName="div"
          onClick={onSaveLogs}
          className={styles.saveLogsLink}
          id="FeedbackModal.save_logs"
        />
      </span>
    );
  };

  render() {
    const className = classNames(styles.container, this.props.className);
    const { id, onClose } = this.props;
    const { text, addLogs } = this.state;

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={onClose}>
          <form id={id} autoComplete="off" onSubmit={this.handleSubmit}>
            <ModalHeader withBorder>
              <Text id="FeedbackModal.title" />
              <ModalClose onClick={onClose} id={id + '_close_button'} />
            </ModalHeader>
            <ModalBody className={styles.body}>
              <InputNext
                htmlAutoFocus
                id={id + '_text'}
                type="textarea"
                spellcheck
                placeholder="FeedbackModal.label"
                inputClassName={styles.text}
                value={text}
                onChange={this.handleFeedbackChange}
              />
              <div className={styles.logsWrapper}>
                <Switcher
                  id={id + '_add_logs'}
                  name="addLogs"
                  value={addLogs}
                  onChange={this.handleAddLogsToggle}
                  label="FeedbackModal.add_logs"
                />
                {this.renderSaveLogs()}
              </div>
            </ModalBody>
            <ModalFooter className={styles.footer}>
              <Button
                wide
                id={`${id}_submit_button`}
                type="submit"
                theme="success"
                rounded={false}
                disabled={!this.validateTextLength()}
              >
                <Text id="FeedbackModal.submit" />
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </HotKeys>
    );
  }
}

export default FeedbackModal;
