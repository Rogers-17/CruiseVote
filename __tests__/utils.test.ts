import { formatRelativeDate, formatViews } from '../utils/utils';

describe('formatRelativeDate', () => {
  it('returns just now for recent dates', () => {
    const now = new Date().toISOString();
    expect(formatRelativeDate(now)).toBe('just now');
  });
});

describe('formatViews', () => {
  it('formats millions', () => {
    expect(formatViews(2000000)).toBe('2M');
  });
  it('formats thousands', () => {
    expect(formatViews(1500)).toBe('1.5K');
  });
  it('formats less than thousand', () => {
    expect(formatViews(999)).toBe('999');
  });
});
