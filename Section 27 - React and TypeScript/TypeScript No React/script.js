function add(a, b) {
    return a + b;
}
var result = add(2, 5);
console.log(result);
// Primitive types
var age = 13;
age = 12;
var userName;
userName = 'Matt';
var isInstructor;
isInstructor = true;
// More complex types
var hobbies;
hobbies = ['Sports', 'Coding', 'Leon'];
var person;
person = { name: 'Matt', age: 34 };
// person = { name: 'Matt', dogs: 1 }; // Type doesn't match -- not allowed
//  Combine -- array full of people type
var people;
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
var course = 'React - The Complete Guide';
// Union Types: Allow multiple types for values
var unionCourse;
unionCourse = 'React';
unionCourse = 123;
var typedPeople;
typedPeople = [
    { name: 'Matt', age: 34 },
    { name: 'Caitlin', age: 30 },
];
var matt;
var caitlin;
matt = { name: 'Matthew', age: 34 };
caitlin = { name: 'Caitlin', age: 30 };
typedPeople.push(matt);
typedPeople.push(caitlin);
console.log(typedPeople);
var pet;
pet = { name: 'Leon', age: 8, bark: 'Woof' };
pet = { name: 'Dumb Cat', age: 99, meow: 'REEE' };
// Functions & Function Types
function subtract(a, b) {
    return a - b;
    // The above return is inferred
}
// If we want to specify the return value
function createPet(petName, petAge, petBark) {
    if (petBark === void 0) { petBark = 'Default Woof!'; }
    return { name: petName, age: petAge, bark: petBark };
}
var newPet = createPet('Leon!', 7, 'GRRRR!!!');
console.log('New Pet: ', newPet);
// Inferred return type: void
function printValue(value) {
    console.log(value);
}
