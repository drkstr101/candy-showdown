import { render } from '@testing-library/react';

import UiProvider from '@components/organisms/ui-provider';
import Index from '../pages/index';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <UiProvider principal={null} participants={[]} rounds={[]} user={null}>
        <Index />
      </UiProvider>
    );
    expect(baseElement).toBeInstanceOf(HTMLElement);
    expect(baseElement).toMatchSnapshot();
  });
});
