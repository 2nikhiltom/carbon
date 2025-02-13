/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import StructuredListSkeleton from '../StructuredList.Skeleton';
import { render } from '@testing-library/react';

describe('StructuredListSkeleton', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<StructuredListSkeleton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread additional props on the outermost element', () => {
    const { container } = render(<StructuredListSkeleton data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
