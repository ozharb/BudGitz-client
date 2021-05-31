import React, { Component } from "react";
import { Section } from "../../Utils/Utils";
import RegistrationForm from "../../RegistrationForm/RegistrationForm";
import "./RegistrationPage.css";
import Sound from "react-sound";
import RegisterSound from "./robot-register-sound.mp3";
export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
    location: {
      state: {
        fromHome: false,
      },
    },
  };
  state = {
    play: Sound.status.STOPPED,
    fromHome: false,
  };
  handleRegisterSound = () => {
    this.setState({ play: Sound.status.PLAYING });
  };
  handleRegistrationSuccess = (user) => {
    const { history } = this.props;
    setTimeout(() => {
      history.push("/login");
    }, 2000);
  };

  isPageRefreshed() {
    return window.performance && performance.navigation.type === 1;
  }

  componentDidMount() {
    if (!this.isPageRefreshed() && this.props.location.state) {
      this.handleRegisterSound();
    }
  }
  render() {
    return (
      <>
        <Sound
          url={RegisterSound}
          playStatus={this.state.play}
          volume={20}
          autoLoad={false}
        />
        <Section className="RegistrationPage">
          ;<h2>Register</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </Section>
      </>
    );
  }
}
