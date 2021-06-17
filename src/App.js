import Home from './components/layout/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css';
import Login from './components/auth/Login';
import Contact from './components/layout/Contact';
import Register from './components/auth/Register';

function App() {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/register" component={Register}/>
        </Switch>
      </Router>
  );
}

export default App;