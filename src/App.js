import Home from './components/layout/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import '../src/css/index.css';
import Login from './components/auth/Login';
import Contact from './components/layout/Contact';
import Register from './components/auth/Register';
import Agenda from './components/dashboard/Agenda';
import { ContextProvider } from './context';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/agenda" component={Agenda}/>
        </Switch>
      </Router>
      </ContextProvider>
  );
}

export default App;
