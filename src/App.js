import React from 'react';
import './App.scss';
import CookieContainer from './components/cookie-container/cookie-container';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
       
//       </header>
//     </div>
//     <CookieContainer></CookieContainer>
//   );
// }

// export default App;

export default class App extends React.Component {
	render(){
		return (<CookieContainer
		/>)

	}
}