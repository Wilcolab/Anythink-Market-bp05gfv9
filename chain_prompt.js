/**
 * Converts any string into kebab-case (lower-case words separated by hyphens).
 *
 * @function toKebabCase
 * @param {string} input - The input string to convert to kebab-case.
 * @returns {string} The kebab-case version of the input string.
 * @throws {TypeError} If input is not a non-null string.
 * @throws {Error} If input contains no alphanumeric characters.
 *
 * @example
 * // Normal conversion
 * toKebabCase('myVariableName') // returns 'my-variable-name'
 *
 * @example
 * // Mixed delimiters
 * toKebabCase('hello_world-foo bar') // returns 'hello-world-foo-bar'
 *
 * @example
 * // Edge case with numbers
 * toKebabCase('version2Update') // returns 'version2-update'
 */
function toKebabCase(input) {
    // ===== STEP 1: Input validation & sanitisation =====
    if (typeof input !== 'string' || input === null) {
        throw new TypeError('toKebabCase: input must be a non-null string');
    }

    const trimmed = input.trim();

    if (trimmed.length === 0) {
        return '';
    }

    // ===== STEP 2: Normalise the string into an array of words =====
    // Convert to lower-case
    const lowercased = trimmed.toLowerCase();

    // Split on delimiters: spaces, underscores, hyphens, camelCase boundaries, and non-alphanumeric
    // Use regex to split on:
    // - spaces, underscores, hyphens
    // - transitions from lowercase to uppercase (camelCase)
    // - any non-alphanumeric character
    const words = lowercased
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase letters in camelCase
        .split(/[\s_\-]+|(?=[^a-z0-9])|(?<=[^a-z0-9])/g) // Split on delimiters
        .filter((word) => word.length > 0 && /[a-z0-9]/.test(word)); // Keep only words with alphanumeric chars

    // Validate that at least one alphanumeric character exists
    if (words.length === 0) {
        throw new Error('toKebabCase: input must contain at least one alphanumeric character');
    }

    // ===== STEP 3: Assemble the kebab-case string and export =====
    const kebabCaseString = words.join('-');

    return kebabCaseString;
}

// Export for Node.js
module.exports = toKebabCase;

// Export for ES modules
export { toKebabCase };