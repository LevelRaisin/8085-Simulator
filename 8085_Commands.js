// Converts a value with an unknown base formatted as #####H/B/D
// into the base specified by the final letter in the string. 
// By default values will be converted to decimal if there are no
// valid letters present at the end of the string.
function valueConverter(input) {
    // Get last character of input string
    var lastCharacter = input.toString().substr(input.length - 1);
    // Get the inputted number (everything except final character)
    var inputNum = input.substr(0, input.length - 1);

    switch (lastCharacter.toLowerCase()) {
        // Convert to hex
        case "h":
            return convertNumber(inputNum, 16);
            // Convert to binary
        case "b":
            return convertNumber(inputNum, 2);
            // Convert to decimal
        case "d":
            return convertNumber(inputNum, 10);
            // Default case
        default:
            // Check if there are numbers and a valid letter
            if ('0123456789abcdef'.indexOf(lastCharacter.charAt(0)) !== -1)
                return convertNumber(input, 10); // Convert entire string to dec
            else
                return convertNumber(inputNum, 10); // Convert only valid section to dec
    }
}

// Function to guess the base of the inputted string
// ** 
//    It is possible in some cases for dec and binary 
//    to be mided up
// **
function getBase(input) {
    // Check for hex
    if (!Number.isInteger(parseInt(input)))
        return 16;
    // Check for binary
    else if (input.search(/^[10]+$/) != -1)
        return 2;

    // Number is dec (else)
    return 10;
}

// Function to convert number to new base (hex/binary/decimal)
function convertNumber(input, endBase) {
    // Var declaration
    var startBase = getBase(input);
    var convertedDecimal;

    // Convert all to decimal by checking original base
    if (startBase == 16)
        convertedDecimal = parseInt(input, 16); // Convert hex to dec
    else if (startBase == 2)
        convertedDecimal = parseInt(input, 2); // Convert binary to dec

    // Convert decimal number to final base
    if (endBase == 16)
        return convertedDecimal.toString(16); // Dec to hex
    else if (endBase == 2)
        return convertedDecimal.toString(2); // Dec to binary
    else
        return convertedDecimal.toString(); // Dec to string
}

// Validates if a conversion can be completed correctly. Ensures
// a value can be converted to another type from decimal.
function validateConversion(input, conversion) {
    // Convert to designated type
    var converted = parseInt(input).toString(conversion);

    console.log(converted);

    // Check if when converted back new number is valid
    if (parseInt(converted, conversion) == input)
        return true; // Return true
    return false; // Default to false
}