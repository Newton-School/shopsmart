import { renderHook } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { usePageTitle } from './usePageTitle';

describe('usePageTitle', () => {
  const original = document.title;
  afterEach(() => {
    document.title = original;
  });

  it('sets title to "Suffix · Shopsmart" when suffix is provided', () => {
    renderHook(() => usePageTitle('Cart'));
    expect(document.title).toBe('Cart · Shopsmart');
  });

  it('sets title to "Shopsmart" when no suffix', () => {
    renderHook(() => usePageTitle());
    expect(document.title).toBe('Shopsmart');
  });

  it('sets title to "Shopsmart" for empty string suffix', () => {
    renderHook(() => usePageTitle(''));
    expect(document.title).toBe('Shopsmart');
  });

  it('restores the previous title on unmount', () => {
    document.title = 'Previous';
    const { unmount } = renderHook(() => usePageTitle('Cart'));
    expect(document.title).toBe('Cart · Shopsmart');
    unmount();
    expect(document.title).toBe('Previous');
  });

  it('updates title when suffix changes', () => {
    const { rerender } = renderHook(({ s }) => usePageTitle(s), {
      initialProps: { s: 'Cart' },
    });
    expect(document.title).toBe('Cart · Shopsmart');
    rerender({ s: 'Orders' });
    expect(document.title).toBe('Orders · Shopsmart');
  });
});
