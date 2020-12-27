import React from 'react'
import {Route, Redirect, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import UserView from '../pages/UserView/UserView'
import UserUpdate from '../pages/UserUpdate/UserUpdate'
import UserCreate from '../pages/UserCreate/UserCreate'

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/users" component={UserView}/>
                <Route path="/create" component={UserCreate}/>
                <Route path="/update/:id" component={UserUpdate}/>
                <Redirect from="/" to="/users"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;