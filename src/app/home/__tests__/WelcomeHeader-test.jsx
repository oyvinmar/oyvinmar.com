import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeHeader from '../WelcomeHeader';

test('Welcome header renders correctly', () => {
  const tree = renderer.create(<WelcomeHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
