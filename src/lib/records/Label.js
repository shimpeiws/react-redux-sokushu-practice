import { List, Record } from 'immutable'

const _Label = Record({
  id: null,
  name: '',
  color_code: '',
})

export default class Label extends _Label {
  static fromJS(label = {}) {
    return (new this).merge({
      id: parseInt(label.id),
      name: label.name,
      color_code: label.color_code,
    })
  }
}
