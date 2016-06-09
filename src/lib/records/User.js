import { List, Record } from 'immutable'

const _User = Record({
  id: null,
  name: '',
})

export default class User extends _User {
  static fromJS(user = {}) {
    return (new this).merge({
      id: parseInt(user.id),
      name: user.name,
    })
  }
}
