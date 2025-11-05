/**
 * Utility functions for localStorage operations
 * Handles JSON serialization/deserialization and error handling
 */

/**
 * Get an item from localStorage
 * @param {string} key - The storage key
 * @param {*} defaultValue - Default value to return if key doesn't exist or parsing fails
 * @returns {*} The parsed value or defaultValue
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Set an item in localStorage
 * @param {string} key - The storage key
 * @param {*} value - The value to store (will be JSON stringified)
 * @returns {boolean} True if successful, false otherwise
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Remove an item from localStorage
 * @param {string} key - The storage key
 * @returns {boolean} True if successful, false otherwise
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all items from localStorage
 * @returns {boolean} True if successful, false otherwise
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Check if a key exists in localStorage
 * @param {string} key - The storage key
 * @returns {boolean} True if key exists, false otherwise
 */
export const hasStorageItem = (key) => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking localStorage for key "${key}":`, error);
    return false;
  }
};

