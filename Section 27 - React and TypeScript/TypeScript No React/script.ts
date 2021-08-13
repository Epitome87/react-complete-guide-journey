function add(a: number, b: number) {
  return a + b;
}

const result = add(2, 5);

console.log(result);

// Primitive types

let age: number = 13;
age = 12;

let userName: string;
userName = 'Matt';

let isInstructor: boolean;
isInstructor = true;

// More complex types

let hobbies: string[];
hobbies = ['Sports', 'Coding', 'Leon'];

let person: { name: string; age: number };
person = { name: 'Matt', age: 34 };
// person = { name: 'Matt', dogs: 1 }; // Type doesn't match -- not allowed

//  Combine -- array full of people type
let people: {
  name: string;
  age: number;
}[];

people = [
  { name: 'Matt', age: 34 },
  { name: 'Caitlin', age: 30 },
];

// Type intference
// let course = "React - The Complete Guide";
// course = 1234;
// The above is not allowed: TypeScript INFERRED that course is a string

// Good practice to avoid the redundancy of specifying type when you assign it in same line:
// let course: string = "React - The Complete Guide" // Avoid this! Do this:
let course = 'React - The Complete Guide';

// Union Types: Allow multiple types for values
let unionCourse: string | number;
unionCourse = 'React';
unionCourse = 123;

// Type Aliases
type Person = { name: string; age: number };
let typedPeople: Person[];
typedPeople = [
  { name: 'Matt', age: 34 },
  { name: 'Caitlin', age: 30 },
];
let matt: Person;
let caitlin: Person;
matt = { name: 'Matthew', age: 34 };
caitlin = { name: 'Caitlin', age: 30 };
typedPeople.push(matt);
typedPeople.push(caitlin);

console.log(typedPeople);

// Creating complex types! For fun!
type Dog = { name: string; age: number; bark: string };
type Cat = { name: string; age: number; meow: string };
let pet: Dog | Cat;
pet = { name: 'Leon', age: 8, bark: 'Woof' };
pet = { name: 'Dumb Cat', age: 99, meow: 'REEE' };

// Functions & Function Types
function subtract(a: number, b: number) {
  return a - b;
  // The above return is inferred
}

// If we want to specify the return value
function createPet(
  petName: string,
  petAge: number,
  petBark: string = 'Default Woof!'
): Dog {
  return { name: petName, age: petAge, bark: petBark };
}
let newPet = createPet('Leon!', 7, 'GRRRR!!!');
console.log('New Pet: ', newPet);

// Inferred return type: void
function printValue(value: any) {
  console.log(value);
}

// Advanced: Generics

// function insertAtBeginning(array: any[], value: any) {
//   const newArray = [value, ...array];
//   return newArray;
// }

// const demoArray = [1, 2, 3];
// const updatedArray = insertAtBeginning(demoArray, 0);
// At this point TypeScript doesn't know we have an array of numbers -- it just knows "any"
// So we aren't receiving very good TS support!
// updatedArray[0].split(""); // Cant' call .split on a number -- yet TS doesn't warn us!

// Generics solves this problem
// Note: We can enter any variable name in the brackets: "T" is common
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}
const demoArray = [1, 2, 3];
// const updatedArray = insertAtBeginning(demoArray, "Hi"); // TS knows a string isn't allowed
const updatedArray = insertAtBeginning(demoArray, 0);
// updatedArray[0].split(""); // TS knows .split doesn't exist on numbers

const stringArray = insertAtBeginning(['bbb', 'cccc', 'dddd'], 'aaa'); // Also allowed: It's of type any!
stringArray[0].split(''); // Split is allowed on strings!
