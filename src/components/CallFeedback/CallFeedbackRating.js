/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';

import CallFeedbackRatingStar from './CallFeedbackRatingStar';
import styles from './CallFeedback.css';

type Props = {
  id: string,
  value: number,
  maxRating: number,
  onChange: (value: number) => mixed,
  labels: string[],
  hintId?: string,
};

class CallFeedbackRating extends PureComponent<Props> {
  static defaultProps = {
    labels: [],
  };

  renderStars() {
    const { maxRating, value, id, labels } = this.props;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const starLabel =
        Array.isArray(labels) && labels[i - 1] ? labels[i - 1] : '';
      stars.push(
        <CallFeedbackRatingStar
          key={`${id}_star_${i}`}
          value={i}
          active={i <= value}
          label={starLabel}
          onChange={this.props.onChange}
        />,
      );
    }

    return stars;
  }

  render() {
    const { hintId } = this.props;

    return (
      <div className={styles.rating}>
        {this.renderStars()}
        {hintId && (
          <div className={styles.messageHint}>
            <Text id={hintId} />
          </div>
        )}
      </div>
    );
  }
}

export default CallFeedbackRating;
