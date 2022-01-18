// import { type } from 'os';
import React from 'react';
import './App.css';

// type Programmer = {
// //   /**
//    * The full name of the Programmer
//   */
 
//   name: string;

  /**
   * This programmer is known for what
   */
//   knownFor: string[]; //arr of str
// };

// const ada: Programmer = {
//   name: 'Ada Lovelace',
//   knownFor:  ['Mathematics', 'Computing', 'First Programmer'];
// }

// const ada: Programmer = {
//   name: "Ada",

//   knownFor:  ['Mathematics', 'Computing', 'First Programmer'],
  
// }


// nested custom types
// type Person = {
// 	name: string;
// };

// type Company = {
// 	name: string,

// 	manager: Person,
// };

// const manager: Person = {
// 	name: "John Doe",
// }

// const company: Company = {
// 	name:'ACME',

// 	manager,
// }

// Or
// const company: Company = {
// 	name: "ACME",

// 	manager: {
// 		name: "John Doe"
// 	}
// }




function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;


// optnal ppties

// type Programmer = {
// 	name: string;

// 	knownFor ?: string[];
// }

// const ada: Programmer = {
// 	name: "Ada Lovelace",
// }

// indexable types
// type Data = {
// 	[key: string] : any;
// }

// const smData: Data = {
// 	status: true,

// 	smBooleanKey: true,

// 	smStringKey: 'text goes here',
// }

// Unions: |
// type ProductCode = number | string;

// const productCodeA: ProductCode = "this works";

// const productCodeB: ProductCode = 1234


// intersection: &
// type StatusResp = {
// 	status: number;

// 	isValid: boolean;
// }

// type User = {
// 	name: string;
// }

// type GetUserResponse = {
// 	user: User;
// }

// To create the resulting response of a specific API User call using an intersection type, combine both StatusResponse and GetUserResponse types:
// type ApiGetUserResp = StatusResp & GetUserResponse;

/*
The type ApiGetUserResponse is going to have all the properties 
available in StatusResponse and those available in GetUserResponse.

The following example will work:
*/ 
// let response: ApiGetUserResp = {
// 	status: 200,

// 	isValid: true,

// 	user: {
// 		name: "Sammy"
// 	}
// }


// type UserRoleRow = {
// 	role: string;
// }

// type UserRow = {
// 	name: string;
// }


// type UserWithRoleRow = UserRow & UserRoleRow;

// Later, if you used a fetchRowsFromDatabase() function like the following:
// const joinedRow: UserWithRoleRow = fetchRowsFromDatabase()
/*
The resulting constant joinedRows would have to have a role property 
and a name property that both held string values in order to pass the 
type checker.
*/ 

// Using Template Strings Types
// type StringThatStartsWithGet = `get${string}`;

// const myStr: StringThatStartsWithGet = 'getAbc';

/**
 * myString will pass the type checker here because the 
 * string starts with get then is followed by an additional string.

If you passed an invalid value to your type, like the following 
invalidStringValue:
 */

// type StringThatStartsWithGet = `get${string}`;

// const invalidStringValue: StringThatStartsWithGet = 'something'


// Using Type Assertions:  is a way to change the type of a variable to another type
/*
Type assertions are made possible by adding as NewType after your 
variable. This will change the type of the variable to that specified 
after the as keyword.
*/ 

// const valueA: any = 'something';

// const valueB = valueA as string;

/*
valueA has the type any, but, using the as keyword, 
this code coerces the valueB to have the type string.

Note: To assert a variable of TypeA to have the type 
TypeB, TypeB must be a subtype of TypeA. Almost all 
TypeScript types, besides never, are a subtype of any, 
including unknown.
*/ 


// Unity Types
// In your indexable types example, you had the following type:

// type Data = {
// 	[key: string]: any;
// };
 
// You can use the Record utility type instead of an indexable type like this:

// type Data = Record<string, any>;

/*
The first type parameter of the Record generic is the type of 
each key. In the following example, all the keys must be strings:

The second type parameter is the type of each value of 
those keys. The following would allow the values to be any:


Omit<Type, Fields>:
The Omit utility type is useful to create a new type based on 
another one, while excluding some properties you do not 
want in the resulting type.

Imagine you have the following type to represent the type 
of a user row in a database:

*/ 

// type UserRow = {
// 	id: number;
// 	name: string;
// 	email: string;
// 	addressId: string;
// };

/*
If in your code you are retrieving all the fields but the 
addressId one, you can use Omit to create a new type 
without that field:
*/ 
// type UserRowWithoutAddressId = Omit<UserRow, 'addressId'>;

/*
You can pass multiple fields to the second type parameter using a 
union of strings. Say you also wanted to omit the id field, you 
could do this:
*/ 

// type UserRowWithoutIds = Omit<UserRow, 'id' | 'addressId'>;

// Pick<Type, Fields>
/*The Pick utility type is the exact opposite of the Omit type. 
Instead of saying the fields you want to omit, you specify the 
fields you want to use from another type.

Using the same UserRow you used before:*/

// type UserRow = {
// 	id: number;
// 	name: string;
// 	email: string;
// 	addressId: string;
// };

// type UserRowWithEmailOnly = Pick<UserRow, 'email'>;

/*
The first argument to Pick here specifies the type you 
are basing the new type on. The second is the key that 
you would like to include.

You are also able to pick multiple fields using an union of strings:
*/ 

// type UserRowWithEmailOnly = Pick<UserRow, 'name' | 'email'>;

// Partial<Type>:
/*
To create a new type where all properties are optional, 
you can use the Partial<Type> utility type like the following:
*/ 
type UserRow = {
	id: number;
	name: string;
	email: string;
	addressId: string;
};

// type UserRowInsert = Partial<UserRow>;

// This is exactly the same as having your UserRowInsert like this:
type UserRowInsert = {
	id?: number | undefined;
	name?: string | undefined;
	email?: string | undefined;
	addressId?: string | undefined;
};