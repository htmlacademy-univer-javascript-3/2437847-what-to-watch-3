import { TabProps } from './Tab.tsx';
import { ReactElement, useState } from 'react';
import classNames from 'classnames';

type TabsProps = {
  children: ReactElement<TabProps>[];
};

export const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(children[0]);
  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {children.map((tab) => (
            <li
              key={tab.props.name}
              className={classNames({
                'film-nav__item': true,
                'film-nav__item--active':
                  activeTab.props.name === tab.props.name,
              })}
            >
              <button
                style={{ background: 'transparent', border: 'none' }}
                className="film-nav__link"
                onClick={() => {
                  setActiveTab(tab);
                }}
              >
                {tab.props.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab}
    </>
  );
};
