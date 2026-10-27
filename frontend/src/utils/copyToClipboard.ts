/**
 * Write text to the async clipboard without throwing in unsupported or denied
 * browser contexts. The caller owns user-facing feedback.
 */
export async function copyToClipboard(
  text: string,
  clipboard: Pick<Clipboard, 'writeText'> | undefined,
): Promise<boolean> {
  if (!clipboard?.writeText) return false;

  try {
    await clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
