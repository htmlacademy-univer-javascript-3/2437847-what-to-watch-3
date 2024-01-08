import { describe, expect } from 'vitest';
import { Tab } from './tab.tsx';
import { Tabs } from './tabs.tsx';
import { act, render } from '@testing-library/react';

describe('Tabs', () => {
  const firstTab = <Tab name="First Tab" content={<div>1</div>} />;
  const secondTab = <Tab name="Second Tab" content={<div>2</div>} />;
  const thirdTab = <Tab name="Third Tab" content={<div>3</div>} />;

  it('should render first tab by default', () => {
    const { getByText, queryByText } = render(
      <Tabs>{[firstTab, secondTab, thirdTab]}</Tabs>,
    );
    expect(getByText('1')).toBeInTheDocument();
    expect(queryByText('2')).toBeNull();
    expect(queryByText('3')).toBeNull();
  });

  it('should render second tab after click', () => {
    const { getByText, queryByText } = render(
      <Tabs>{[firstTab, secondTab, thirdTab]}</Tabs>,
    );
    act(() => {
      getByText('Second Tab').click();
    });
    expect(queryByText('1')).toBeNull();
    expect(getByText('2')).toBeInTheDocument();
    expect(queryByText('3')).toBeNull();
  });

  it('should render third tab after click', () => {
    const { getByText, queryByText } = render(
      <Tabs>{[firstTab, secondTab, thirdTab]}</Tabs>,
    );
    act(() => {
      getByText('Third Tab').click();
    });
    expect(queryByText('1')).toBeNull();
    expect(queryByText('2')).toBeNull();
    expect(getByText('3')).toBeInTheDocument();
  });
});
