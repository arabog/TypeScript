import React from 'react';
import './App.css';


// https://www.digitalocean.com/community/tutorial_series/how-to-code-in-typescript

// https://www.typescriptlang.org/play?ts=4.2.2#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBBCcQQ0MwAUVWDEQC0gADVHBQGNJ3KAALygABEAAkYNAMOB4GRonzFBTBPB3AERcwABS0+mM9ysygc9wASmCKhwzQ8ZC8iHFzmB7BoXzcZmY7AYzEg-Fg0HUiQ58D0Ii8fLpDKZgj5SWxfPADlQAHJhAA5SASPlBFQAeS+ZHegmdWkgR1QjgUrmkeFATjNOmGWH0KAQiGhwkuNok4uiIgMHGxCyYrA4PCCJSAA

// https://www.typescriptlang.org/play?ts=4.2.2#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBBCcQQ0MwAUVWDEQC0gADVHBQGNJ3KAALygABEAAkYNAMOB4GRonzFBTBPB3AERcwABS0+mM9ysygc9wASmCKhwzQ8ZC8iHFzmB7BoXzcZmY7AYzEg-Fg0HUiQ58D0Ii8fLpDKZgj5SWxfPADlQAHJhAA5SASPlBFQAeS+ZHegmdWkgR1QjgUrmkeFATjNOmGWH0KAQiGhwkuNok4uiIgMHGxCyYrA4PCCJSAA


// strings
/*const language: string = "Typscript";

const message: string = `I'm programming in ${language}`*/

// boolean
/*const hasErrors: boolean = true;

const isValid: boolean = false;*/

// numbers
/*const myNumber : number = 2343;

const year: number = 2022;*/

// BigInt
// const bigNumber: bigint = 9007199254740993n;

// symbol
// const mySymbol: symbol = Symbol('unique-symbol-value');

// arr
// const primeNumbers: number[] = [2, 3, 5, 7, 11];
// const primeNumbers: Array<number> = [2, 3, 5, 7, 11];
const primeNumbers: any[] = [2, 3, 5, 7, 11, "egg", "goals"];

// tuples
const position: [number, number] = [1, 2];


// any
/* Using "any" means opting-out of type checking, 
and is the same as making the TypeScript 
Compiler ignore that value. */

let thisCanBeAnyth: any = 12345;

thisCanBeAnyth = "I can be anyth -- look, I'm a string now";

thisCanBeAnyth = ["Now I'm an array - This is almost like pure JS"]

// unknown
// let code: unknown;
// N.B: You are using let because you are going to assign a new value to that variable.

/*To understand the differences between the unknown and any types, 
you can think of unknown as “I do not know the type of that value” 
and any as “I do not care what type this value holds”. */ 

// void
// function doSomething() {};

// const resultOfVoidFunction: void = doSomething();

// null & undefined
/*const someNullField: null = null;
const someUndefinedField: undefined = undefined;
 
These are especially useful when creating your own custom types */


// never
/*
The never type is the type of a value that will never exist. 
For example, imagine you create a numeric variable:

const year: number = 2021;
 
If you create an if block to run some code if year is not a number, 
it could be like the following:

if (typeof year !== "number") {
	year;
}
 
The type of the variable year inside that if block is going to be 
never. This is because, since year is typed as number, the 
condition for this if block will never be met. You can think 
of the never type as an impossible type because that variable 
can’t have a value at this point.
*/ 


// object
/*
object
The object type represents any type that is not a primitive type. 
This means that it is not one of the following types:
number
string
boolean
bigint
symbol
null
undefined
The object type is commonly used to describe object literals because 
any object literal can be assigned to it:

const programmingLanguage: object = {
	name: "TypeScript"
};

Note: There is a much better type than object that could be used in 
this case called Record. This has to do with creating custom types 
and is covered in a later tutorial in this series.
*/ 


function App() {
	const myNumber : number = 2343;


	return (
		<div className="App">
			{myNumber} {" "}

			{primeNumbers} {" "} {" "}	 

			{position}	{""}

			{thisCanBeAnyth}	
		</div>
	);
}

export default App;

// https://favourdaniel.hashnode.dev/introduction-to-cloud-computing-for-beginners
// https://www.digitalocean.com/community/tutorials/a-general-introduction-to-cloud-computing?__cf_chl_managed_tk__=nCR8ndrTnNdihgIOP.KU9u_ICCPBYZc8FirgDWpMYBI-1641741392-0-gaNycGzNDiU

