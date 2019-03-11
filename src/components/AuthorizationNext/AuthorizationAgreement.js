/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';

export type AuthorizationAgreementProps = {
  className?: string,
};

export function AuthorizationAgreement({
  className,
}: AuthorizationAgreementProps) {
  return (
    <Text
      tagName="div"
      className={className}
      id="AuthorizationNext.agreement"
      html
    />
  );
}
