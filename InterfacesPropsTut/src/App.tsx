import React from 'react';
import './App.css';

import { BudgetOverview } from './components/BudgetOverview';
import HomeBudget from './components/HomeBudget';


// https://www.pluralsight.com/guides/use-interface-props-in-functional-components-using-typescript-with-react


function App() {
	return (
		<div className="App">
			<header className="App-header">
				Budget Table using TypeScript & React
			</header>

			
			<BudgetOverview 
				budgets={HomeBudget}
			/>
			
		</div>
	);
}


export default App;


/*
Writing function or class components in a React/TypeScript 
app often requires you to define the type of props passed to 
them. It enforces type checking so that the code adheres to 
the defined contract. 
*/ 