# unit-7-react-redux
React and Redux

## Summary
[Redux](http://redux.js.org/) is a predictable state container to help manage application state. 
It modifies the [Flux architecture](https://facebook.github.io/flux/docs/overview.html) introduced by Facebook to further enforce unidirectional data flow. 
Although Redux can be used without React, it is often used in conjuction with [React-Redux](https://github.com/reactjs/react-redux) to build scalable web applications.

## React Overview

### Stateless Functional Components
[Stateless functional components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) were introduced in  [React's 0.14 release](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html). 
Instead of using the `React.createClass` method or ES6 classes, components are written as functions with props as the parameter. 

A stateless functional component is essentially just the render method of a React class. 
By stripping everything else away, you get a simpler way to make React components, albeit with a few limitations.

#### Pros

* No need to use this `this` keyword! You don't have to deal with state / methods, and your props are passed in as a parameter.
* Less boilerplate. As your component is simply a function, free of the contraints of a React component class, the amount of boilerplate in creating a stateless functional component is greatly reduced.
This makes it so the resulting code for you component is concise and and clear.
* Clearly seperates your concerns. This is important when you're seperating your application into container and presentational components.

#### Cons
* No way to retain internal state.
* No access to component lifecycle methods (ie ComponentDidMount).

### Container vs Presentational Components

A common design pattern to follow when creating React components is to seperate them into container and presentational components.
**Container** components handle the logic in an application (how things work). They handle state, fetch data, and contain the logic that determines what components are rendered.
They do not actually render any DOM markup themselves, but instead use presentational components to do so.
**Presentational** components concern themselves with how things look. They have no knowledge of state or how data is being mutated.
Instead, their only job is to take in data (in the form of props) and render DOM markup. 

For a more in depth explanation, take a look at [Dan Abramov's blog post](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) on the subject. 


## Redux
![redux-logo](https://camo.githubusercontent.com/f28b5bc7822f1b7bb28a96d8d09e7d79169248fc/687474703a2f2f692e696d6775722e636f6d2f4a65567164514d2e706e67)



Redux itself is a relatively lightwight library (it adds 2kB to your application), with a few new APIs to learn.
Its power lies behind how it used to to make your code easy to reason about, run consistently, and simple to test.
This is done through Redux's three fundamental principles:

* A **single source of truth** contained in a store.
* **State is read-only**. The only way to change state is though emitting an action.
* **Changes are made with pure functions** in the form of reducers.

### Store

The Redux store is the "single source of truth", meaning that the store holds all of the application state in one place. All components get their state from the store. 

Stores are typically structured as deeply nested objects.

The store cannot be updated directly, instead it is updated through actions and reducers.

### Actions

Actions describe events that have taken place in an application and an intent to change state. They simply notify the store that some event has occurred and pass along any data relating to that event.

Actions are structured as objects with key-value pairs. The only required key is "type". The type property has a string value that describes the event in plain English. Since these actions will be used throughout the app, each action type should be unique.

As an example, if someone added a name to a (hypothetical) list, we would want to emit an action describing that event and pass along the added name:

```
// Action object for adding a name to a list
{ type: 'NAME_ADDED', name: 'Erlich Bachman' }
```
Creating these action objects throughout an application can get tedious and decentralized. Our code would be much more organized and easier to update if we could put action objects in one file and just import them into the component where the action would be occurring. This is where action creators can be helpful.

Action creators are functions that return action objects. Instead of writing an action as an object literal, we can instead create a function that will return the action object.

```
// Add name action creator
function addName(name) {
  return {
    type: 'NAME_ADDED',
    name,                 // This is just ES6 shorthand for name: name
  };
}
```
Now we need a way to let our store know that this action has occurred. Redux includes a "dispatch" method that broadcasts actions to the store. Dispatch takes in an action object and emits that action to the application.

Notice that actions and action creators have no physical effect on state. The dispatched action only **describes** an intent to change state.

### Reducers

Reducers are the mechanism for updating state. They are pure functions that essentially wait for dispatched actions and update state accordingly. **Reducers must always return state** - even if state was unmodified.

Reducers take two parameters: the previous state and the dispatched action. These parameters should **never be mutated**. So state should essentially be copied, updated (if necessary) and then returned. Libraries like [immutable.js](https://facebook.github.io/immutable-js/) are often used alongside Redux so that objects are not mutated inadvertently.

When an action is dispatched, it is passed to every reducer. If that action is something the reducer is interested in, it can perform some logic and return the updated state. Continuing our 'name added' example, once the name added action has been dispatched, the reducer function would take in the app state and name added action as parameters. Then it would update state (adding the name to a list of names) based on the action being passed in.

```
function listReducer(state, action) {
  switch(action.type) {
    case 'NAME_ADDED':
      const names = [].concat(state.nameList); // creating a new array
      names.push(action.name);
      return Object.assign({}, { nameList: names }); //returning a new state object
  }
}
``` 

Each reducer is called once when the store is being created. Therefore, reducers are where you set the app's initial state.

Given that reducers are pure functions, there are 3 things reducers **never** do:

1. Mutate its arguments
2. Perform side effects (like API calls)
3. Call non-pure functions (Date.now(), Math.random(), etc)

For more information on reducers, refer to the Redux docs:
- A general overview of how to construct a reducer: http://redux.js.org/docs/basics/Reducers.html
- For more complex applications, an app might need more than one reducer, responsible for different pieces of state. This is where CombineReducers comes in handy: http://redux.js.org/docs/api/combineReducers.html

## Getting Started

### Setup

- [ ] Go to the Chrome Web Store and download/install Redux DevTools
- [ ] Run `npm install` to install all the dependencies. 
- [ ] Run `npm start` to start your Webpack Development Server, and navigate to `http://localhost:8081`. 

### Challenges

In your skill builder, you created a personal loyalty card tracker.  For this unit, we'll be flipping the script on that idea and creating a loyalty card tracker for a supermarket. The application should have the following hierarchical structure:

````   
|-- App
  |-- WrapperContainer
      |-- TotalsDisplay
      |-- MarketsContainer
          |-- MarketCreator
          |—- MarketsDisplay
              |—- MarketDisplay      
````

Your app should look something like this... 

![MegaMarketApp](https://github.com/CodesmithLLC/unit-7-react-redux/blob/master/MegaMarketApp.png)

And it should have the following functionality: 

1. If you enter a location name and click 'Add Market', you should see a new MarketDisplay card and the Total Markets value should increment by one.  Add at least six of these.

2. If you click on Add Card on a given MarketDisplay card, you should see the Cards and % of total update.  You should also see Total Cards increment by one.

3. If you click on Delete Card on a given MarketDisplay card, you should see the Cards and % of total update.  You should also see Total Cards decrement by one.

4. Inspect your page and go to the Redux tab.  Watch the state updates in the Devtools as you add and remove cards.

### Extensions

1. Use Immutable.js to ensure that state never gets mutated.

2. Store market and loyalty card data in a database of your choice and fetch them onload.

3. Refactor your Node-React calendar to use React-Redux

