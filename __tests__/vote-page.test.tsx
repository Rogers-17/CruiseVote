import { render, screen } from '@testing-library/react';
import VotePollSelection from '../app/home/vote/page';

describe('VotePollSelection', () => {
  it('shows loading state', () => {
    jest
      .spyOn(require('../context/AppContext'), 'useApp')
      .mockReturnValue({ allPolls: [], loading: true });
    render(<VotePollSelection />);
    expect(screen.getByText(/LOADING STARZ CONTESTS/i)).toBeInTheDocument();
  });
});
