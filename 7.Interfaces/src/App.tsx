import React from 'react';
import './App.css';








function App() {


	return (
		<div className="App">
			{/* {logger} */}
		</div>
	);
}

export default App;

/* Intro:
TypeScript offers multiple ways to represent objects in your code, 
one of which is using interfaces. Interfaces in TypeScript have 
two usage scenarios: you can create a contract that classes 
must follow, such as the members that those classes must 
implement, and you can also represent types in your application, 
just like the normal type declaration. 


You may notice that interfaces and types share a similar set 
of features; in fact, one can almost always replace the other. 
The main difference is that interfaces may have more than 
one declaration for the same interface, which TypeScript 
will merge, while types can only be declared once. You 
can also use types to create aliases of primitive types 
(such as string and boolean), which interfaces cannot do.
*/ 


/* Creating and Using Interfaces in TypeScript:
Interfaces are created by using the interface 
keyword followed by the name of the interface, 
and then a {} block with the body of the interface. 

interface Logger {
	log: (message: string) => void;
}

The Logger interface represents an object that has 
a single property called log.  This property is a 
function that accepts a single parameter of type 
string and returns void.

const logger: Logger = {
	log: (message) => console.log(message)
}

Values using the Logger interface as their type must 
have the same members as those specified in the 
Logger interface declaration. If some members are 
optional, they may be omitted.

Since values must follow what is declared in the 
interface, adding extraneous fields will cause a 
compilation error. e.g

const logger2: Logger ={
	log: (message) => console.log(message);

	otherProp: true;
}

In this case, the TypeScript Compiler would emit error 
2322, as this property(otherProp) does not exist in the 
Logger interface declaration.
*/ 


/* Extending Other Types:
When creating interfaces, you can extend from different 
object types, allowing your interfaces to include all the 
type information from the extended types. This enables 
you to write small interfaces with a common set of fields 
and use them as building blocks to create new interfaces.

Imagine you have a Clearable interface, such as this one:


interface Clearable {
	clear: () => void;
}

You could then create a new interface that extends from it, 
inheriting all its fields. In the following example, the interface 
Logger is extending from the Clearable interface

interface Logger extends Clearable {
	log: (message: string) => void;
}

The Logger interface now also has a clear member, which is 
a function that accepts no parameters and returns void. This 
new member is inherited from the Clearable interface. It is 
the same as if we did this:

interface Logger2 {
	log: (message: string) => void;

	clear: () => void;
}

When writing lots of interfaces with a common set of fields, 
you can extract them to a different interface and change your 
interfaces to extend from the new interface you created.

Returning to the Clearable example used previously, imagine 
that your application needs a different interface, such as the 
following StringList interface, to represent a data structure 
hat holds multiple strings:

interface StringList {
	push: (value: string) => void;

	get: () => string[];
}


By making this new StringList interface extend the existing 
Clearable interface, you are specifying that this interface 
also has the members set in the Clearable interface, adding 
the clear property to the type definition of the StringList 
interface:

interface StringList extends Clearable {
	push: (value: string) => void;

	get: () => string[];
}

Interfaces can extend from any object type, such as interfaces, 
normal types, and even classes.
*/ 



/* Interfaces with Callable Signature:
If the interface is also callable (that is, it is also a function), 
you can convey that information in the interface declaration 
by creating a callable signature.

A callable signature is created by adding a function declaration 
inside the interface that is not bound to any member and by using: 
instead of => when setting the return type of the function.

As an example, add a callable signature to your Logger interface
interface Logger {
	(message: string): void;

	log: (message: string) => void;
}

Notice that the callable signature resembles the type declaration 
of an anonymous function, but in the return type you are using: 
instead of =>. This means that any value bound to the Logger interface 
type can be called directly as a function.

To create a value that matches your Logger interface, you need to 
consider the requirements of the interface:
	It must be callable.
	It must have a property called log that is a function accepting 
	a single string parameter.

Let’s create a variable called logger that is assignable to the type 
of your Logger interface:


interface Logger {
	(message: string) : void;

	log: (message: string) => void;
}

const logger: Logger = (message: string) =>{
	console.log(message)
}

logger.log = (message: string) => {
	console.log(message);
}

To match the Logger interface, the value must be callable, which 
is why you assign the logger variable to a function:
You are then adding the log property to the logger function:

This is required by the Logger interface. Values bound to the 
Logger interface must also have a log property that is a 
function accepting a single string parameter and that returns void.

If you did not include the log property, the TypeScript Compiler 
would give you error 2741:

The TypeScript Compiler would emit a similar error if the log 
property in the logger variable had an incompatible type signature, 
like setting it to true:

interface Logger {
	(message: string): void;
	log: (message: string) => void;
}

const logger: Logger = (message: string) => {
	console.log(message);
}

logger.log = true;
*/ 



/* Interfaces with Index Signatures
You can add an index signature to your interface, just like 
you can with normal types, thus allowing the interface to 
have an unlimited number of properties.

For example, if you wanted to create a DataRecord interface 
that has an unlimited number of string fields

interface DataRecord {
	[key: string] : string;
}

You can then use the DataRecord interface to set the type of 
any object that has multiple parameters of type string:

const data: DataRecord = {
	fieldA: 'valueA',
	fieldB: 'valueB',
	fieldC: 'valueC',
}
*/ 


/* Differences Between Types and Interfaces:
So far, you have seen that the interface declaration and the 
type declaration are similar, having almost the same set of features.

For example, you created a Logger interface that extended 
from a Clearable interface:

interface Clearable {
	clear: () => void;
}

interface Logger extends Clearable {
	log: (message: string) => void;
}


The same type representation can be replicated by using 
two type declarations:

type Clearable = {
	clear: () => void;
}

type Logger = Clearable & {
	log: (message: string) => void;
}

As shown in the previous sections, the interface declaration 
can be used to represent a variety of objects, from functions 
to complex objects with an unlimited number of properties. 
This is also possible with type declarations, even extending 
from other types, as you can intersect multiple types together 
using the intersection operator &.

Since type declarations and interface declarations are so 
similar, you’ll need to consider the specific features unique 
to each one and be consistent in your codebase. Pick one 
to create type representations in your codebase, and only 
use the other one when you need a specific feature only 
available to it.

For example, the type declaration has a few features that 
the interface declaration lacks, such as:
	Union types.
	Mapped types.
	Alias to primitive types.

One of the features available only for the interface declaration 
is declaration merging. It is important to note that declaration 
merging may be useful if you are writing a library and want 
to give the library users the power to extend the types provided 
by the library, as this is not possible with type declarations.

Declaration Merging:
TypeScript can merge multiple declarations into a single one, 
enabling you to write multiple declarations for the same data 
structure and having them bundled together by the TypeScript 
Compiler during compilation as if they were a single type.

Interfaces in TypeScript can be re-opened; that is, multiple 
declarations of the same interface can be merged. This is 
useful when you want to add new fields to an existing interface.



interface DatabaseOptions {
	host: string,
	port: number,
	user: string;
	password: string;
}

This interface is going to be used to pass options when connecting to a database.

Later in the code, you declare an interface with the same name but 
with a single string field called dsnUrl, like this one:

interface DatabaseOptions {
	dnsUrl: string;
}

When the TypeScript Compiler starts reading your code, 
it will merge all declarations of the DatabaseOptions interface 
into a single one. From the TypeScript Compiler point of view, 
DatabaseOptions is now:

interface DatabaseOptions {
	host: string;
	port: number;
	user: string;
	password: string;
	dnsUrl: string;
}

The interface includes all the fields you initially declared, 
plus the new field dsnUrl that you declared separately. 
Both declarations have been merged.

Module Augmentation:
Declaration merging is helpful when you need to augment 
existing modules with new properties. One use-case for that 
is when you are adding more fields to a data structure provided 
by a library. This is relatively common with the Node.js library 
called express, which allows you to create HTTP servers.

When working with express, a Request and a Response object 
are passed to your request handlers (functions responsible 
for providing a response to a HTTP request). The Request 
object is commonly used to store data specific to a particular 
request. For example, you could use it to store the logged 
user that made the initial HTTP request:


const myRoute = (req: Request, res: Response) => {
	res.json(
		{
			user: req.user
		}
	)
}

declare global {
	namespace Express {
	    // These open interfaces may be extended in an application-specific manner via declaration merging.
	    // See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)
	    interface Request {}
	    interface Response {}
	    interface Application {}
	}
}


Type declaration files are files that only contain type information. 
The DefinitelyTyped repository is the official repository to submit 
type declarations for packages that do not have one. 
The @types/<package> packages available on npm are published 
from this repository.

To use module augmentation to add a new property to the Request 
interface, you have to replicate the same structure in a local type 
declaration file. For example, imagine that you created a file 
named express.d.ts like the following one and then added it to the 
types option of your tsconfig.json:


import 'express';

declare global {
	namespace Express {
		interface Request {
			user: {
				name: string;
			}
		}
	}
}

From the TypeScript Compiler point of view, the Request 
interface has a user property, with their type set to an object 
having a single property called name of type string. This 
happens because all the declarations for the same interface 
are merged.
*/ 
