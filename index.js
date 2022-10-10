const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

//USING REDUX-LOGGER MIDDLEWARE TO DO LOGGING, PERFORMANCE ISSUES & ASYNC
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

//ACTION IS AN OBJECT WITH A TYPE PROPERTY
//ACTION CREATOR IS A FUNCTION WHICH RETURNS AN OBJECT

//ACTION TYPE
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

//ACTION CREATOR
function orderCake() {
  //ACTION
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  //ACTION
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  //ACTION
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  //ACTION
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

//STATE -> OBJECT CONTAINING STATE/STATES
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

//REDUCERS -> (preState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

//COMBINE REDUCERS
const rootReducers = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
});

//STORE
//ADDED MIDDLEWARE IN CREATE STORE
// const store = createStore(reducer);
const store = createStore(rootReducers, applyMiddleware(logger));
console.log('initial state', store.getState());

const unsubscribe = store.subscribe(() => {});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

//DIRECTLY BIND ACTION CREATOR WITH STORE DISPATCH
const action = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
action.orderCake();
action.orderCake();
action.orderCake();
action.restockCake(3);
action.orderIceCream();
action.orderIceCream();
action.restockIceCream(2);

unsubscribe();
