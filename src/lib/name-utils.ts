/**
 * Formats a list of names into a grammatically correct string.
 * Examples:
 * - [] => ''
 * - ['Alice'] => 'Alice'
 * - ['Alice', 'Bob'] => 'Alice and Bob'
 * - ['Alice', 'Bob', 'Charlie'] => 'Alice, Bob, and Charlie'
 */
export function formatNamesList(names: string[]): string {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

/**
 * Extracts the first name from a full name.
 * Example: 'John Smith' => 'John'
 */
export function getFirstName(displayName: string): string {
  return displayName.split(' ')[0];
}

/**
 * Formats creator and children names into a single string.
 * Includes the creator's first name followed by all children names.
 */
export function formatCreatorAndChildren(
  creatorDisplayName?: string,
  audienceChildren?: string[]
): string {
  if (!creatorDisplayName) return '';
  const names = [getFirstName(creatorDisplayName)];
  if (audienceChildren && audienceChildren.length > 0) {
    names.push(...audienceChildren);
  }
  return formatNamesList(names);
}
