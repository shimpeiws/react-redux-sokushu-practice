import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers/issueApp'


export default function configureStore(_initialData) {
  const store = createStore(
    reducer,
    undefined,
    // Middlewares
    compose(
      applyMiddleware(thunk)
    )
  )

  module.hot.accept('../reducers/issueApp', () => {
    store.replaceReducer(require('../reducers/issueApp').default)
  })

  return store
}
