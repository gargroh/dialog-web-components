/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

export function deprecation(componentName: string): void {
  console.warn(
    `[DeprecationWarning] ${componentName} component marked as deprecated, and will be removed from library soon.`,
  );
}
