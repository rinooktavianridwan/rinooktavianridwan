export function isEmojiIcon(value?: string): boolean {
  if (!value) return false;
  return value.length <= 2 && /\p{Emoji}/u.test(value);
}