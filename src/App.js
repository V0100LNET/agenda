import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Projects from './components/layout/Projects';
import Agenda from './components/dashboard/Agenda';
import Register from './components/auth/Register';
import Contact from './components/layout/Contact';
import About from './components/layout/About';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import { ContextProvider } from './context';
import '../src/css/index.css';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/agenda" component={Agenda}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/projects" component={Projects}/>
        </Switch>
      </Router>
      </ContextProvider>
  );
}

export default App;
