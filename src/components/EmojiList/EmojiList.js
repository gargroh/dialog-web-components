/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { StickerPack, Sticker } from '@dlghq/dialog-types';
import type { EmojiCategory as EmojiCategoryType } from './utils/categories';
import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import { listen } from '@dlghq/dialog-utils';
import classNames from 'classnames';
import {
  calculateStickerCategoryHeight,
  calculateEmojiCategoryWidth,
  calculateStickerCategoryWidth,
} from './utils/calculator';
import { createEmojiCategories } from './utils/categories';
import EmojiTab from './EmojiTab';
import EmojiCategory from './EmojiCategory';
import StickerTab from './StickerTab';
import StickerCategory from './StickerCategory';
import { handleScroll, scrollToCategory } from './utils/runtime';
import styles from './EmojiList.css';

type Screen = 'emoji' | 'stickers';

type SrollTopType = {
  [Screen]: number,
};

export type Props = {
  className?: string,
  recent?: string[],
  stickers?: StickerPack[],
  onClick: (char: string) => mixed,
  onStickerClick: (sticker: Sticker) => mixed,
  scrollTop: ?SrollTopType,
  onScroll: ?(screen: Screen, scrollTop: number) => mixed,
  screen: ?Screen,
  onScreenChange: ?(screen: Screen) => mixed,
};

export type State = {
  current: string,
  screen: Screen,
  isAtBottom: boolean,
};

class EmojiList extends PureComponent<Props, State> {
  container: ?HTMLElement;
  height: number;
  categories: Array<EmojiCategoryType>;
  listener: ?{
    remove: () => void,
  };

  constructor(props: Props) {
    super(props);
    const { height, categories } = createEmojiCategories(props.recent);

    this.state = {
      screen: props.screen || 'emoji',
      current: categories[0].name,
      isAtBottom: false,
    };

    this.height = height;
    this.categories = categories;
  }

  componentDidMount(): void {
    if (this.container) {
      this.listener = listen(this.container, 'scroll', this.handleScroll, {
        passive: true,
      });

      this.scrollToFromProps(this.state.screen);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { height, categories } = createEmojiCategories(nextProps.recent);
    this.height = height;
    this.categories = categories;
  }

  componentWillUnmount(): void {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
  }

  handleToggleScreen = (event: SyntheticMouseEvent<>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.scrollTo(0);

    const nextScreen = this.getNextScreen();

    if (this.props.onScreenChange) {
      this.props.onScreenChange(nextScreen);
    }

    switch (nextScreen) {
      case 'emoji': {
        this.toggleScreen(nextScreen, this.categories[0].name);

        break;
      }

      case 'stickers': {
        const { stickers } = this.props;

        if (stickers && stickers.length) {
          this.toggleScreen(nextScreen, String(stickers[0].id));
        }

        break;
      }

      default:
        break;
    }
  };

  handleTabClick = (next: string): void => {
    this.setState({ current: next });

    switch (this.state.screen) {
      case 'emoji': {
        const scrollTo = scrollToCategory(
          this.categories,
          next,
          (category) => category.name,
          (category) => category.height,
        );

        if (scrollTo !== -1) {
          this.scrollTo(scrollTo);
        }

        break;
      }

      case 'stickers': {
        if (this.props.stickers) {
          const scrollTo = scrollToCategory(
            this.props.stickers,
            next,
            (pack) => String(pack.id),
            (pack) => calculateStickerCategoryHeight(pack.stickers.length),
          );

          if (scrollTo !== -1) {
            this.scrollTo(scrollTo);
          }
        }

        break;
      }

      default:
        break;
    }
  };

  handleScroll = ({ target }: $FlowIssue): void => {
    const { scrollTop } = target;

    if (this.props.onScroll) {
      this.props.onScroll(this.state.screen, scrollTop);
    }

    switch (this.state.screen) {
      case 'emoji': {
        const nextState = handleScroll(
          scrollTop,
          this.categories,
          (category) => category.name,
          (category) => category.height,
        );
        if (nextState) {
          this.setState(nextState);
        }

        break;
      }

      case 'stickers': {
        if (this.props.stickers) {
          const nextState = handleScroll(
            scrollTop,
            this.props.stickers,
            (pack) => String(pack.id),
            (pack) => calculateStickerCategoryHeight(pack.stickers.length),
          );
          if (nextState) {
            this.setState(nextState);
          }
        }

        break;
      }

      default:
        break;
    }
  };

  getNextScreen(): Screen {
    return this.state.screen === 'emoji' ? 'stickers' : 'emoji';
  }

  setContainer = (container: ?HTMLElement): void => {
    this.container = container;
  };

  scrollTo(scrollTo: number) {
    if (this.container) {
      this.container.scrollTop = scrollTo;
    }
  }

  scrollToFromProps(screen: Screen) {
    if (
      this.container &&
      this.props.scrollTop &&
      this.props.scrollTop[screen]
    ) {
      this.container.scrollTop = this.props.scrollTop[screen];
    }
  }

  toggleScreen(screen: Screen, current: string) {
    this.setState({ screen, current }, () => {
      this.scrollToFromProps(screen);
    });
  }

  renderCategories(): ?Array<Node> {
    const { current } = this.state;

    switch (this.state.screen) {
      case 'emoji':
        return this.categories.map((category: EmojiCategoryType, idx) => {
          const isActive = current === category.name;
          const isVisible =
            isActive ||
            (idx > 0 && current === this.categories[idx - 1].name) ||
            (idx + 1 < this.categories.length &&
              current === this.categories[idx + 1].name);

          return (
            <EmojiCategory
              key={category.name}
              name={category.name}
              chars={category.chars}
              height={category.height}
              width={calculateEmojiCategoryWidth()}
              isActive={isActive}
              isVisible={isVisible}
              isAtBottom={this.state.isAtBottom}
              onClick={this.props.onClick}
            />
          );
        });

      case 'stickers': {
        const { stickers } = this.props;

        if (stickers) {
          return stickers.map((pack, idx) => {
            const isActive = current === String(pack.id);
            const isVisible =
              isActive ||
              (idx > 0 && current === String(stickers[idx - 1].id)) ||
              (idx + 1 < stickers.length &&
                current === String(stickers[idx + 1].id));

            return (
              <StickerCategory
                key={pack.id}
                pack={pack}
                height={calculateStickerCategoryHeight(pack.stickers.length)}
                width={calculateStickerCategoryWidth()}
                isActive={isActive}
                isVisible={isVisible}
                isAtBottom={this.state.isAtBottom}
                onClick={this.props.onStickerClick}
              />
            );
          });
        }

        return null;
      }

      default:
        return null;
    }
  }

  renderTabs() {
    switch (this.state.screen) {
      case 'emoji': {
        const children = this.categories.map((category) => {
          return (
            <EmojiTab
              key={category.name}
              name={category.name}
              glyph={category.glyph}
              active={this.state.current === category.name}
              onClick={this.handleTabClick}
            />
          );
        });

        return <footer className={styles.footer}>{children}</footer>;
      }

      case 'stickers': {
        if (this.props.stickers) {
          const children = this.props.stickers.map((pack) => {
            return (
              <StickerTab
                key={pack.id}
                pack={pack}
                active={this.state.current === String(pack.id)}
                onClick={this.handleTabClick}
              />
            );
          });

          return (
            <footer
              className={classNames(styles.footer, styles.footerStickers)}
              style={{ width: calculateStickerCategoryWidth() }}
            >
              {children}
            </footer>
          );
        }

        return null;
      }

      default:
        return null;
    }
  }

  renderGoToButton() {
    const { stickers } = this.props;
    if (!stickers || !stickers.length) {
      return null;
    }

    return (
      <Text
        id={`EmojiList.screen.${this.getNextScreen()}`}
        tagName="button"
        className={styles.goToButton}
        onClick={this.handleToggleScreen}
      />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <section className={className}>
        {this.renderGoToButton()}
        <div className={styles.body} ref={this.setContainer}>
          {this.renderCategories()}
        </div>
        {this.renderTabs()}
      </section>
    );
  }
}

export default EmojiList;
