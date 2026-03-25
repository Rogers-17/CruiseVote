import { render, screen } from '@testing-library/react';
import Polls from '../app/home/polls/page';
import { AppProvider } from '../context/AppContext';

describe('Polls page', () => {
  it('renders loading state', () => {
    // Mock useApp to return loading
    jest
      .spyOn(require('../context/AppContext'), 'useApp')
      .mockReturnValue({ allPolls: [], loading: true });
    render(<Polls />);
    expect(screen.getByText('Loading Polls...')).toBeInTheDocument();
  });
});
