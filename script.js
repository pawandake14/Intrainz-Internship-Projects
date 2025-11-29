/**
 * ========================================
 * PROFESSIONAL CALCULATOR - JAVASCRIPT
 * ========================================
 * 
 * This calculator implements all required functionality:
 * - Basic arithmetic operations: +, -, *, /
 * - Modulo (%) operation
 * - Square (²) operation
 * - Decimal number support
 * - All Clear (AC) button
 * - Backspace functionality
 * - Error handling for invalid operations
 * 
 * Uses vanilla JavaScript with event listeners and custom functions.
 * No external libraries or frameworks are used.
 */

// ========================================
// CALCULATOR STATE VARIABLES
// ========================================

// Stores the first operand in a calculation
let previousValue = null;

// Stores the current operation being performed
let currentOperation = null;

// Tracks whether the next number input should replace the current display
let shouldResetDisplay = true;

// ========================================
// DOM ELEMENT REFERENCES
// ========================================

// Main display element showing the current number or result
const mainDisplay = document.getElementById('mainDisplay');

// Display element showing the current operation
const operationDisplay = document.getElementById('operationDisplay');

// ========================================
// CALCULATOR FUNCTIONS
// ========================================

/**
 * Updates the main display with a new value
 * @param {string} value - The value to display
 */
function updateDisplay(value) {
    // Set the text content of the main display
    mainDisplay.textContent = value;
}

/**
 * Updates the operation display to show current operation
 * @param {string} operation - The operation symbol to display
 * @param {number} value - The first operand value
 */
function updateOperationDisplay(operation, value) {
    // Only show operation display if there's an active operation
    if (operation && value !== null) {
        // Format the operation display with the operation symbol and first value
        operationDisplay.textContent = `${value} ${operation}`;
    } else {
        // Clear operation display if no active operation
        operationDisplay.textContent = '';
    }
}

/**
 * Handles number button clicks (0-9)
 * Appends the clicked number to the display
 * @param {string} number - The number that was clicked
 */
function handleNumberClick(number) {
    // Get the current display value
    const currentDisplay = mainDisplay.textContent;

    // If we should reset the display (starting a new number), replace it
    if (shouldResetDisplay) {
        updateDisplay(number);
        shouldResetDisplay = false;
    } else {
        // Otherwise, append the number to the current display
        // Prevent multiple leading zeros (e.g., "00" becomes "0")
        if (currentDisplay === '0' && number !== '.') {
            updateDisplay(number);
        } else {
            // Append the number to the current display
            updateDisplay(currentDisplay + number);
        }
    }
}

/**
 * Handles decimal point input
 * Ensures only one decimal point per number
 */
function handleDecimal() {
    // Get the current display value
    const currentDisplay = mainDisplay.textContent;

    // If we should reset the display, start with "0."
    if (shouldResetDisplay) {
        updateDisplay('0.');
        shouldResetDisplay = false;
    } else if (!currentDisplay.includes('.')) {
        // Only add decimal if not already present in the current number
        updateDisplay(currentDisplay + '.');
    }
    // If decimal already exists, do nothing (prevents multiple decimals)
}

/**
 * Handles operation button clicks (+, -, *, /)
 * Stores the current value and operation for later calculation
 * @param {string} operation - The operation symbol (+, -, *, /)
 */
function handleOperation(operation) {
    // Get the current display value as a number
    const currentValue = parseFloat(mainDisplay.textContent);

    // If there's already a previous operation and we haven't started a new number
    if (previousValue !== null && currentOperation && !shouldResetDisplay) {
        // Calculate the result of the previous operation first
        const result = performCalculation(previousValue, currentValue, currentOperation);
        
        // Update the display with the intermediate result
        updateDisplay(String(result));
        
        // Store the result as the new previous value
        previousValue = result;
    } else {
        // Store the current value as the previous value for the next calculation
        previousValue = currentValue;
    }

    // Set the new operation
    currentOperation = operation;

    // Update the operation display to show the current operation
    updateOperationDisplay(operation, previousValue);

    // Set flag to reset display on next number input
    shouldResetDisplay = true;
}

/**
 * Handles the modulo (%) operation
 * Calculates the remainder of division
 */
function handleModulo() {
    // Get the current display value as a number
    const currentValue = parseFloat(mainDisplay.textContent);

    // If there's a previous value and operation, calculate it first
    if (previousValue !== null && currentOperation && !shouldResetDisplay) {
        // Perform the pending calculation
        const result = performCalculation(previousValue, currentValue, currentOperation);
        
        // Update display with result
        updateDisplay(String(result));
        
        // Store result as new previous value
        previousValue = result;
        
        // Set modulo as the new operation
        currentOperation = '%';
    } else {
        // Set modulo as the operation
        previousValue = currentValue;
        currentOperation = '%';
    }

    // Update operation display
    updateOperationDisplay('%', previousValue);

    // Set flag to reset display on next number input
    shouldResetDisplay = true;
}

/**
 * Handles the square (²) operation
 * Squares the current display value immediately
 */
function handleSquare() {
    // Get the current display value as a number
    const currentValue = parseFloat(mainDisplay.textContent);

    // Calculate the square of the current value
    const result = currentValue * currentValue;

    // Update the display with the squared result
    updateDisplay(String(result));

    // Set flag to reset display on next number input
    shouldResetDisplay = true;
}

/**
 * Performs the actual calculation based on the operation
 * Implements the core arithmetic logic
 * @param {number} firstValue - The first operand
 * @param {number} secondValue - The second operand
 * @param {string} operation - The operation to perform (+, -, *, /, %)
 * @returns {number} The result of the calculation
 */
function performCalculation(firstValue, secondValue, operation) {
    // Use a switch statement to handle different operations
    switch (operation) {
        // Addition: add two numbers
        case '+':
            return firstValue + secondValue;

        // Subtraction: subtract second from first
        case '-':
            return firstValue - secondValue;

        // Multiplication: multiply two numbers
        case '*':
            return firstValue * secondValue;

        // Division: divide first by second
        case '/':
            // Check for division by zero to prevent errors
            if (secondValue === 0) {
                // Alert user about invalid operation
                alert('Cannot divide by zero!');
                // Return the first value unchanged
                return firstValue;
            }
            return firstValue / secondValue;

        // Modulo: get remainder of division
        case '%':
            // Check for modulo by zero to prevent errors
            if (secondValue === 0) {
                // Alert user about invalid operation
                alert('Cannot perform modulo with zero!');
                // Return the first value unchanged
                return firstValue;
            }
            return firstValue % secondValue;

        // Default case: return the second value if operation is unknown
        default:
            return secondValue;
    }
}

/**
 * Handles the equals button
 * Calculates and displays the final result
 */
function handleEquals() {
    // Get the current display value as a number
    const currentValue = parseFloat(mainDisplay.textContent);

    // Only calculate if there's a previous value and an operation
    if (previousValue !== null && currentOperation) {
        // Perform the calculation
        const result = performCalculation(previousValue, currentValue, currentOperation);

        // Update the display with the result
        updateDisplay(String(result));

        // Clear the operation state
        previousValue = null;
        currentOperation = null;

        // Clear the operation display
        updateOperationDisplay(null, null);

        // Set flag to reset display on next number input
        shouldResetDisplay = true;
    }
}

/**
 * Handles the All Clear (AC) button
 * Resets the calculator to its initial state
 */
function handleClear() {
    // Reset all state variables to initial values
    previousValue = null;
    currentOperation = null;
    shouldResetDisplay = true;

    // Reset the display to show "0"
    updateDisplay('0');

    // Clear the operation display
    updateOperationDisplay(null, null);
}

/**
 * Handles the backspace button
 * Removes the last digit from the current display
 */
function handleBackspace() {
    // Get the current display value
    const currentDisplay = mainDisplay.textContent;

    // If the display has more than one character
    if (currentDisplay.length > 1) {
        // Remove the last character
        updateDisplay(currentDisplay.slice(0, -1));
    } else {
        // If only one character, reset to "0"
        updateDisplay('0');
        shouldResetDisplay = true;
    }
}

// ========================================
// EVENT LISTENER SETUP
// ========================================

/**
 * Sets up all event listeners for calculator buttons
 * This function runs when the DOM is fully loaded
 */
function initializeCalculator() {
    // Number buttons (0-9)
    // Loop through each digit and add click listener
    for (let i = 0; i <= 9; i++) {
        // Get the button element by its ID
        const button = document.getElementById(`btn${i}`);
        
        // Add click event listener to the button
        if (button) {
            button.addEventListener('click', function() {
                // Call handleNumberClick with the number as string
                handleNumberClick(String(i));
            });
        }
    }

    // Decimal button - handles decimal point input
    const decimalBtn = document.getElementById('btnDecimal');
    if (decimalBtn) {
        decimalBtn.addEventListener('click', handleDecimal);
    }

    // Operation buttons - handles +, -, *, /
    const addBtn = document.getElementById('btnAdd');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            handleOperation('+');
        });
    }

    const subtractBtn = document.getElementById('btnSubtract');
    if (subtractBtn) {
        subtractBtn.addEventListener('click', function() {
            handleOperation('-');
        });
    }

    const multiplyBtn = document.getElementById('btnMultiply');
    if (multiplyBtn) {
        multiplyBtn.addEventListener('click', function() {
            handleOperation('*');
        });
    }

    const divideBtn = document.getElementById('btnDivide');
    if (divideBtn) {
        divideBtn.addEventListener('click', function() {
            handleOperation('/');
        });
    }

    // Special operation buttons
    const equalsBtn = document.getElementById('btnEquals');
    if (equalsBtn) {
        equalsBtn.addEventListener('click', handleEquals);
    }

    const clearBtn = document.getElementById('btnClear');
    if (clearBtn) {
        clearBtn.addEventListener('click', handleClear);
    }

    const backspaceBtn = document.getElementById('btnBackspace');
    if (backspaceBtn) {
        backspaceBtn.addEventListener('click', handleBackspace);
    }

    const squareBtn = document.getElementById('btnSquare');
    if (squareBtn) {
        squareBtn.addEventListener('click', handleSquare);
    }

    const moduloBtn = document.getElementById('btnModulo');
    if (moduloBtn) {
        moduloBtn.addEventListener('click', handleModulo);
    }

    // Keyboard support - allows using keyboard to operate the calculator
    document.addEventListener('keydown', function(event) {
        // Get the key that was pressed
        const key = event.key;

        // Handle number keys (0-9)
        if (key >= '0' && key <= '9') {
            handleNumberClick(key);
        }
        // Handle decimal point
        else if (key === '.') {
            handleDecimal();
        }
        // Handle addition
        else if (key === '+') {
            handleOperation('+');
        }
        // Handle subtraction
        else if (key === '-') {
            handleOperation('-');
        }
        // Handle multiplication
        else if (key === '*') {
            handleOperation('*');
        }
        // Handle division
        else if (key === '/') {
            event.preventDefault(); // Prevent browser search
            handleOperation('/');
        }
        // Handle equals (Enter or =)
        else if (key === 'Enter' || key === '=') {
            event.preventDefault(); // Prevent form submission
            handleEquals();
        }
        // Handle backspace
        else if (key === 'Backspace') {
            event.preventDefault(); // Prevent browser back
            handleBackspace();
        }
        // Handle clear (Escape key)
        else if (key === 'Escape') {
            handleClear();
        }
    });
}

// ========================================
// INITIALIZATION
// ========================================

// Wait for the DOM to be fully loaded before initializing
if (document.readyState === 'loading') {
    // If DOM is still loading, wait for DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', initializeCalculator);
} else {
    // If DOM is already loaded, initialize immediately
    initializeCalculator();
}
