import { List, Record } from 'immutable'

const _Comment = Record({
  id: null,
  userName: '',
  content: '',
  created: '',
  updated: '',
})

export default class Comment extends _Comment {
  static fromJS(comment = {}) {
    return (new this).merge({
      id: comment.id,
      userName: comment.user_name || comment.userName,
      content: comment.content,
      created: comment.created,
      updated: comment.updated,
    })
  }
}
