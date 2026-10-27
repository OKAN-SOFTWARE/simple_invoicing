import { describe, expect, test, vi } from 'vitest';
import { copyToClipboard } from './copyToClipboard';

describe('copyToClipboard', () => {
  test('copies the exact invoice number without trimming or changing punctuation', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    await expect(copyToClipboard(' INV-0042 / A ', { writeText })).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledExactlyOnceWith(' INV-0042 / A ');
  });

  test('reports permission rejection without throwing', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('NotAllowedError'));

    await expect(copyToClipboard('INV-0042', { writeText })).resolves.toBe(false);
  });

  test('reports unavailable clipboard support without throwing', async () => {
    await expect(copyToClipboard('INV-0042', undefined)).resolves.toBe(false);
  });
});
