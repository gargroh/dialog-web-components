/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import classNames from 'classnames';

import getImageSize from '../../utils/getImageSize';
import ImagePreloader, {
  STATE_SUCCESS,
} from '../ImagePreloader/ImagePreloader';
import styles from './Image.css';

export type ImageProps = {
  className?: string,
  src: ?string,
  id?: string,
  alt?: ?string,
  preview?: ?string,
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

function Image(props: ImageProps) {
  return (
    <ImagePreloader src={props.src}>
      {({ state, src }) => {
        const { width, height } = getImageSize(
          props.width,
          props.height,
          props.maxWidth,
          props.maxHeight,
        );
        const className = classNames(
          styles.container,
          {
            [styles.loaded]: state === STATE_SUCCESS,
          },
          props.className,
        );
        const source = state === STATE_SUCCESS ? src : props.preview;

        if (!source) {
          return null;
        }

        return (
          <div
            className={className}
            title={props.alt}
            style={{ width, height }}
          >
            <img
              id={props.id}
              src={source}
              width={width}
              height={height}
              alt={props.alt}
              onClick={props.onClick}
              className={styles.image}
            />
          </div>
        );
      }}
    </ImagePreloader>
  );
}

Image.defaultProps = {
  maxWidth: 400,
  maxHeight: 400,
};

export default Image;
