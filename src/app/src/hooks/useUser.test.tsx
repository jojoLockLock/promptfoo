import { describe, it, expect, vi } from 'vitest';
import { useUser } from './useUser';
import { UserContext } from '@app/contexts/UserContextDef';
import { renderHook } from '@testing-library/react';

describe('useUser', () => {
  it('should throw error when used outside UserProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useUser());
    }).toThrow('useUser must be used within a UserProvider');
  });

  it('should return context when used within UserProvider', () => {
    const mockContext = {
      user: {
        id: '123',
        name: 'Test User'
      },
      setUser: vi.fn()
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserContext.Provider value={mockContext}>
        {children}
      </UserContext.Provider>
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current).toBe(mockContext);
  });
});
