import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./../src/data.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      intervalId: null
    };
  }

  componentDidMount() {
    this.setState({ notifications: data });
    var intervalId = setInterval(
      () => this.setState({ notifications: data }),
      5000
    );
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  removeNotification = notification => {
    var newNotifications = this.state.notifications.filter(
      oldNotification => oldNotification !== notification
    );
    this.setState({ notifications: newNotifications });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {this.state.notifications &&
            this.state.notifications.map(notification => (
              <div
                className="notification"
                onClick={() => this.removeNotification(notification)}
              >
                {notification.name}
              </div>
            ))}
        </header>
      </div>
    );
  }
}

export default App;
