// ## Console & Basics
// 1. Print `"Hello JavaScript"` in the console.
console.log("Hello JavaScript")
// 2. Print your name, age, and city using one `console.log()`.
console.log("Name: Gaurav, Age: 67, City: Bikaner")
// 3. Print a warning message using `console.warn()`.
console.warn("This is Warning Message")
// 4. Print an error message using `console.error()`.
console.error("This is Error Message")
// 5. Use `console.table()` to display an array of 5 numbers.
console.table([1, 2, 3, 4, 5])


// ## Variables
// 1. Create a variable called `studentName` and store your name in it.
let studentName = "Gaurav"
// 2. Create a variable `age` and print it.
let age = 67;
console.log(age)
// 3. Create two variables and swap their values.
let a = 1
let b = 2
console.log(a, b) // 1 2
let c = b
b = a
a = c
console.log(a, b) // 2 1
// 4. Create a constant variable for `PI` and print it.
const PI = 3.14
// 5. Declare a variable without assigning a value and print it.
let x;
console.log(x) // undefined
// 6. Create a variable `score` and increase it by 10.
let score = 10
score += 10
console.log(score) // 20
// 7. Create three variables for first name, last name, and full name.
let firstName = "Gaurav"
var lastName = "Chhajer"
const fullName = "Gaurav Chhajer"


// ## Data Types
// 1. Create variables of type string, number, boolean, null, and undefined.
let str = "Hello"
let num = 67
let bool = true
let empty = null
let unknown = undefined
// 2. Check the type of different variables using `typeof`.
console.log(typeof (str)) // String
console.log(typeof (num)) // Number
console.log(typeof (bool)) // Boolean
console.log(typeof (empty)) // null = Object
console.log(typeof (unknown)) // undefined
// 3. Store your mobile number in a variable and check its type.
const mobileNumber = 999999999
console.log(typeof (mobileNumber)) // Number
// 4. Create a variable with value `null` and check its type.
let unknown1 = null
console.log(typeof (unknown1)) // Object
// 5. Create a bigint number and print it.
console.log(99999999999999999999999999999999999999n)


// ## Type Conversion & Coercion
// 1. Convert the string `"50"` into a number.
let strNum = Number("50")
console.log(strNum)
// 2. Convert the number `100` into a string.
let numStr = String(100)
console.log(numStr)
// 3. Convert `"true"` into a boolean.
let strBool = Boolean("true")
console.log(strBool)
// 4. Check the output of:
// - `"5" + 2`
// - `"5" - 2`
// - `true + 1`
console.log("5" + 2) // 52
console.log("5" - 2) // 3
console.log(true + 1) // 2
// 5. Create a variable with value `"123abc"` and convert it into a number.
let numAndStr = "123abc"
console.log(Number(numAndStr)) // NaN
// 6. Use `parseInt()` on `"500px"`.
console.log(parseInt("500px")) // 500 (Str rm ho jaati h)


// ## Operators
// 1. Add two numbers and print the result.
console.log(1 + 2) // 3
// 2. Find the remainder when 25 is divided by 4.
console.log(25 % 4) // 1
// 3. Find the square of a number using exponent operator.
console.log(2 * 2) // 4
// 4. Increment a variable using `++`.
let num1 = 2
console.log(++num1) // 3
// 5. Decrement a variable using `-`.
let num2 = 2
console.log(--num2) // 1
// 6. Use `+=` operator to increase a variable by 20.
let num3 = 0
console.log(num3 += 20) // 20
// 7. Compare two numbers using `>`, `<`, `>=`, `<=`.
console.log(2 > 1) // True
console.log(1 > 2) // False
console.log(1 >= 1) // True
console.log(2 <= 3) // True
// 8. Check if two values are strictly equal using `===`.
let numcheck1 = "Hello"
let numcheck2 = "Hello"
console.log(numcheck1 === numcheck2) // true
// 9. Compare `"10"` and `10` using both `==` and `===`.
let numcheck3 = "10"
let numcheck4 = 10
console.log(numcheck3 == numcheck4) // true
console.log(numcheck3 === numcheck4) // false
// 10. Create two boolean variables and test `&&`, `||`, and `!`.
let bool1 = true
let bool2 = false
console.log(bool1 && bool2) // false
console.log(bool1 || bool2) // true


// ## Strings
// 1. Create a string and print its length.
let str1 = "Hello"
console.log(str1.length) // 5
// 2. Convert a string into uppercase.
console.log(str1.toUpperCase()) // HELLO
// 3. Convert a string into lowercase.
console.log(str1.toLowerCase()) // hello
// 4. Check if a string includes the word `"JavaScript"`.
let str2 = "Hello Javascript"
console.log(str2.includes('Javascript')) // true
// 5. Extract the word `"World"` from `"Hello World"`.
let greet = "Hello World"
console.log(greet.slice(6))
// 6. Replace `"apple"` with `"mango"` in a sentence.
let sentence = "Apple is my favourite"
console.log(sentence.replace("Apple", "Mango"))
// 7. Split `"HTML,CSS,JS"` into an array.
let technologies = "HTML,CSS,JS"
console.log(technologies.split(","))
// 8. Remove extra spaces from a string.
let y = "        y          "
console.log(y.trim())
// 9. Repeat the word `"Hi"` 5 times.
console.log("hi".repeat(5))
// 10. Print the first character of a string.
console.log("Hello"[0])
// 11. Use template literals to print:`"My name is Aman and I am 20 years old"`
let name = "Aman"
let age2 = 20
console.log(`My name is ${name} and I an ${age2} years old`)


// ## Numbers & Math
// 1. Round `4.7` using `Math.round()`.
console.log(Math.round(4.7)) // 5
// 2. Find the square root of 81.
console.log(Math.sqrt(81)) // 9
// 3. Find the maximum number from `10, 20, 5, 99`.
console.log(Math.max(10, 20, 5, 99)) // 99
// 4. Generate a random number between 1 and 10.
console.log(Math.floor(Math.random() * 10) + 1)
// 5. Convert `"99.99"` into an integer.
console.log(parseInt("99.99")) // 99
// 6. Check whether `25` is an integer or not.
console.log(Number.isInteger(25)) // true
// 7. Use `toFixed(2)` on `3.141592`.
console.log(3.141592.toFixed(2)) // 3.14


// ## Conditionals
// 1. Check whether a number is positive or negative.
let inputNum = -80
if (inputNum === 0) {
    console.log("number is neither positive nor negative")
} else if (inputNum > 0) {
    console.log("Positive")
} else {
    console.log("negative")
}
// 2. Check whether a number is even or odd.
if (inputNum % 2 === 0) {
    console.log("even")
} else {
    console.log("odd")
}
// 3. Check whether a person is eligible to vote.
let personAge = 14
if (personAge >= 18) {
    console.log("You are eligible for voting")
} else {
    console.log("you are not eligible for voting")
}
// 4. Find the largest among two numbers.
let compareNum1 = 2
let compareNum2 = 3
if (compareNum1 > compareNum2) {
    console.log(compareNum1)
} else {
    console.log(compareNum2)
}
// 5. Find the largest among three numbers.
let compareNum3 = 4
console.log(Math.max(compareNum1, compareNum2, compareNum3))
// 6. Check whether a year is a leap year.
let year = 2056
if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    console.log("Leap Year");
} else {
    console.log("Not a Leap Year");
}
// 7. Check whether a number is divisible by both 3 and 5.
let checknum = 15
if (checknum % 3 === 0 && checknum % 5 === 0) {
    console.log(`yes ${checknum} is divisble by both 3 and 5`)
} else {
    console.log(`not ${checknum} is not divisble by both 3 and 5`)
}
// 8. Create a simple grading system:
// - 90+ → A
// - 75+ → B
// - 50+ → C
// - below 50 → Fail
let grade = 90
if (grade >= 90 && grade <= 100) {
    console.log("A")
} else if (grade >= 75) {
    console.log("B")
} else if (grade >= 50) {
    console.log("C")
} else if (grade < 50) {
    console.log("Fail")
}
// 9. Check whether a character is a vowel or consonant.
let ch = "A"
let vowels = "aeiouAEIOU"
const consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
if (vowels.includes(ch)) {
    console.log("Vowel")
} else if (consonants.includes(ch)) {
    console.log("Consonant")
} else {
    console.warn("Invalid input")
}
// 10. Create a calculator using `switch` statement.
let inputnum1 = 15
let inputnum2 = 5
let inputoperator = "*"
switch(inputoperator){
    case "+": console.log(inputnum1 + inputnum2); break;
    case "-": console.log(inputnum1 - inputnum2); break;
    case "/": console.log(inputnum1 / inputnum2); break;
    case "*": console.log(inputnum1 * inputnum2); break;
    default: console.warn("Invalid input")
    
}
// 11. Print the day name based on a number (1–7).
let day = 5
switch(day){
    case 1: console.log("Monday"); break;
    case 2: console.log("Tuesday"); break;
    case 3: console.log("Wednesday"); break;
    case 4: console.log("Thursday"); break;
    case 5: console.log("Friday"); break;
    case 6: console.log("Saturday"); break;
    case 7: console.log("Sunday"); break;
    default: console.log("Invalid day number");
  }
// 12. Check whether a username is `"admin"` and password is `"1234"`.
let userRole = "admin"
let userPass = "1234"
if(userRole === "admin" && userPass === "1234"){
    console.log("Authorised")
}else{
    console.log("Unauthorised")
}


// ## Truthy & Falsy
// 1. Check whether an empty string is truthy or falsy.
if(""){ console.log(true)}
else{console.log(false)} // "" => falsy value
// 2. Check whether `0` is truthy or falsy.
if (0) { console.log(true) } else { console.log(false) } // 0 => falsy value
// 3. Check whether `[]` is truthy or falsy.
if ([]) { console.log(true) } else { console.log(false) } // [] => truthy value
// 4. Create a variable and print `"Valid"` if it has a value otherwise print `"Invalid"`.
let variable = "  ";
let ss = variable.trim("")
if(ss === undefined || ss === null || ss === ""){
    console.log("Invalid")
}else{
    console.log("Valid")
}


// ## Ternary Operator
// 1. Check whether a number is even or odd using ternary operator.
let acceptedNum = 2
 let answer = acceptedNum%2===0 ? console.log("even") : console.log("odd")
// 2. Check whether age is above 18 using ternary operator.
let acceptedAge = 92
let validAns = acceptedAge >= 18 ? console.log("Valid") : console.log("Invalid")
// 3. Find the greater number between two values using ternary operator.
let findnum1 = 30
let findnum2 = 90
let greaternum = findnum1 > findnum2 ? findnum1 : findnum2
console.log(greaternum)


// ## Mixed Practice Questions
// 1. Create a mini biodata program using variables and template literals.
let _firstName = "Gaurav"
let _LastName = "Chhajer"
let _age = 67
let _gender = "Male"
console.log(`My name is ${_firstName + _LastName}, My age is ${_age} and I am ${_gender}`)
// 2. Calculate the area of a rectangle.
function area(l , b){
    return l * b
}
console.log(area(5,3)) // 15
// 3. Calculate the simple interest.
function SI(p,r,t){
 return (p*r*t)/100
}
console.log(SI(1000,10,5)) // 500
// 4. Convert temperature from Celsius to Fahrenheit.
function celsiusToFahrenheit(c) {
  return (c * 9 / 5) + 32
}
console.log(celsiusToFahrenheit(25)) // 77
// 5. Convert kilometers into meters.
function kilometerToMeter(km) {
  return km * 1000
}
console.log(kilometerToMeter(5)) // 5000
// 6. Calculate total marks and percentage of 5 subjects.
let marks = [80, 70, 90, 60, 85]
let totalMarks = marks[0] + marks[1] + marks[2] + marks[3] + marks[4]
let percentage = (totalMarks / 500) * 100
console.log(totalMarks, percentage)
// 7. Calculate electricity bill based on units consumed.
function electricityBill(units) {
  return units * 5
}
console.log(electricityBill(100)) // 500
// 8. Create a username generator using first name and birth year.
function makeUsername(name, year) {
  return name.toLowerCase() + year
}
console.log(makeUsername("Gaurav", 1957))
// 9. Check whether a string starts with a specific letter.
let fruit = "banana"
console.log(fruit.startsWith("b")) // true
// 10. Count the total characters in a sentence excluding spaces.
let sentence2 = "Hello world again"
let countChars = sentence2.split(' ').join('').length
console.log(countChars)


// ## Logical Thinking Questions
// 1. Take two numbers and print which one is greater.
let goodNum1 = 12
let goodNum2 = 8
if (goodNum1 > goodNum2) {
  console.log(goodNum1)
} else {
  console.log(goodNum2)
}
// 2. Check whether a number lies between 10 and 50.
let checkNumber = 30
console.log(checkNumber > 10 && checkNumber < 50)
// 3. Check whether a password length is greater than 8.
let myPass = "mypassword"
console.log(myPass.length > 8)
// 4. Check if a person can drive:
// - age > 18
// - has license = true
let personAge2 = 20
let hasLicense = true
console.log(personAge2 > 18 && hasLicense)
// 5. Check whether a number is divisible by 2, 3, or both.
let checkDiv = 12
if (checkDiv % 2 === 0 && checkDiv % 3 === 0) {
  console.log("both")
} else if (checkDiv % 2 === 0) {
  console.log("2")
} else if (checkDiv % 3 === 0) {
  console.log("3")
} else {
  console.log("none")
}
// 6. Print "Good Morning", "Good Afternoon", or "Good Evening" based on time.
let hour = 15
if (hour < 12) {
  console.log("Good Morning")
} else if (hour < 17) {
  console.log("Good Afternoon")
} else {
  console.log("Good Evening")
}
// 7. Find whether a number is a multiple of 10.
let multiple = 50
console.log(multiple % 10 === 0)
// 8. Create a simple discount calculator.
function discountPrice(price, discount) {
  return price - (price * discount / 100)
}
console.log(discountPrice(100, 20)) // 80
// 9. Check whether a product is in stock.
let stock = 5
console.log(stock > 0 ? "In stock" : "Out of stock")
// 10. Calculate final bill after GST.
function finalBill(amount, gstRate) {
  return amount + (amount * gstRate / 100)
}
console.log(finalBill(100, 18)) // 118


// ## Challenge Questions for Beginners
// 1. Generate a random OTP of 4 digits.
let otp = Math.floor(1000 + Math.random() * 9000)
console.log(otp)
// 2. Reverse a 3-letter string manually.
let three = "cat"
console.log(three[2] + three[1] + three[0])
// 3. Find the last character of a string.
let hello = "Hello"
console.log(hello[hello.length - 1])
// 4. Convert a full name into uppercase initials.
let fullName2 = "gaurav chhajer"
let parts = fullName2.split(" ")
console.log(parts[0][0].toUpperCase() + parts[1][0].toUpperCase())
// 5. Check whether two strings are equal ignoring case sensitivity.
let a1 = "Hello"
let a2 = "hello"
console.log(a1.toLowerCase() === a2.toLowerCase())
// 6. Create a simple login validation system.
let loginUser = "admin"
let loginPass = "1234"
if (loginUser === "admin" && loginPass === "1234") {
  console.log("Login success")
} else {
  console.log("Login fail")
}
// 7. Find whether a number is a 2-digit or 3-digit number.
let digitNum = 45
if (digitNum >= 10 && digitNum <= 99) {
  console.log("2-digit")
} else if (digitNum >= 100 && digitNum <= 999) {
  console.log("3-digit")
} else {
  console.log("other")
}
// 8. Create a mini ATM balance checker.
let balance = 500
let withdraw = 200
if (withdraw <= balance) {
  balance = balance - withdraw
  console.log("Withdraw done", balance)
} else {
  console.log("Not enough money")
}
// 9. Simulate a traffic light system using `switch`.
let traffic = "green"
switch (traffic) {
  case "red": console.log("Stop"); break
  case "yellow": console.log("Ready"); break
  case "green": console.log("Go"); break
  default: console.log("No light")
}
// 10. Build a small marksheet generator using variables and conditionals.
let marks1 = 80
let marks2 = 70
let marks3 = 90
let avg = (marks1 + marks2 + marks3) / 3
if (avg >= 80) {
  console.log("A grade")
} else if (avg >= 60) {
  console.log("B grade")
} else {
  console.log("C grade")
}