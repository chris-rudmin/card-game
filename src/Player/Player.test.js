import { render } from '@testing-library/react';
import Player from './Player';

test('should render', () => {
  const { asFragment } = render(<Player playerNumber={1} playerHealth={100} playerDraw='🂡'/>);
  expect(asFragment()).toMatchSnapshot();
});
