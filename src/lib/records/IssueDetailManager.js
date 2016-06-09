import { Record } from 'immutable'

const _IssueDetailManager = Record({
  isTitleEditing: false,
  loading: false,
  showUsersModal: false,
  showLabelsModal: false,
})

export default class IssueDetailManager extends _IssueDetailManager {
}
