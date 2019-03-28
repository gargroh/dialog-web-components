/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint react/jsx-handler-names: 0 */

import type { Component } from 'react';
import type { JSONValue, JSONSchema } from '@dlghq/dialog-utils';
import type { ArrayFieldTemplateProps } from './types';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import Form from 'react-jsonschema-form';
import TextWidget from './widgets/TextWidget';
import PasswordWidget from './widgets/PasswordWidget';
import TextareaWidget from './widgets/TextareaWidget';
import CheckboxWidget from './widgets/CheckboxWidget';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import styles from './CustomForm.css';

export type FormErrors = { [key: string]: Object };

export type Props = {
  className?: string,
  id: string,
  liveValidate: boolean,
  value: ?JSONValue,
  schema: JSONSchema,
  uiSchema?: ?JSONSchema,
  widgets?: { [string]: Component<*> },
  fields?: { [string]: Component<*> },
  ArrayFieldTemplate?: Component<ArrayFieldTemplateProps>,
  onChange: (
    value: JSONValue,
    formId?: string,
    errors?: Array<FormErrors>,
  ) => mixed,
  onValidate?: (value: JSONValue, errors: FormErrors) => mixed,
  onFocus?: (value: mixed) => mixed,
  onTransformErrors?: (errors: Array<FormErrors>) => mixed,
};

class CustomForm extends PureComponent<Props> {
  widgets: { [string]: Component<*> };
  fields: ?{ [string]: Component<*> };

  static defaultProps = {
    liveValidate: true,
  };

  constructor(props: Props) {
    super(props);

    this.widgets = {
      TextWidget,
      PasswordWidget,
      TextareaWidget,
      CheckboxWidget,
      ...this.props.widgets,
    };
    this.fields = this.props.fields;
  }

  handleChange = (value: {
    formData: JSONValue,
    idSchema: { $id: string },
    errors: Array<FormErrors>,
  }) => {
    this.props.onChange(value.formData, value.idSchema.$id, value.errors);
  };

  getCustomFieldTemplate = (field: { children: Node }): Node => field.children;

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Form
          liveValidate={this.props.liveValidate}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          formData={this.props.value}
          widgets={this.widgets}
          fields={this.fields}
          id={this.props.id}
          idPrefix={this.props.id}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
          ObjectFieldTemplate={ObjectFieldTemplate}
          ArrayFieldTemplate={this.props.ArrayFieldTemplate}
          FieldTemplate={this.getCustomFieldTemplate}
          showErrorList={false}
          validate={this.props.onValidate}
          transformErrors={this.props.onTransformErrors}
        >
          <span />
        </Form>
      </div>
    );
  }
}

export default CustomForm;
