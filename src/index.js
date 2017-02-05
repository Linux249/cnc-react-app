import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux'
import { reducers } from './reducers/index';
import { Provider } from 'react-redux';

import './style/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { calcBaseProduction } from './util/production.js'
import { urlToBase } from './util/parseurl.js'

const initial_state = urlToBase("http://cncopt.com/?map=2|N|N|-fix-|tc20h20n.50e...26p26p26p26p26p42h47s42h.26p52a26p52a26p42h54s42h.26p26p26p26p26p42h46s42h.26p52a26p50a31p40b...31p35p35p38pc.....cc.c.cc.43f.46d..37q..20sj37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy")

//initial_state.showBuildingMenu = true
initial_state.buildingMenu = {
    show: true,
    from: 0,
    lvl: 12
}
initial_state.buildingMenuIsFrom = 0
initial_state.production = calcBaseProduction(initial_state.buildings)

console.log("INITIAL STATE")
console.log(initial_state)
//console.log("PRODUCTION")
//console.log()

const store = createStore(reducers, initial_state,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,  document.getElementById('app'));