import React from 'react';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import Loading from './components/Loading'
/* const Welcome = React.lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(import("./components/Welcome")), 6000);
    });
}
) */
const NavBar = React.lazy(() => import('./components/NavBar'))
const Welcome = React.lazy(() => import('./components/Welcome'))
const Colors = React.lazy(() => import('./components/Colors'))
const Users = React.lazy(() => import('./components/Users'))

export default function App() {
    return (
        <BrowserRouter>
            <React.Suspense fallback={<div className="full-page-loading"><Loading></Loading></div>}>
                <NavBar/>
                <div className="main">
                    <div className="wrap">
                            <Switch>
                                <Route path='/' exact component={Welcome} />
                                <Route path='/colors' component={Colors} />
                                <Route path='/users' component={Users} />
                                <Route component={()=><div className="not-found"><h1>404 - Page not found</h1></div>}/>
                            </Switch>
                    </div>
                </div>
            </React.Suspense>
        </BrowserRouter>
    )
}