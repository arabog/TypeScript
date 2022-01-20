import React from 'react';
import './App.css';


import { TextField } from './components/TextField';
import { Counter } from './components/Counter';




const App: React.FC = () => {


	return (
		<div className="App">
			<TextField 
				text="Hello Jesus"  
				person={
					{
						firstName: "",
						lastName: ""
					}
				}

				handleChange={e => (e.target.value)}
		 	/>

			<Counter>
				{({count, setCount}) => (
					<div>
						{count}

						<button onClick={ () => setCount(count + 1)}>
							Add
						</button>
					</div>
				)}

			</Counter>
		</div>
	);
}


export default App;
