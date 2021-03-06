import React from 'react';
import { connect } from 'react-redux';
import { register, resetAuthError } from '../actions';
import { withRouter } from 'react-router'

import Loading from './Loading';

import './Login.css';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: false,
  }
  componentDidMount() {
    this.props.resetAuthError();
  }

  onChange = (event) => {
    this.props.resetAuthError();
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;
    if(password === confirmPassword) {
      this.setState({ error: false });
      this.props.register(username, password, this.props.history);
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.onSubmit}>
          <h2>Register:</h2>
          {this.props.error ? <div className='error'>{this.props.error.response.data.error}</div> : null}
          {this.state.error ? <div style={{ color: 'red' }}>Passwords must match</div> : null}
          <input onChange={this.onChange} value={this.state.title} name='username' placeholder='username' required='true' maxlength='100'/>
          <input onChange={this.onChange} value={this.state.entry} name="password" placeholder='password' type='password' required='true' maxlength='100'/>
          <input onChange={this.onChange} value={this.state.entry} name="confirmPassword" placeholder='confirm password' type='password' required='true' maxlength='100'/>
          { this.props.loading ? <Loading /> : <button type='submit'>Register</button> }
        </form>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    // sorted: state.sorted,
    auth: state.auth.authenticated,
    loading: state.auth.loading,
    error: state.auth.error,
  };
}

export default withRouter(connect(mapStateToProps, { register, resetAuthError })(Register));