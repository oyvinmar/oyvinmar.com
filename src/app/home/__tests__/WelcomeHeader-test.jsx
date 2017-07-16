import React from 'react';
import WelcomeHeader from '../WelcomeHeader';
import renderer from 'react-test-renderer';

test('Welcome header renders correctly', () => {
  const tree = renderer.create(
    <WelcomeHeader/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});