/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import { getEmojiByChar, shouldUseImage } from '@dlghq/emoji';
import { isElectron } from '@dlghq/dialog-utils';
import emojiImage from '@dlghq/emoji/lib/apple.png';
import styles from './Emoji.css';

const SPRITE_SIZE = 52;
const SPRITE_BG_SIZE = SPRITE_SIZE * 100;
const SPRITE_POSITION_MUL = 100 / (SPRITE_SIZE - 1);

const SPRITE_IMAGE = `url(${emojiImage})`;

export type Props = {
  className?: string,
  char: string,
  size: number,
  children?: Node,
  inline: boolean,
};

class Emoji extends PureComponent<Props> {
  static defaultProps = {
    size: 20,
    inline: false,
  };

  render() {
    const emoji = getEmojiByChar(this.props.char);

    if (!emoji) {
      return null;
    }

    let isShouldUseImage = shouldUseImage(emoji.char);
    // TODO: remove the hack when electron updates chrome
    if (!isShouldUseImage && isElectron() && /♀️|♂️/.test(emoji.char)) {
      isShouldUseImage = true;
    }

    if (isShouldUseImage) {
      const className = classNames(styles.image, this.props.className);

      const style = {
        width: `${this.props.size}px`,
        height: `${this.props.size}px`,
        backgroundImage: SPRITE_IMAGE,
        backgroundPosition: `${SPRITE_POSITION_MUL *
          emoji.x}% ${SPRITE_POSITION_MUL * emoji.y}%`,
        backgroundSize: `${SPRITE_BG_SIZE}%`,
        verticalAlign: this.props.inline ? 'middle' : 'sub',
      };

      return (
        <span className={className} style={style} title={emoji.name}>
          {this.props.children || emoji.char}
        </span>
      );
    }

    const className = classNames(styles.char, this.props.className);
    const charStyle = this.props.inline
      ? {}
      : {
          fontSize: this.props.size,
          lineHeight: '1.2em',
          display: 'inline-block',
          marginBottom: '-0.2em',
        };

    return (
      <span className={className} title={emoji.name} style={charStyle}>
        {emoji.char}
      </span>
    );
  }
}

export default Emoji;
