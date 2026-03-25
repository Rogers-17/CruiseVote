import { render, screen } from '@testing-library/react';
import { Spinner } from '../components/ui/spinner';

describe('Spinner', () => {
  it('renders the spinner icon', () => {
    render(<Spinner />);
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
  });
});
