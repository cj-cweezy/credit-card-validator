// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

//Validate Credit Card Function:
const validateCred = arr => {
  let checkDigits = []
  let doubleDigits = []
  let finalSumArray = []
  let doubleDigitArray = []
  let finalDoubleDigitArray = []
  let finalSum1 = 0
  let finalSum2 = 0
  let result = 0
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  
  for (let i = arr.length - 1; i >= 0; i -= 2) {
    checkDigits += arr[i]
    finalCheckDigits = checkDigits.split('')
  }
  finalSumArray = finalCheckDigits.map((i) => Number(i))
  finalSum1 = finalSumArray.reduce(reducer)
  
  for (let i = arr.length - 2; i >= 0; i -= 2) {
   doubleDigits += arr[i]
   finalDoubleDigits = doubleDigits.split('')
 }
 doubleDigitArray = finalDoubleDigits.map((i) => Number(i))
  
  for(let i = 0; i < doubleDigitArray.length; i++) {
   finalDoubleDigitArray = doubleDigitArray.map(x => x * 2)
   for (let i = 0; i < finalDoubleDigitArray.length; i++) {
     if (finalDoubleDigitArray[i] > 9) {
       finalDoubleDigitArray[i] = finalDoubleDigitArray[i] - 9
     }
   }
 }
 finalSum2 = finalDoubleDigitArray.reduce(reducer)
 result = finalSum1 + finalSum2
 
 if (result % 10 === 0) {
   return true
 } else {
   return false
 }
}

// Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers. The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.

//Find invalid credit card function:
let invalidCredArray = []
const findInvalidCards = nestedArr => {
  for (let i = 0; i < nestedArr.length; i++) {
    if (validateCred(nestedArr[i]) === false) {
      invalidCredArray.push(nestedArr[i])
    }
  }
  return invalidCredArray
} 
//After finding all the invalid credit card numbers, it’s also necessary to identify the credit card companies that have possibly issued these faulty numbers. Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid numbers and returns an array of companies.

//Find the companies that provided the invalid card numbers
const idInvalidCardCompanies = nestedArr => {
  let companies = []
  for (let i = 0; i < nestedArr.length; i++) {
    if (nestedArr[i][0] === 3 && !companies.includes('Amex')) {
      companies.push('Amex')
    }
    else if (nestedArr[i][0] === 4 && !companies.includes('Visa')) {
      companies.push('Visa')
    }
    else if (nestedArr[i][0] === 5 && !companies.includes('Mastercard')) {
      companies.push('Mastercard')
    }
    else if (nestedArr[i][0] === 6 && !companies.includes('Discover')) {
      companies.push('Discover')
    } 
    else if (nestedArr[i][0] !== 3 || nestedArr[i][0] !== 4 || nestedArr[i][0] !== 5 || nestedArr[i][0] !== 6) {
      console.log('Company not found')
    }
  }
  return companies
}

console.log(idInvalidCardCompanies(findInvalidCards(batch)))
