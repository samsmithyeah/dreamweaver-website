/**
 * Format a date object or Firebase Timestamp to a localized string
 */
export function formatDate(
  date: Date | { seconds: number; nanoseconds: number }
): string | null {
  try {
    let d: Date;
    if (date instanceof Date) {
      d = date;
    } else if (date && typeof date === 'object' && 'seconds' in date) {
      d = new Date(date.seconds * 1000);
    } else {
      return null;
    }

    if (isNaN(d.getTime())) {
      return null;
    }

    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Failed to format date:', error);
    return null;
  }
}
