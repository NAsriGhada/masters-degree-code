import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      person: {
        fullName: "Ada Lovelace",
        bio: "First computer programmer. Wrote the first algorithm for Charles Babbage's analytical engine.",
        imgSrc:
          "https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg",
        profession: "Mathematician & Writer",
      },
      shows: false,
      mountedTime: 0,
    };
    this.intervalId = null;
  }

  // 🔄 Lifecycle method runs once when the component mounts
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        mountedTime: prevState.mountedTime + 1,
      }));
    }, 1000);
  }


  // 🔘 Toggle button handler
  toggleShow = () => {
    this.setState((prevState) => ({
      shows: !prevState.shows,
    }));
  };

  render() {
    const { person, shows, mountedTime } = this.state;

    return (
      <div className="text-center p-4">
        <h1 className="mb-3">React Class Component</h1>
        <button className="btn btn-primary mb-4" onClick={this.toggleShow}>
          {shows ? "Hide Profile" : "Show Profile"}
        </button>

        {shows && (
          <div className="card mx-auto" style={{ width: "22rem" }}>
            <img
              src={person.imgSrc}
              className="card-img-top"
              alt={person.fullName}
            />
            <div className="card-body">
              <h5 className="card-title">{person.fullName}</h5>
              <p className="card-text">{person.bio}</p>
              <p>
                <strong>Profession:</strong> {person.profession}
              </p>
            </div>
          </div>
        )}

        <p className="mt-4 text-muted">
          Component mounted since: <strong>{mountedTime}</strong> second
          {mountedTime !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
}

export default App;
