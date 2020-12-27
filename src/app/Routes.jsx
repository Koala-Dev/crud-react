import React from 'react'
import {Route, Redirect, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import UserView from '../pages/UserView/userview'
import UserUpdate from '../pages/UserUpdate/userupdate'
import UserCreate from '../pages/UserCreate/usercreate'

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