import React from 'react';
import './App.css';

// https://react-hook-form.com/get-started/

// Passing Type Parameters Directly:

function App() {
  return <div className="App">Generics</div>;
}

export default App;

/* Intro:
Generics are a fundamental feature of statically-typed languages, 
allowing developers to pass types as parameters to another type, 
function, or other structure. When a developer makes their 
component a generic component, they give that component the 
ability to accept and enforce typing that is passed in when the 
component is used, which improves code flexibility, makes 
components reusable, and removes duplication.

TypeScript fully supports generics as a way to introduce 
type-safety into components that accept arguments and 
return values whose type will be indeterminate until they 
are consumed later in your code.
*/

/* Generics Syntax:
Generics appear in TypeScript code inside angle brackets, 
in the format <T>, where T represents a passed-in type. 
<T> can be read as a generic of type T. In this case, T will 
operate in the same way that parameters work in functions, 
as placeholders for a type that will be declared when an 
instance of the structure is created. The generic types 
specified inside angle brackets are therefore also known 
as generic type parameters or just type parameters. 
Multiple generic types can also appear in a single 
definition, like <T, K, A>.

Generics can appear in functions, types, classes, and interfaces.

Imagine that you have a JavaScript function that takes two 
parameters: an object and an array of keys. The function 
will return a new object based on the original one, but with 
only the keys you want


function pickObjectKeys(obj, keys) {
	let result = {}

	for (const key of keys) {
		if (key in obj) {
			key		value
			result[key] = obj[key]
		}
	}

	return result;
}


This snippet shows the pickObjectKeys() function, 
which iterates over the keys array and creates a new 
object with the keys specified in the array.

Here is an example showing how to use the function

const language = {
	name: 'TypeScript',
	age: 8,
	extensions: ['ts', 'tsx']
}

const ageAndExtensions = pickObjectKeys(language, ['age', 'extensions']);

console.log(ageAndExtensions)


If you were to migrate this code to TypeScript to make it type-safe, 
you would have to use generics. You could refactor the code by 
adding the following lines:


function pickObjectKeys<T, K extends keyof T> (obj: T, keys: K[]) {
	let result = {} as Pick<T, K>

	for (const key of keys) {
		if (key in obj) {
			// key		value
			result[key] = obj[key]
		}
	}

	return result;
}

const language = {
	name: 'TypeScript',
	age: 8,
	extensions: ['ts', 'tsx']
}

const ageAndExtensions = pickObjectKeys(language, ['age', 'extensions']);

console.log(ageAndExtensions)


<T, K extends keyof T> declares two parameter types for the function, 
where K is assigned a type that is the union of the keys in T. The obj 
function parameter is then set to whatever type T represents, and 
keys to an array of whatever type K represents. Since T in the case 
of the language object sets age as a number and extensions as an 
array of strings, the variable ageAndExtensions will now be 
assigned the type of an object with properties age: number and 
extensions: string[].

This enforces a return type based on the arguments supplied 
to pickObjectKeys, allowing the function the flexibility to 
enforce a typing structure before it knows the specific type it 
needs to enforce. This also adds a better developer experience 
when using the function in an IDE like Visual Studio Code, 
which will create suggestions for the keys parameter based on 
the object you provided. i.e

const ageAndExtensions = pickObjectKeys(language, ['']);
*/

/* Using Generics with Function:
One of the most common scenarios for using generics 
with functions is when you have some code that is not 
easily typed for all use cases. In order to make the function 
apply to more situations, you can include generic typing. 
In this step, you will run through an example of an identity 
function to illustrate this. You will also explore an asynchronous 
example of when to pass type parameters into your generic directly, 
and how to create constraints and default values for your generic 
type parameters.


Assigning Generic Parameters
Take a look at the following function, which returns what was 
passed in as the first argument:


function identity(value) {
	return value;
}

You could add the following code to make the function 
type-safe in TypeScript:

function identity<T> (value: T): T {
	return value;
}

You turned your function into a generic function that accepts 
the generic type parameter T, which is the type of the first 
argument, then set the return type to be the same with : T.

Next, add the following code to try out the function:

const result = identity(123);
const result = identity("God");
console.log(result)


result has the type 123, which is the exact number that you 
passed in. TypeScript here is inferring the generic type from 
the calling code itself. This way the calling code does not 
need to pass any type parameters. You can also be explicit 
and set the generic type parameters to the type you want:

const result = identity<number>(123);

In this code, result has the type number. By passing in the 
type with the <number> code, you are explicitly letting 
TypeScript know that you want the generic type parameter 
T of the identity function to be of type number. This will 
enforce the number type as the argument and the return 
value.


Passing Type Parameters Directly:
Passing type parameters directly is also useful when using 
custom types. 


type ProgrammingLang = {
	name: string;
};

function identity<T> (value: T): T {
	return value;
}

const result = identity<ProgrammingLang>({name: 'TypeScript'});

console.log(result);

In this code, result has the custom type ProgrammingLanguage 
because it is passed in directly to the identity function. If you did 
not include the type parameter explicitly, result would have the 
type { name: string } instead.

Another example that is common when working with JavaScript is 
using a wrapper function to retrieve data from an API:

async function fetchApi(path: string) {
	const response = await fetch(`https://example.com/api${path}`)
	return response.json();
}

This asynchronous function takes a URL path as an argument, uses the 
fetch API to make a request to the URL, then returns a JSON response 
value. In this case, the return type of the fetchApi function is going to be 
Promise<any>, which is the return type of the json() call on the fetch’s 
response object.

Having any as a return type is not very helpful. any means any JavaScript 
value, and by using it you are losing static type-checking, one of the main 
benefits of TypeScript. If you know that the API is going to return an 
object in a given shape, you can make this function type-safe by using 
generics:

async function fetchApi<ResultType> (path: string): Promise<ResultType> {
	const response = await fetch(`https://example.com/api${path}`);

	return response.json();
}


This turns your function into a generic function that accepts the 
ResultType generic type parameter. This generic type is used in 
the return type of your function: Promise<ResultType>.

Note: As your function is async, you must return a Promise object. 
The TypeScript Promise type is itself a generic type that accepts 
the type of the value the promise resolves to.

If you take a closer look at your function, you will see that the 
generic is not being used in the argument list or any other 
place that TypeScript would be able to infer its value. This 
means that the calling code must explicitly pass a type for 
this generic when calling your function.

Here is a possible implementation of the fetchApi generic 
function to retrieve user data:

type User = {
	name: string;
}

async function fetchApi<ResultType> (path: string): Promise<ResultType> {
	const response = await fetch(`https://example.com/api${path}`)

	return response.json();
}

const data = await fetchApi<User[]> ('/users')

export {}

In this code, you are creating a new type called User and using an array 
of that type (User[]) as the type for the ResultType generic parameter. 
The data variable now has the type User[] instead of any.

Note: As you are using await to asynchronously process the result of your 
function, the return type is going to be the type of T in Promise<T>, 
which in this case is the generic type ResultType.


Default Type Parameters
Creating your generic fetchApi function like you are doing, the calling 
code always has to provide the type parameter. If the calling code does 
not include the generic type, ResultType would be bound to unknown. 
Take for example the following implementation:

async function fetchApi<ResultType>(path: string): Promise<ResultType> {
	const response = await fetch(`https://example.com/api${path}`);
	return response.json();
}

const data = await fetchApi('/users')

console.log(data.a)

export {}

This code tries to access a theoretical a property of data. But since the 
type of data is unknown, this code will not be able to access a property 
of the object.

If you are not planning to add a specific type to every single call of your 
generic function, you can add a default type to the generic type parameter. 
This can be done by adding = DefaultType right after the generic type, 
like this:

async function fetchApi<ResultType = Record<string, any> >(path: string): Promise<ResultType> {
	const response = await fetch(`https://example.com/api${path}`)
	return response.json();
}

const data = await fetchApi('/users')

console.log(data.a)

export {}


With this code, there is no longer a need for you to pass a type to the 
ResultType generic parameter when calling the fetchApi function, 
as it has a default type of Record<string, any>. This means TypeScript 
will recognize data as an object with keys of type string and values of 
type any, allowing you to access its properties.


Type Parameters Constraints:
In some situations, a generic type parameter needs to allow only certain 
shapes to be passed into the generic. To create this additional layer of 
specificity to your generic, you can put constraints on your parameter.

Imagine you have a storage constraint where you are only allowed to 
store objects that have string values for all their properties. For that, 
you can create a function that takes any object and returns another 
object with the same keys as the original one, but with all their values 
transformed to strings. This function will be called 
stringifyObjectKeyValues.

function stringifyObjectKeyValues <T extends Record<string, any>>(obj: T) {
	return Object.keys(obj).reduce((acc, key) => ({
		...acc,

		// [key] means that the property name should be taken from key.
		[key]: JSON.stringify(obj[key])
	}), {} as { [K in keyof T]: string})
}


In this code, stringifyObjectKeyValues uses the reduce array method to 
iterate over an array of the original keys, stringifying the values and 
adding them to a new array.

To make sure the calling code is always going to pass an object to your 
function, you are using a type constraint on the generic type T:

...   extends Record<string, any> ....

extends Record<string, any> is known as generic type constraint, and it 
allows you to specify that your generic type must be assignable to the type 
that comes after the extends keyword. In this case, Record<string, any> 
indicates an object with keys of type string and values of type any. 

When calling reduce, the return type of the reducer function is based 
on the initial value of the accumulator. The {} as { [K in keyof T]: string } 
code sets the type of the initial value of the accumulator to 
{ [K in keyof T]: string } by using a type cast on an empty object, {}. 
The type { [K in keyof T]: string } creates a new type with the same 
keys as T, but with all the values set to have the string type. This is 
known as a mapped type, which this tutorial will explore further 
in a later section.


The following code shows the implementation of your stringifyObjectKeyValues 
function:

function stringifyObjectKeyValues<T extends Record<string, any>> (obj: T) {
	return Object.keys(obj).reduce((acc, key) =>  ({
		...acc,

		[key]: JSON.stringify(obj[key])
	}), {} as { [K in keyof T]: string })
}

const stringifiedValues = stringifyObjectKeyValues({a: "1", b: 2, c: true, d: [1, 2, 3]})

The variable stringifiedValues will have the following type:

{
	a: string;
	b: string;
	c: string;
	d: string;
}
 
This will ensure that the return value is consistent with the purpose of the function.
*/


/* Using Generics with Interfaces, Classes, and Types:
When creating interfaces and classes in TypeScript, it can be useful to use 
generic type parameters to set the shape of the resulting objects. For example, 
a class could have properties of different types depending on what is passed in 
to the constructor. In this section, you will see the syntax for declaring generic 
type parameters in classes and interfaces and examine a common use case in 
HTTP applications.

Generic Interfaces and Classes:
To create a generic interface, you can add the type parameters list right after 
the interface name:

interface MyInterface<T> {
	field: <T></T>
}

This declares an interface that has a property field whose type is determined 
by the type passed in to T.

For classes, it’s almost the same syntax:

class MyClass<T> {
	field: T

	constructor(field:T) {
		this.field = field
	}
}

One common use case of generic interfaces/classes is for when you 
have a field whose type depends on how the client code is using the 
interface/class. Say you have an HttpApplication class that is used 
to handle HTTP requests to your API, and that some context value 
is going to be passed around to every request handler. One such 
way to do this would be:

class HttpApplication<Context> {
	context: Context
		constructor(context: Context) {
		this.context = context;
	}

	// ... implementation

	get(url: string, handler: (context: Context) => Promise<void>): this {
		// ... implementation
		return this;
	}
}


This class stores a context whose type is passed in as the type of the argument 
for the handler function in the get method. During usage, the parameter type 
passed to the get handler would correctly be inferred from what is passed to 
the class constructor.

...
const context = { someValue: true };
const app = new HttpApplication(context);

app.get('/api', async () => {
	console.log(context.someValue)
});


In this implementation, TypeScript will infer the type of 
context.someValue as boolean.
*/ 



/* Generic Types:
The syntax for applying generics to types is similar to 
how they are applied to interfaces and classes.

type MyIdentityType<T> = T

This generic type returns the type that is passed as the type parameter. 
Imagine you implemented this type with the following code:

...
type B = MyIdentityType<number>

In this case, the type B would be of type number.

Generic types are commonly used to create helper types, especially 
when using mapped types. TypeScript provides many pre-built helper 
types. One such example is the Partial type, which takes a type T 
and returns another type with the same shape as T, but with all their 
fields set to optional. The implementation of Partial looks like this:

type Partial<T> = {
	[P in keyof T]?: T[P];
};
 
The type Partial here takes in a type, iterates over its property types, 
then returns them as optional in a new type.


Note: Since Partial is already built in to TypeScript, compiling this 
code into your TypeScript environment would re-declare Partial and 
throw an error. The implementation of Partial cited here is only for 
illustrative purposes.

Note: Since Partial is already built in to TypeScript, compiling 
this code into your TypeScript environment would re-declare 
Partial and throw an error. The implementation of Partial 
cited here is only for illustrative purposes.

{
	ABC: {
		ABC: null,
		DEF: 12,
		GHI: 13,
	},

	DEF: {
		ABC: 12,
		DEF: null,
		GHI: 17,
	},

	GHI: {
		ABC: 13,
		DEF: 17,
		GHI: null,
	},
}

This object is a collection of objects that represent the store location. 
Within each store location, there are properties that represent the 
cost to ship to other stores. For example, the cost to ship from ABC 
to DEF is 12. The shipping cost from one store to itself is null, as 
there will be no shipping at all.

To ensure that locations for other stores have a consistent value and
that a store shipping to itself is always null, you can create a generic 
helper type:

type IfSameKeyThanParentTOtherwiseOtherType<Keys extends string, T, OtherType> = {
	[K in Keys]: {
		[SameThanK in K]: T;
	} &
	{ [OtherThanK in Exclude<Keys, K>]: OtherType };
};

The type IfSameKeyThanParentTOtherwiseOtherType receives three 
generic types. The first one, Keys, are all the keys you want to make 
sure your object has. In this case, it is a union of all the stores’ codes. 
T is the type for when the nested object field has the same key as the 
key on the parent object, which in this case represents a store 
location shipping to itself. Finally, OtherType is the type for when 
the key is different, representing a store shipping to another store.

You can use it like this:

...
type Code = 'ABC' | 'DEF' | 'GHI'

const shippingCosts: IfSameKeyThanParentTOtherwiseOtherType<Code, null, number> = {
	ABC: {
		ABC: null,
		DEF: 12,
		GHI: 13,
	},

	DEF: {
		ABC: 12,
		DEF: null,
		GHI: 17,
	},

	GHI: {
		ABC: 13,
		DEF: 17,
		GHI: null,
	},
}


This code is now enforcing the type shape. If you set any of the keys 
to an invalid value, TypeScript will give us an error:

...
const shippingCosts: IfSameKeyThanParentTOtherwiseOtherType<Code, null, number> = {
	ABC: {
		ABC: 12,
		DEF: 12,
		GHI: 13,
	},

	DEF: {
		ABC: 12,
		DEF: null,
		GHI: 17,
	},

	GHI: {
		ABC: 13,
		DEF: 17,
		GHI: null,
	},
}

Since the shipping cost between ABC and itself is no longer null, 
TypeScript will throw the following error:

You have now tried out using generics in interfaces, classes, and 
custom helper types. Next, you will explore further a topic that 
has already come up a few times in this tutorial: creating mapped 
types with generics.
*/ 



/* Creating Mapped Types with Generics:


*/ 

/*Creating Conditional Types with Generics:

*/