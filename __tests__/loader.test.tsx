import { render } from '@testing-library/react';
import Loader from '../components/layout/Loader';

describe('Loader', () => {
  it('renders 8 skeleton cards', () => {
    const { container } = render(<Loader />);
    const skeletons = container.querySelectorAll('.relative.aspect-video');
    expect(skeletons.length).toBe(8);
  });
});
