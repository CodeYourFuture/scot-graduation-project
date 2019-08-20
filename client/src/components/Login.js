import React, { Component } from "react";
import { signApi } from "../api/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  signIn = () => {
    signApi(this.state.email, this.state.password)
      .then(data => {
        const token = data.token;
        console.log(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        document.location.reload();
      })
      .catch(err => {
        this.setState({ error: true });
      });
  };
  render() {
    const token = localStorage.getItem("token");
    if (token) {
      return <div>You are already logged in.</div>;
    } else
      return (
        <div>
          Login
          <input
            onChange={this.handleChange}
            name="email"
            type="email"
            placeholder="email"
          ></input>
          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            placeholder="password"
          ></input>
          <button onClick={this.signIn}>Sign in</button>
          {this.state.error ? <div>Wrong information. Try again</div> : null}
        </div>
      );
  }
}

export default Login;
