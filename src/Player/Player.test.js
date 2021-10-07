import { render } from '@testing-library/react';
import Player from './Player';

test('should render', () => {
  const { asFragment } = render(<Player />);
  expect(asFragment()).toMatchSnapshot();
});
