import { render } from '@testing-library/react';
import React from 'react';

import Index from '../pages/index';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeInstanceOf(HTMLElement);
    expect(baseElement).toMatchSnapshot();
  });
});
