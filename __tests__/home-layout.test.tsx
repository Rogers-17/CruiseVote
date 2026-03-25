import { render, screen } from '@testing-library/react';
import HomeLayout from '../app/home/layout';

describe('HomeLayout', () => {
  it('renders children and layout', () => {
    render(
      <HomeLayout>
        <div>child</div>
      </HomeLayout>,
    );
    expect(screen.getByText('child')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
