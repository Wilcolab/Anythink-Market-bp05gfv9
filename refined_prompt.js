/**
 * Converts a string to camelCase format.
 * Handles various input formats including snake_case, kebab-case, and space-separated strings.
 * The first word remains lowercase, and subsequent words have their first letter capitalized.
 * 
 * @param {string} str - The string to convert to camelCase
 * @returns {string} The camelCase version of the input string
 * @throws {TypeError} If input is not a string
 * @throws {Error} If input is an empty string, contains only whitespace, or contains no valid words
 * 
 * @example
 * toCamelCase('hello_world')        // 'helloWorld'
 * toCamelCase('hello-world')        // 'helloWorld'
 * toCamelCase('hello world')        // 'helloWorld'
 * toCamelCase('HELLO_WORLD')        // 'helloWorld'
 * toCamelCase('helloWorld')         // 'helloWorld'
 * 
 * @since 1.0.0
 */
