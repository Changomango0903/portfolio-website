import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge for optimal Tailwind CSS class handling
 * Removes duplicate classes and handles conditional classes
 * 
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * cn('px-2 py-1', 'px-4', { 'bg-red-500': true }) // returns 'py-1 px-4 bg-red-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string into a human-readable format
 * 
 * @param date - Date string or Date object
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 * 
 * @example
 * formatDate('2024-01-15') // returns 'January 15, 2024'
 * formatDate(new Date(), { month: 'short' }) // returns 'Jan 15, 2024'
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

/**
 * Converts a string to a URL-friendly slug
 * Removes special characters, converts to lowercase, and replaces spaces with hyphens
 * 
 * @param str - String to convert to slug
 * @returns URL-safe slug string
 * 
 * @example
 * slugify('Neural Style Transfer!') // returns 'neural-style-transfer'
 * slugify('Getting Started with PyTorch') // returns 'getting-started-with-pytorch'
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Calculates estimated reading time for a given text
 * Based on average reading speed of 200 words per minute
 * 
 * @param text - Text content to analyze
 * @param wordsPerMinute - Reading speed (default: 200 WPM)
 * @returns Estimated reading time in minutes
 * 
 * @example
 * calculateReadingTime('word '.repeat(400)) // returns 2 (minutes)
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): number {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return Math.max(1, minutes) // Minimum 1 minute
}

/**
 * Truncates text to a specified length with ellipsis
 * Ensures words are not cut off in the middle
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum character length
 * @returns Truncated text with ellipsis if needed
 * 
 * @example
 * truncateText('This is a long sentence', 10) // returns 'This is a...'
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  
  const truncated = text.slice(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  // If we can find a space, cut at the last word boundary
  if (lastSpaceIndex > 0 && lastSpaceIndex > maxLength * 0.8) {
    return truncated.slice(0, lastSpaceIndex) + '...'
  }
  
  // Otherwise, cut at the character limit
  return truncated + '...'
}

/**
 * Capitalizes the first letter of each word in a string
 * 
 * @param str - String to capitalize
 * @returns Capitalized string
 * 
 * @example
 * capitalizeWords('machine learning engineer') // returns 'Machine Learning Engineer'
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Validates email address format
 * Uses RFC 5322 compliant regex pattern
 * 
 * @param email - Email string to validate
 * @returns Boolean indicating if email is valid
 * 
 * @example
 * isValidEmail('user@example.com') // returns true
 * isValidEmail('invalid-email') // returns false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Debounces a function call to prevent excessive executions
 * Useful for search inputs, resize handlers, etc.
 * 
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 * 
 * @example
 * const debouncedSearch = debounce((query) => search(query), 300)
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Creates a delay using Promise for async operations
 * 
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 * 
 * @example
 * await delay(1000) // waits 1 second
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generates a random ID string for unique component keys
 * 
 * @param length - Length of the generated ID (default: 8)
 * @returns Random alphanumeric string
 * 
 * @example
 * generateId() // returns something like 'a7b2k9x1'
 */
export function generateId(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Safely parses JSON with fallback value
 * 
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback value
 * 
 * @example
 * safeParseJSON('{"name": "John"}', {}) // returns { name: 'John' }
 * safeParseJSON('invalid json', {}) // returns {}
 */
export function safeParseJSON<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}