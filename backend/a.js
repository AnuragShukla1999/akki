// const person = {
//     firstName: "John",
//     lastName: "Doe",
//     age: 30
//   };

//   // Get an array of keys
//   const keys = Object.keys(person);

//   console.log(keys); // Output: ["firstName", "lastName", "age"]



// const person = {
//     firstName: "John",
//     lastName: "Doe",
//     age: 30
// };

// const keys = Object.keys(person);

// console.log(keys);





// const car = {
//     brand: "Toyota",
//     model: "Corolla",
//     year: 2020
// };

// // Iterate over the keys
// Object.keys(car).forEach(key => {
//     console.log(key + ": " + car[key]);
// });


// const car = {
//     brand: "Toyota",
//     model: "Corolla",
//     year: 2020
// };

// const key = Object.keys(car);


// const a = key.forEach(e => console.log(e));

// console.log(a);


// let a = Object.values({
//     brand: "Toyota",
//     model: "Corolla",
//     year: 2020
// });

// console.log(a);




// let a = Object.entries({
//     brand: "Toyota",
//     model: "Corolla",
//     year: 2020
// });

// console.log(a);





// let a = Object.create({});

// console.log(a);




// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5 };

// const returnedTarget = Object.assign(target, source);

// console.log(target); // Output: { a: 1, b: 4, c: 5 }
// console.log(returnedTarget); // Output: { a: 1, b: 4, c: 5 }




// const person = {
//     isHuman: false,
//     printIntroduction: function () {
//         console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//     }
// };

// const me = Object.create(person);

// me.name = "John"; // "name" is a property set on "me", but not on "person"
// me.isHuman = true; // inherited properties can be overwritten

// me.printIntroduction();
// // Output: "My name is John. Am I human? true"










// --------------------------------  Loop Question

//  Print Numbers from 1 to 10

// for (let i=1; i<=10; i++) {
//     console.log(i)
// };


//  Sum of First 10 Natural Numbers

// let a = 0;

// for (let i=1; i<=10; i++) {
//     a = a + i;
// };

// console.log(a);


// Factorial of a Number

// const Factorial = (n) => {
//     let ans = 1;

//     if (n === 0) {
//         return 1;
//     } else {
//         for (let i = 2; i <= n; i++) {
//             ans = ans * i;
//         };
//         return ans;
//     }
// }

// console.log(Factorial(5));




// Reverse a String

// const string = "anurag";
// let reverseString = "";

// for (let i=string.length - 1; i>=0; i--){
//     reverseString = reverseString + string[i]
// };

// console.log(reverseString);




/// Print Even Numbers from 1 to 20   Write a loop that prints all even numbers from 1 to 20.

// for (let i=0; i<=20; i++) {
//     if (i % 2 === 0) {
//         console.log(i)
//     }
// }




// Print Each Element in an Array    Write a loop that prints each element of an array.

// const arr = [1, 2, 3, 4, 5, 6, 7];

// for (let i=0; i<=arr.length - 1; i++) {
//     console.log(arr[i])
// }





//   Find the Maximum Number in an Array

//   first solution
// function maxNumberOfArray(arr) {
//     let maxNum = arr[0];
//     for (let i=1; i<arr.length; i++) {
//         if (arr[i] > maxNum) {
//             maxNum = arr[i]
//         };
//     }
//     return maxNum;
// };

// const arr = [23, 53, 92, 10, 3, 199, 7, 200, 399, 20, 17];
// console.log(maxNumberOfArray(arr))


// second solution
// const arr = [23, 53, 92, 10, 3, 199, 7, 200, 399, 20, 17];
// let maxNum = arr[0];
// for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > maxNum) {
//         maxNum = arr[i]
//     };
// }
// console.log(maxNum)







//  Count the Number of Vowels in a String

// const string = "abcdefghijklmnopqrstuvwxyz";
// let vowelCount = 0;

// for (let i=0; i<string.length; i++) {
//     if (string[i] === 'a' || string[i] === 'e' || string[i] === 'i' || string[i] === 'o' || string[i] === 'u') {
//         console.log(string[i]);
//         vowelCount++;
//     }
// };

// console.log(vowelCount);





//  Create a Multiplication Table

// let num = 4
// for (let i=1; i<=10; i++) {
//     console.log("4" + " " + "*" + " " + num * i);
// };




// Print a Pattern

// let row = 5
// let star = "";

// for (let i=1; i<=row; i++) {
//     for (let j=1; j<=i; j++) {
//         star += "x "
//     }
//     star += ' ';
// };

// console.log(star)