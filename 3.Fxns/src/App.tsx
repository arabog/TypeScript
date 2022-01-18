import React from 'react';
import './App.css';



// User-Defined Type Guards:
//~ are special functions that allow TS to better infer the type of some value.
// These guards enforce certain types in conditional code blocks, where the 
// type of a value may be different depending on the situation. These are 
// especially useful when using the Array.prototype.filter function to return 
// a filtered array of data.

// One common task when adding values conditionally to an array is to 
// check for some conditions and then only add the value if the condition 
// is true. If the value is not true, the code adds a false Boolean to the array. 
// Before using that array, you can filter it using .filter(Boolean) to make 
// sure only truthy values are returned.

// When called with a value, the Boolean constructor returns true or false, 
// depending on if this value is a Truthy or Falsy value.

const isProduction = false;

const valuesArr = ['some-string', isProduction && 'production']

function processArr(array: string[]) {
	// do smth wit arr
	console.log(array);
}

// processArr(valuesArr.filter(Boolean))

// This error is saying that, at compile-time, the value passed to 
// processArray is interpreted as an array of false | string values, 
// which is not what the processArray expected. It expects an 
// array of strings: string[].

// This is one case where TypeScript is not smart enough to infer 
// that by using .filter(Boolean) you are removing all falsy values 
// from your array. However, there is one way to give this hint to 
// TypeScript: using user-defined type guards.

function isString(value: any): value is string {
	return typeof value === 'string';
}

// Notice the return type of the isString function. The way to 
// create user-defined type guards is by using the following 
// syntax as the return type of a function:

// parameterName is Type

// Where parameterName is the name of the parameter you are 
// testing, and Type is the expected type the value of this parameter 
// has if this function returns true.

// In this case, you are saying that value is a string if isString 
// returns true. You are also setting the type of your value 
// parameter to any, so it works with any type of value.

// Now, change your .filter call to use your new function 
// instead of passing it the Boolean constructor:

processArr(valuesArr.filter(isString))


function notOnlyStr(value: any) { //value as str nt included
	return value;
}
console.log (notOnlyStr(valuesArr));

// Now the TypeScript compiler correctly infers that the array 
// passed to processArr only contains strings, and your code 
// compiles correctly.


function App() {
	return (
		<div className="App">
			Function
		</div>
	);
}


export default App;


/* Cr8ing Typed Fxns:
function functionName(param1: Param1Type, param2: Param2Type): ReturnType {
	// ... body of the function
}

function sum(a: number, b: number): number {
	return a + b;
}

const result = sum(1, 2);

// User type 
type User = {
	firstName: string;
	lastName: string;
}

function getUserFullName(user: User): string {
	return `${user.firstName} ${user.lastName}`
}

To call your function now, you must pass an 
object that has the same shape as the User type:

const user: User ={
	firstName: "Jon",
	lastName: "Doe",
}

const userFullName = getUserFullName(user);
console.log(userFullName);
*/ 


/* Optnal Fxn Parameters in TypeScript:
To turn a function parameter into an optional one, add 
the ? modifier right after the parameter name.
type User = {
	firstName: string;
	lastName: string;
};

function getUserFullName(user: User, prefix ?: string) {
	return `${prefix ??  ''} ${user.firstName} ${user.lastName}`;
} 


In d above code, you are using the nullish coalescing operator ??. 
This way, you are only going to use the prefix value if it is defined; 
otherwise, the function will use an empty string.
The nullish coalescing operator (??) is a logical operator that 
returns its right-hand side operand when its left-hand side 
operand is null or undefined, and otherwise returns its 
left-hand side operand.

const user: User = {
	firstName: "Jon",
	lastName: "Doe",
}

const userFullName = getUserFullName(user);
const mrUserFullName = getUserFullName(user, 'Mr. ')

console.log(userFullName, mrUserFullName);

Note that you cannot add an optional parameter before a required one; 
it must be listed last in the series, as is done with (user: User, prefix?: string)
*/ 



/* Fxn Types:
The syntax for creating your function type is similar to 
creating an arrow function, with two differences:

You remove the function body.
You make the function declaration return the return type itself.
Here is how you would create a type that matches the 
getUserFullName function you have been using:

type User = {
	firstName: string;
	lastName: string;
};

type PrintUserNameFxn = (user: User, prefix?: string) => string;

you used the type keyword to declare a new type, then provided 
the type for the two parameters in the parentheses and the type 
for the return value after the arrow.

imagine you are creating an event listener function called onEvent, 
which receives as the first parameter the event name, and as the 
second parameter the event callback. The event callback itself 
would receive as the first parameter an object with the following type:

type EventContext = {
	value: string;
}

function onEvent(eventName: string, eventCallback: (target: EventContext) => void) {
	// implemtation
}

Notice that the type of the eventCallback parameter is a function type:
eventCallback: (target: EventTarget) => void
This means that your onEvent function expects another function to be 
passed in the eventCallback parameter. This function should accept a 
single argument of the type EventTarget. The return type of this function 
is ignored by your onEvent function, and so you are using void as the type.
*/ 


/* Using Typed Asynchronous Fxns:
async function name(params:type) {}

async function asyncFunction (param1: number) {
	// ... function implementation ...
}

There is one major difference between adding types to a normal 
function and adding types to an asynchronous function: In an 
asynchronous function, the return type must always be the Promise<T> 
generic. The Promise<T> generic represents the Promise object that 
is returned by an asynchronous function, where T is the type of the 
value the promise resolves to.
Imagine you have a User type:
type User = {
	id: number;
	firstName: string;
}
// Imagine also that you have a few user objects in a data store.
const users: User[] = [
	{id: 1, firstName: "Jane"},

	{id: 2, firstName: "Jon"},
]


If you wanted to create a type-safe function that retrieves a 
user by ID in an asynchronous way, you could do it like this:
async function getUserById (userId: number): Promise<User | null> {
	const foundUser = users.find(user => user.id === userId);

	if (!foundUser) {
		return  null;
	}

	return foundUser;
}

In this function, you are first declaring your function as asynchronous:
Then you are specifying that it accepts as the first parameter the user ID, 
which must be a number:

The return type of getUserById is a Promise that resolves to either 
User or null. You are using the union type User | null as the type 
parameter to the Promise generic.
User | null is the T in Promise<T>

Call your function using await and store the result in a variable called user:
async function runProgram () {
	const user = await getUserById(1);
	console.log(user)
}

runProgram()

Note: You are using a wrapper function called runProgram because 
you cannot use await in the top level of a file. Doing so would cause 
the TypeScript Compiler to emit the error 1375


Most of the time, TypeScript can infer the return type of your async 
function, just like it does with non-async functions. You can therefore 
omit the return type of the getUserById function, as it is still correctly 
inferred to have the type Promise<User | null>:

async function getUserById12 (userId: number) {
	const foundUser = users.find(user => user.id === userId);

	if(!foundUser) {
		return null;
	}

	return foundUser;
}

*/ 


/* Adding Types to Rest Parameters:
Rest parameters are a feature in JavaScript that allows a 
function to receive many parameters as a single array.

function sum (...args: number[]) {
	return args.reduce(
		(accu, item) => {
			return accu + item
		}	
	, 0)
}

 Notice the rest parameter args. The type is being set 
to an array of numbers: number[].

const sumResult1 = sum(2, 4, 6, 8);
console.log(sumResult1);
*/ 



/* Using Function Overloads
Programmers sometime need a function to accept different 
parameters depending on how the function is called. In 
JavaScript, this is normally done by having a parameter 
that may assume different types of values, like a string or 
a number. Setting multiple implementations to the same 
function name is called function overloading.

Imagine you have a User type:
// type User = {
// 	id: number;
// 	email: string;
// 	fullName: string;
// 	age: number;
// };

And you want to create a function that can look up a user 
using any of the following information:
id
email
age and fullName
You could create such a function like this:

function getUser(idOrEmailOrAge: number | string, fullName?: string): User | undefined {}

This function uses the | operator to compose a union of types for 
idOrEmailOrAge and for the return value.

function getUser(id: number): User | undefined;

function getUser(email: string): User | undefined;

function getUser(age: number, fullName: string): User | undefined;

function getUser(idOrEmailOrAge: number | string, fullName?: string): User | undefined {
	// code
}

This function has three overloads, one for each way to retrieve 
a user. When creating function overloads, you add the function 
overloads before the function implementation itself. The function 
overloads do not have a body; they just have the list of parameters 
and the return type.

// ****************************************
type User = {
	id: number;
	email: string;
	fullName: string;
	age: number;
};

const users: User[] = [
	{id: 1, email: "jane_doe@example.com", fullName: "Jane Doe", age: 35},

	{id: 2, email: "jon_doe@example.com", fullName: "Jon Doe", age: 35},
];


/**
 * Get a user by their ID.
 */
// function getUser(id: number): User | undefined;	//1

/**
 * Get a user by their email.
 */
// function getUser(email: string): User | undefined;  // 2

/**
 * Get a user by their age and full name.
 */
// function getUser(age: number, fullName: string): User | undefined; // 3

/**
 * Get a user by their email and full name.
 */
// function getUser(email: string, fullName: string): User | undefined; // 4


/*
function getUser(idOrEmailOrAge: number | string, fullName?: string): User | undefined {
	
	if (typeof idOrEmailOrAge === 'string') { // see d info below  //2 & 4
		return users.find(user => user.email === idOrEmailOrAge);
	}

	if (typeof fullName === 'string') {//3
		return users.find(user => user.age === idOrEmailOrAge && user.fullName === fullName);
	}else {//1
		return users.find(user => user.id === idOrEmailOrAge);
	}
}


const userById = getUser(1);  //1
const userByEmail = getUser("jon_doe@example.com"); //2
const userByAgeAndFullName = getUser(35, "Jon Doe");  //3
const userByEmailAndFullName = getUser("jane_doe@example.com", "Jon Doe");  //4

console.log(userById, userByEmail, userByAgeAndFullName, userByEmailAndFullName)

if idOrEmailOrAge is a string, then you can search for the user with the 
email key. The following conditional assumes idOrEmailOrAge is a number, 
so it is either the id or the age, depending on if fullName is defined.

 As soon as you type the function name and open the first parenthesis to call 
the function, a pop-up will appear with all the overloads available
getUser()
*/ 


/*

*/ 



/*

*/ 