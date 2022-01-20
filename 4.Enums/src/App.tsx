import React from 'react';
import './App.css';


// Using Bit Flags with TypeScript Enums:
/*Bit flags are a way to represent different boolean-like options 
into a single variable, by using bitwise operations. For this to 
work, each flag must use exactly one bit of a 32-bit number, 
as this is the max value allowed by JavaScript when doing 
bitwise operations. The max 32-bit number is 2,147,483,647, 
which in binary is 1111111111111111111111111111111, so you 
have 31 possible flags.


Imagine you are building a game, and the player may have different 
skills, like SKILL_A, SKILL_B, and SKILL_C. To make sure your 
program knows when a player has a certain skill, you can make 
flags that can be turned on or off, depending on the player’s status.

With the following pseudocode, give each skill flag a binary value:

SKILL_A = 0000000000000000000000000000001
SKILL_B = 0000000000000000000000000000010
SKILL_C = 0000000000000000000000000000100
You can now store all the current skills of the player in a single 
variable, by using the bitwise operator | (OR):

playerSkills = SKILL_A | SKILL_B
In this case, assigning a player the bit flag 
0000000000000000000000000000001 and the bit flag 
0000000000000000000000000000010 with the | operator will 
yield 0000000000000000000000000000011, which will represent 
the player having both skills.

You are also able to add more skills:

playerSkills |= SKILL_C
This will yield 0000000000000000000000000000111 to indicate 
that the player has all three skills.


You can also remove a skill using a combination of the bitwise o
perators & (AND) and ~ (NOT):

playerSkills &= ~SKILL_C
Then to check if the player has a specific skill, you use the bitwise 
operator & (AND):

hasSkillC = (playerSkills & SKILL_C) == SKILL_C
If the player does not have the SKILL_C skill, the (playerSkills & SKILL_C) 
part is going to evaluate to 0. Otherwise (playerSkills & SKILL_C) evaluates 
to the exact value of the skill you are testing, which in this case is 
SKILL_C (0000000000000000000000000000010). This way you can test 
that the evaluated value is the same as the value of the skill you are testing 
it against.


As TypeScript allows you to set the value of enum members to integers, 
you can store those flags as an enum:

enum PlayerSkills {
	SkillA = 0b0000000000000000000000000000001,
	SkillB = 0b0000000000000000000000000000010,
	SkillC = 0b0000000000000000000000000000100,
	SkillD = 0b0000000000000000000000000001000,
};

You can use the prefix 0b to represent binary numbers directly. If you do 
not want to use such big binary representations, you can use the bitwise 
operator << (left shift):

enum PlayerSkills {
	SkillA = 1 << 0,
	SkillB = 1 << 1,
	SkillC = 1 << 2,
	SkillD = 1 << 3,
};

1 << 0 will evaluate to 0b0000000000000000000000000000001, 
1 << 1 to 0b0000000000000000000000000000010, 
1 << 2 to 0b0000000000000000000000000000100, and 
1 << 3 to 0b0000000000000000000000000001000.

Now you can declare your playerSkills variable like this:

let playerSkills: PlayerSkills = PlayerSkills.SkillA | PlayerSkills.SkillB;

Note: You must explicitly set the type of the playerSkills variable to be 
PlayerSkills, otherwise TypeScript will infer it to be of type number.

To add more skills, you would use the following syntax:

playerSkills |= PlayerSkills.SkillC;

You can also remove a skill:

playerSkills &= ~PlayerSkills.SkillC;

Finally, you can check if the player has any given skill using your enum:

const hasSkillC = (playerSkills & PlayerSkills.SkillC) === PlayerSkills.SkillC;

While still using bit flags under the hood, this solution provides a more 
readable and organized way to display the data. It also makes your code 
more type-safe by storing the binary values as constants in an enum, and 
throwing errors if the playerSkills variable does not match a bit flag.


*/ 









function App() {
	return (
		<div className="App">
			Hello
		</div>
	);
}

export default App;


/* Enumerated types: Intro
In TypeScript, enums, or enumerated types, are data 
structures of constant length that hold a set of constant 
values

Enums are useful when setting properties or values that 
can only be a certain number of possible values. One 
common example is the suit value of a single card in 
a deck of playing cards. Every card that is drawn will 
either be a club, a diamond, a heart, or a spade; there 
are no possible suit values beyond these four, and these 
possible values are not likely to change. Because of this, 
an enum would be an efficient and clear way to describe 
the possible suits of a card


TypeScript translates enums into JavaScript objects in 
the final code emitted by the compiler.


Creating Enums in TypeScript:
The data is arranged in a set of key/value pairs. While 
the keys must be strings, as with JavaScript objects in 
general, the values for enum members are often 
auto-incremented numbers that mainly serve to 
distinguish one member from the other. Enums with 
only number values are called numeric enums.

enum CardinalDirection {
	North = 1,
	East,
	South,
	West,
}

In this example, you are making an enum called 
CardinalDirection, which has a member that 
represents each of the cardinal directions.

You used the number 1 as the value of the first 
member of your CardinalDirection enum. This 
assigns the number 1 to be the value of North. 
However, you did not assign values to the other 
members. This is because TypeScript automatically 
sets the remaining members to the value of the previous 
member plus one. CardinalDirection.East would have 
the value 2, CardinalDirection.South would have the 
value 3, and CardinalDirection.West would have the value 4.

This behavior only works with numeric enums that 
have only number values for each member.

You can also completely ignore setting the value of the enum members:

enum CardinalDirection {
	North,
	East,
	South,
	West,
};


In this case, TypeScript is going to set the first member to 0, 
and then set the other ones automatically based on that one, 
incrementing each by one. This will result in code identical 
to the following:

enum CardinalDirection {
	North = 0,
	East = 1,
	South = 2,
	West = 3,
};


The TypeScript compiler defaults to assigning numbers to enum 
members, but you can override this to make a string enum. 

enum CardinalDirection {
	North = 'N',
	East = 'E',
	South = 'S',
	West = 'W'
}
*/ 



/*Bi-directional Enum Members
Upon TypeScript compilation, enums are translated into 
JavaScript objects. However, there are a few features of 
enums that differentiate them from objects. They offer a 
more stable data structure for storing constant members 
than traditional JavaScript objects, and also offer 
bi-directional referencing for enum members.

This becomes the following code when compiled to 
JavaScript using the TypeScript compiler:

"use strict";
var CardinalDirection;

(function (CardinalDirection) {
	CardinalDirection["North"] = "N";
	CardinalDirection["East"] = "E";
	CardinalDirection["South"] = "S";
	CardinalDirection["West"] = "W";
})(CardinalDirection || (CardinalDirection = {}));

In this code, the "use strict" string starts strict mode, a more 
restrictive version of JavaScript. After that, TypeScript creates 
a variable CardinalDirection with no value. The code then 
contains an immediately invoked function expression (IIFE) 
that takes the CardinalDirection variable as an argument, 
while also setting its value to an empty object ({}) if it has 
not already been set.

Inside the function, once CardinalDirection is set as an empty 
object, the code then assigns multiples properties to that object
Notice that each property is one member of your original enum, 
with the values set to the enum’s member value.
For string enums, this is the end of the process.


But next you will try the same thing with the numeric enum from 
the last section:

enum CardinalDirection {
	North = 1,
	East,
	South,
	West,
};

This will result in the following code, with the highlighted sections added:

"use strict";
var CardinalDirection;

(function (CardinalDirection) {
	CardinalDirection[CardinalDirection["North"] = 1] = "North";
	CardinalDirection[CardinalDirection["East"] = 2] = "East";
	CardinalDirection[CardinalDirection["South"] = 3] = "South";
	CardinalDirection[CardinalDirection["West"] = 4] = "West";
})(CardinalDirection || (CardinalDirection = {}));

In addition to each member of the enum becoming a property of 
the object (CardinalDirection["North"] = 1]), the enum also creates 
a key for each number and assigns the string as the value. In the 
case of North, CardinalDirection["North"] = 1 returns the value 1, 
and CardinalDirection[1] = "North" assigns the value "North" to 
the key "1".

This allows for a bi-directional relationship between the names of 
the numeric members and their values. To test this out, log the 
following:

console.log(CardinalDirection.North)

This will return the value of the "North" key:

Output
1

Next, run the following code to reverse the direction of the reference:

console.log(CardinalDirection[1])

The output will be:
Output
"North"

To illustrate the final object that represents the enum, log the entire 
enum to the console:

console.log(CardinalDirection)

This will show both of the sets of key/value pairs that create the 
bi-directionality effect:

Output
{
	"1": "North",
	"2": "East",
	"3": "South",
	"4": "West",

	"North": 1,
	"East": 2,
	"South": 3,
	"West": 4
} 
*/ 



/* Using Enums in TypeScript:
enum CardinalDirection {
	North = 'N',
	East = 'E',
	South = 'S',
	West = 'W'
}


const direction: CardinalDirection = CardinalDirection.North;


Notice that you are setting the variable to have the enum as its type:

You are also setting the variable value to be one of the members of 
the enum, in this case CardinalDirection.North. You can do this 
because enums are compiled to JavaScript objects, so they also 
have a value representation in addition to being types.

If you pass a value that is not compatible with the enum type of 
your direction variable, like this:

const direction: CardinalDirection = false;

The TypeScript compiler is going to display the error 2322:

direction can therefore only be set to a member of the CardinalDirection enum.

You are also able to set the type of your variable to a specific enum member:

enum CardinalDirection {
	North = 'N',
	East = 'E',
	South = 'S',
	West = 'W',
};

const direction: CardinalDirection.North = CardinalDirection.North;


In this case, the variable can only be assigned to the North member 
of the CardinalDirection enum.

If the members of your enum have numeric values, you can also set 
the value of your variable to those numeric values. 

enum CardinalDirection {
	North = 1,
	East,
	South,
	West,
};

You can set the value of a variable of type CardinalDirection to 1:
const direction: CardinalDirection = 1;

This is possible because 1 is the value of the North member of your 
CardinalDirection enum. This only works for numeric members of 
the enum, and it relies on the bi-directional relationship the compiled 
JavaScript has for numeric enum members
*/ 



/* Extracting the Object Type of Enums:
Enum data structure itself has a type,

Try to create an object that matches your enum, like the following:

enum CardinalDirection {
	North = 'N',
	East = 'E',
	South = 'S',
	West = 'W',
};

const test1: CardinalDirection = {
	North: CardinalDirection.North,
	East: CardinalDirection.East,
	South: CardinalDirection.South,
	West: CardinalDirection.West,
}

In this code, test1 is an object with type CardinalDirection, 
and the object value includes all the members of the enum. 
However, the TypeScript compiler is going to show the error 2322:

The reason for this error is that the CardinalDirection type represents 
a union type of all the enum members, not the type of the enum object 
itself. You can extract the object type by using typeof before the name 
of the enum. 

const test1: typeof CardinalDirection = {
	North: CardinalDirection.North,
	East: CardinalDirection.East,
	South: CardinalDirection.South,
	West: CardinalDirection.West,
}

The TypeScript compiler will now be able to compile your code correctly.

This section showed a specific way to widen your use of enums. Next, 
you will work through a use case in which enums are applicable: 
bit flags in game development.


*/ 



/*

*/ 



/*

*/ 



/*

*/ 



/*

*/ 