/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import Spinner from '../Spinner/Spinner';
import styles from './SidebarFooter.css';

export type Props = {
  className?: string,
  id: string,
  title: string,
  glyph: string,
  counter?: number,
  active: boolean,
  pending: boolean,
  onPick: (id: string) => mixed,
};

class SidebarFooterButton extends PureComponent<Props> {
  handleClick = (): void => {
    const { active, id } = this.props;

    if (!active) {
      this.props.onPick(id);
    }
  };

  renderIcon() {
    const { glyph, pending } = this.props;

    if (pending) {
      return (
        <div style={{ width: 28, height: 28 }}>
          <Spinner size="normal" />
        </div>
      );
    }

    return <Icon glyph={glyph} className={styles.icon} size={28} />;
  }

  renderCounter() {
    const { counter, pending } = this.props;

    if (!counter || pending) {
      return null;
    }

    const isBig = counter > 99;
    const counterClassName = classNames(
      styles.counter,
      isBig ? styles.counterBig : null,
    );

    return <div className={counterClassName}>{isBig ? '99+' : counter}</div>;
  }

  render() {
    const { active, title, id } = this.props;
    const className = classNames(
      styles.button,
      {
        [styles.active]: active,
      },
      this.props.className,
    );

    return (
      <Tooltip text={title} key={id} className={styles.tooltip}>
        <div
          className={className}
          onClick={this.handleClick}
          id={`sidebar_footer_${id}_button`}
        >
          <div className={styles.wrapper}>
            {this.renderIcon()}
            {this.renderCounter()}
          </div>
        </div>
      </Tooltip>
    );
  }
}

export default SidebarFooterButton;
