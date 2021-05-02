import {Route} from 'react-router-dom'
import Home from './routes/Home'
import List from './routes/List'
import './App.css';

export default function App() {
  return (
    <div className="App">
     <Route exact path="/" component={Home}/>
     <Route exact path="/list" component={List}/>
    </div>
  );
}
