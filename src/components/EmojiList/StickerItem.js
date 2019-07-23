/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Sticker as StickerType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import Sticker from '../MessageContent/Sticker/Sticker';
import styles from './EmojiList.css';

export type Props = {
  sticker: StickerType,
  onClick: (sticker: StickerType) => mixed,
};

class StickerItem extends PureComponent<Props> {
  handleClick = (): void => {
    this.props.onClick(this.props.sticker);
  };

  render() {
    const { sticker } = this.props;

    return (
      <div className={styles.sticker}>
        <Sticker
          emoji={sticker.emoji}
          image={sticker.image}
          width={100}
          height={100}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default StickerItem;
