import { List, Record } from 'immutable'

const _IssueManager = Record({
  users: new List(),
  labels: new List(),
})

export default class IssueManager extends _IssueManager {
}
