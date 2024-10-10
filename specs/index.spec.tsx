import { render } from '@testing-library/react';

import UiProvider from '@components/ui-provider';
import Index from '../pages/index';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UiProvider>
        <Index />
      </UiProvider>
    );
    expect(baseElement).toBeInstanceOf(HTMLElement);
    expect(baseElement).toMatchSnapshot();
  });
});
