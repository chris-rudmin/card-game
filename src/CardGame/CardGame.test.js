import { render } from '@testing-library/react';
import CardGame from './CardGame';

test('should render', () => {
  const { asFragment } = render(<CardGame />);
  expect(asFragment()).toMatchSnapshot();
});
