import React from 'react';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import Colors from './components/Colors';
import Users from './components/Users';
export default function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <React.Suspense fallback={<div>Loading</div>}>
                <Switch>
                    <Route path='/' exact component={Welcome} />
                    <Route path='/colors' component={Colors} />
                    <Route path='/users' component={Users} />
                    <Route component={()=><h1>404 - not found</h1>}/>
                </Switch>
            </React.Suspense>
        </BrowserRouter>
    )
}