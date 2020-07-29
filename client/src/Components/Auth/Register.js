import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    console.log(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Bact to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  type="text"
                  id="fname"
                  onChange={this.onChange}
                  value={this.state.fname}
                  error={errors.fname}
                />
                <label htmlFor="fname">First name</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="text"
                  id="lname"
                  onChange={this.onChange}
                  value={this.state.lname}
                  error={errors.lname}
                />
                <label htmlFor="lname">Last name</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="text"
                  id="username"
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  id="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  id="password2"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                />
                <label htmlFor="password2">Confirm Password</label>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
