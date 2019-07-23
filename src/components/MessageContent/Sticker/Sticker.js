/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Image from '../../Image/Image';
import Lottie from 'react-lottie';

export type Props = {
  className?: string,
  emoji: ?string,
  image: ?string,
  width: number,
  height: number,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

type ActualState = { type: 'loading' } | { type: 'image', src: string } | { type: 'lottie', options: Object };

type State = {
  state: ActualState
};

class Sticker extends PureComponent<Props, State> {
  isUnmounted: boolean;

  constructor(props: Props) {
    super(props);

    this.state = { state: { type: 'loading' } };
    this.isUnmounted = false;

    this.startLoading(props.image);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.image !== prevProps.image) {
      this.startLoading(this.props.image);
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  startLoading(src: ?string) {
    if (!src) {
      if (!this.isUnmounted) {
        this.setState({ state: { type: 'loading' } });
      }

      return;
    }

    fetch(src)
      .then((res) => res.text())
      .then((value) => {
        const lottiePrefix = '__lottie__=';
        const lottieIndex = value.indexOf(lottiePrefix);
        if (lottieIndex > 0) {
          const base64 = value.slice(lottieIndex + lottiePrefix.length).trim();

          return fetch(`data:application/json;base64,${base64}`)
            .then((res) => res.json());
        }

        return Promise.reject(new Error('sticker is not lottie'));
      })
      .then((animationData) => {
        return {
          type: 'lottie',
          options: {
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }
        };
      })
      .catch(() => {
        return { type: 'image', src };
      })
      .then((state) => {
        if (!this.isUnmounted) {
          this.setState({ state });
        }
      });
  }

  render() {
    const { state } = this.state;
    switch (state.type) {
      case 'loading':
        return (
          <Image
            className={this.props.className}
            src={null}
            alt={this.props.emoji}
            width={this.props.width}
            height={this.props.height}
            maxWidth={128}
            maxHeight={128}
            onClick={this.props.onClick}
          />
        );

      case 'image':
        return (
          <Image
            className={this.props.className}
            src={this.props.image}
            alt={this.props.emoji}
            width={this.props.width}
            height={this.props.height}
            maxWidth={128}
            maxHeight={128}
            onClick={this.props.onClick}
          />
        );

      case 'lottie':
        return (
          <div className={this.props.className} style={{ width: 128, height: 128 }}>
            <Lottie
              options={state.options}
              height={128}
              width={128}
            />
          </div>
        );

      default:
        return null;
    }
  }
}

export default Sticker;
