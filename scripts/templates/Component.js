/**
 * Copyright <%= new Date().getFullYear() -%> dialog LLC <info@dlg.im>
 * @flow strict
 */

<% if (functional) { -%>
import React, { type Node } from 'react';
<% } else { -%>
import React, { PureComponent, type Node } from 'react';
<% } -%>
<% if (styles) { -%>
import classNames from 'classnames';

import styles from './<%= name %>.css';
<% } -%>

export type <%= name %>Props = {
<% if (styles) { -%>
  className?: string,
<% } -%>
  children?: Node
};

<% if (functional) { -%>
export function <%= name %>(props: <%= name %>Props) {
  <% if (styles) { -%>
  const classes = classNames(styles.container, this.props.className);

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
  <% } else { -%>
  return (
    <div>
      {props.children}
    </div>
  );
  <% } -%>
}
<% } else { -%>
export class <%= name %> extends PureComponent<<%= name %>Props> {
  render() {
    <% if (styles) { -%>
    const classes = classNames(styles.container, this.props.className);

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
    <% } else { -%>
    return (
      <div>
        {this.props.children}
      </div>
    );
    <% } -%>
  }
}
<% } -%>
