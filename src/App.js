
import './App.css';
import { Main } from './component/Main';
import  { BrowserRouter, Switch,Route } from 'react-router-dom'
import { Signup } from './component/Signup';
import { Login } from './component/Login';
import { Addproduct } from './component/Addproduct';


function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/add-product" component={Addproduct}/>
        <Route component={Main}/>

        {/* <Redirect to path="/" component={Main} /> */}
      </Switch>
    </BrowserRouter> 
     
  );
}

export default App;
