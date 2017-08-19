import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "react-loader";

import { STATE } from "../lib/records/Issue";

import { findIssues } from "../actions/issue";

import IssueListHeader from "../components/IssueListHeader";
import IssueList from "../components/IssueList";

import styles from "./IssueListContainer.scss";

class IssueListContainer extends Component {
  constructor() {
    super();
    this.isbool = {
      isFilterUser: false,
      isFilterLabel: false
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.params, nextProps.params)) {
      this.props.findIssues(nextProps.params, { skipLoading: true });
    }
  }

  onClickRow(issue) {
    this.context.router.push(`/${issue.id}`);
  }

  onClickOpen() {
    this.search({ status: STATE.OPEN });
  }

  onClickClose() {
    this.search({ status: STATE.CLOSE });
  }

  init() {
    this.props.findIssues(this.searchParams());
  }

  searchParams() {
    const params = this.props.params;
    params.status = params.status || STATE.OPEN;
    return params;
  }

  search(params = {}) {
    let query = {};
    _.each(_.extend({}, this.searchParams(), params), (value, key) => {
      if (key == "assignee_id") {
        if (this.isbool.isFilterUser == true) {
          query[key] = value;
        }
      } else if (key == "label_ids") {
        if (this.isbool.isFilterLabel == true) {
          query[key] = value;
        }
      } else {
        query[key] = value;
      }
    });
    this.pushQuery(query);
  }

  pushQuery(query) {
    this.context.router.push({
      pathname: "/",
      query: query
    });
  }

  onChangeAssigneeFilter(user) {
    // TODO: implement
    const params = this.props.params;
    if (this.isbool.isFilterUser == false || params.assignee_id != user.id) {
      this.isbool.isFilterUser = true;
      this.search({ assignee_id: user.id });
    } else {
      this.isbool.isFilterUser = false;
      this.search();
    }
  }

  onChangeLabelFilter(label) {
    // TODO: implement
    const params = this.props.params;
    if (this.isbool.isFilterLabel == false || params.label_ids != label.id) {
      this.isbool.isFilterLabel = true;
      this.search({ label_ids: label.id });
    } else {
      this.isbool.isFilterLabel = false;
      this.search();
    }
  }

  render() {
    const { params, issues, issueManager, issueListManager } = this.props;
    const { assignee_id: userFilterId, label_ids: labelFilterId } = params;
    console.log("issueManager", issueManager);
    return (
      <div className={styles.base}>
        <Loader loaded={!issueListManager.loading}>
          <IssueListHeader
            issueManager={issueManager}
            userFilterId={userFilterId}
            labelFilterId={labelFilterId}
            onClickOpen={this.onClickOpen.bind(this)}
            onClickClose={this.onClickClose.bind(this)}
            onChangeAssigneeFilter={this.onChangeAssigneeFilter.bind(this)}
            onChangeLabelFilter={this.onChangeLabelFilter.bind(this)}
          />
          <IssueList issues={issues} onClickRow={this.onClickRow.bind(this)} />
        </Loader>
      </div>
    );
  }
}

IssueListContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    params: ownProps.location.query,
    issues: state.issue.issueList,
    issueManager: state.issue.issueManager,
    issueListManager: state.issue.issueListManager
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      findIssues
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  IssueListContainer,
  styles
);
