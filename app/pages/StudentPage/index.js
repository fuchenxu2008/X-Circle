/**
 *
 * StudentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Row } from 'antd';
import SearchBar from 'containers/SearchBar';
import SearchResultCard from 'containers/SearchResultCard';
import QuestionsList from 'components/QuestionsList';
import AddButton from 'components/AddButton';
import LoginHint from 'components/LoginHint';
import NewQuestionForm from 'components/NewQuestionForm';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { getStudentQuestions, addQuestion, subscribeQuestion } from './actions';
import './StudentPage.css';

export class StudentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = { showAddForm: false, showHint: false };

  componentDidMount() {
    this.props.getStudentQuestions();
    this.props.socket.on('data', () => this.props.getStudentQuestions());
  }

  showForm = () => {
    if (this.props.currentUser) {
      this.setState({ showAddForm: true });
    } else {
      this.setState({ showHint: true });
    }
  }
  hideForm = () => this.setState({ showAddForm: false, showHint: false });

  handleAddQuestion = question => this.props.addQuestion(question);

  handleSubscribeQuestion = ({ userId, questionId }) => {
    this.props.subscribeQuestion({ userId, questionId });
  }

  render() {
    return (
      <div className="body-container studentpage-bg">
        <Helmet>
          <title>StudentPage</title>
          <meta name="description" content="Description of StudentPage" />
        </Helmet>
        <SearchBar searchType="academic" />
        <SearchResultCard key="key" />
        <br />
        <Row className="title-row">
          <h2 className="big-title" style={{ flex: 1 }}>Student Page</h2>
          <AddButton handleClick={this.showForm} />
          <LoginHint
            visible={this.state.showHint}
            onCancel={this.hideForm}
            onOk={() => this.props.history.push('/auth')}
          />
        </Row>
        <NewQuestionForm
          visible={this.state.showAddForm}
          onCancel={this.hideForm}
          onOk={this.hideForm}
          onAddQuestion={this.handleAddQuestion}
          type="academic"
          currentUser={this.props.currentUser}
        />
        <QuestionsList
          type="student"
          questions={this.props.studentQuestions}
          onSubscribeQuestion={this.handleSubscribeQuestion}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

StudentPage.propTypes = {
  history: PropTypes.object,
  currentUser: PropTypes.object,
  getStudentQuestions: PropTypes.func,
  addQuestion: PropTypes.func,
  subscribeQuestion: PropTypes.func,
  studentQuestions: PropTypes.object,
  socket: PropTypes.object,
};

const mapStateToProps = state => ({
  currentUser:
    state.get('global').get('currentUser') === null
      ? null
      : state.get('global').get('currentUser').toJS(),
  studentQuestions: state.get('studentPage').get('studentQuestions').toJS(),
  socket: state.get('global').get('socket'),
});

function mapDispatchToProps(dispatch) {
  return {
    getStudentQuestions: () => dispatch(getStudentQuestions()),
    addQuestion: fields => dispatch(addQuestion(fields)),
    subscribeQuestion: info => dispatch(subscribeQuestion(info)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'studentPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(StudentPage);
