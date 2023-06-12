import React, { Component } from 'react';
import config from './config';

const AppContext = React.createContext({});

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      dogs: [],
      people: [],
      nextCat: null,
      nextDog: null,
      nextPerson: null,
      name: '',
      message: '',
    };
  }

  timeout = 0;

  componentDidMount() {
    this.getCats();
    this.getDogs();
    this.getPeople();
    this.timeMechanism();
    this.addToList();
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  timeMechanism = () => {
    this.timeout = setInterval(() => {
      if (this.state.people[0] !== this.state.name) {
        this.adoptRandom();
        this.addToList();
        return;
      }
      if (this.state.message === "You're next!") {
        this.setMessage(null);
        return;
      }
      if (
        this.state.name === this.state.people[0] &&
        this.state.people.length === 5
      ) {
        this.setMessage("You're next!");
        return;
      }
    }, 3000);
  };

  addToList = () => {
    const names = [
      'Xevier Tee',
      'Tara Pommy',
      'Izzy Stankovic',
      'Stephanie Orea',
      'Gavin Rodriguez',
      'Peyton Flores',
      'Sarah MF Jackson',
      'Ricky Gervais',
      'Alex Kallaway',
      'Graham Stephan',
      'Nick Merks',
      'Timmy Tatman',
      'Simon Whistler',
      'Cecilia Gamundi',
      'Matt Ngo',
      'Ivan Turrubiartes',
      'Savannah Richards'
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];

    this.addPerson(randomName);
  };

  adoptRandom = () => {
    return Math.random() >= 0.5 ? this.handleAdoptCat() : this.handleAdoptDog();
  };

  getCats = () => {
    fetch(`${config.API_ENDPOINT}/api/cat`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cats: data,
          nextCat: data[0],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getDogs = () => {
    fetch(`${config.API_ENDPOINT}/api/dog`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dogs: data,
          nextDog: data[0],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getPeople = () => {
    fetch(`${config.API_ENDPOINT}/api/people`)
      .then((res) => res.json())
      .then((people) => {
        this.setState({
          people: people,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  addPerson = (name) => {
    fetch(`${config.API_ENDPOINT}/api/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then(() => {
        this.setState({
          people: [...this.state.people, name],
        });
      });
  };

  getNextCat = () => {
    let { nextCat } = this.state;
    if (nextCat) {
      return (
        <div className='pet-container'>
          <h3>{nextCat.name}</h3>
          <img
            src={nextCat.imageURL}
            alt='cat for adoption'
            className='pet-pic'
          ></img>
          <li>gender: {nextCat.gender} </li>
          <li>age: {nextCat.age} </li>
          <li>breed: {nextCat.breed} </li>
          <li>story: {nextCat.story} </li>
        </div>
      );
    }
    return <div>No more cats left to adopt!</div>;
  };

  getNextDog = () => {
    let { nextDog } = this.state;
    if (nextDog) {
      return (
        <div className='pet-container'>
          <h3>{nextDog.name}</h3>
          <img
            src={nextDog.imageURL}
            alt='dog for adoption'
            className='pet-pic'
          ></img>
          <li>gender: {nextDog.gender} </li>
          <li>age: {nextDog.age} </li>
          <li>breed: {nextDog.breed} </li>
          <li>story: {nextDog.story} </li>
        </div>
      );
    }
    return <div>No more dogs left to adopt!</div>;
  };

  deleteCat = () => {
    fetch(`${config.API_ENDPOINT}/api/cat`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cats: this.state.cats.slice(1),
        });
      })
      .catch((e) => {
        throw new Error('cat not adopted');
      });
  };

  deleteDog = () => {
    fetch(`${config.API_ENDPOINT}/api/dog`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dogs: this.state.dogs.slice(1),
        });
      })
      .catch((e) => {
        throw new Error('dog not adopted');
      });
  };

  deletePerson = () => {
    fetch(`${config.API_ENDPOINT}/api/people`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          people: this.state.people.slice(1),
        });
      })
      .catch((e) => {
        throw new Error('person not deleted');
      });
  };

  setName = (name) => this.setState({ name: name });
  setNextCat = (nextCat) => this.setState({ nextCat: nextCat });
  setNextDog = (nextDog) => this.setState({ nextDog: nextDog });
  setMessage = (message) => this.setState({ message: message });

  handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    this.setName(name);
    this.addPerson(name);
  };

  handleAdoptCat = () => {
    this.deleteCat();
    this.deletePerson();
    this.setNextCat(this.state.cats[1]);
  };

  handleAdoptDog = () => {
    this.deleteDog();
    this.deletePerson();
    this.setNextDog(this.state.dogs[1]);
  };

  render() {
    const value = {
      people: this.state.people,
      message: this.state.message,
      name: this.state.name,
      getNextCat: this.getNextCat,
      handleAdoptCat: this.handleAdoptCat,
      getNextDog: this.getNextDog,
      handleAdoptDog: this.handleAdoptDog,
      handleSubmit: this.handleSubmit,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
