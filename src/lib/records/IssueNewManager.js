import { Record } from 'immutable'
import Issue from './Issue'

const _IssueNewManager = Record({
  loading: false,
  issue: new Issue(),
})

export default class IssueNewManager extends _IssueNewManager {
}
