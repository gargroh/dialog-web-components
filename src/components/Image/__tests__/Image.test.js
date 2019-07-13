/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 */

import React from 'react';
import { render } from '@testing-library/react';
import Image from '../Image';

describe('Image', () => {
  it('should render sized div in case src is null', () => {
    const { container } = render(
      <Image src={null} width={50} height={50} maxWidth={50} maxHeight={50} />,
    );

    expect(container).not.toBeEmpty();
    expect(container.firstChild).toBeVisible();
    expect(container.firstChild).toHaveStyle('width: 50px; height: 50px;');
  });
});
