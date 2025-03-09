/**
 * Format a date string or ISO date to a localized date format
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Format the date to a localized string (Vietnamese)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Truncate a string to a maximum length and add ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length (default: 100)
 * @returns Truncated text string
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generate a slug from a string (for URL friendly identifiers)
 * @param text - The text to slugify
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // split an accented letter into the letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, '') // remove all non-word chars
    .replace(/--+/g, '-'); // replace multiple - with single -
}

/**
 * Get a random item from an array
 * @param array - The array to pick from
 * @returns Random item from the array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
} 