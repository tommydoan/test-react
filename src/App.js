import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid';

class App extends Component {
  state = {
    number: 0,
    todos: [],
    id: '',
    name: '',
    update: false,
    index: null,
    text: null
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')

      .then(res => this.setState({ todos: res.data }));
  }

  onClickMinus = () => {
    this.setState({
      number: this.state.number + 1
    });
  };
  onClickPlus = () => {
    this.setState({
      number: this.state.number - 1
    });
  };
  deleteItem = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
    this.setState({ name: '', text: 'Delete' });
    setInterval(() => {
      this.setState({ text: null });
    }, 6000);
  };
  onSubmitAddTodo = e => {
    e.preventDefault();
    const newTodo = {
      id: uuid(),
      name: this.state.name
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
      name: '',
      text: 'Add'
    });

    setInterval(() => {
      this.setState({ text: null });
    }, 4000);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  upDateTodo = index => {
    //const {name}=this.state
    this.setState({
      update: !this.state.update,
      name: this.state.todos[index].name,
      index: index
    });
    setInterval(() => {
      this.setState({ text: null });
    }, 4000);
  };
  onSubmitEditTodo = (index, e) => {
    e.preventDefault();
    const name1 = this.state.name;
    //  const name = ;
    var name2 = this.state.todos[index].name;
    name2 = name1;
    const todos = this.state.todos;
    todos[index].name = name2;
    this.setState({
      todos,
      name: '',
      update: !this.state.update,
      text: 'Edit'
    });
    setInterval(() => {
      this.setState({ text: null });
    }, 4000);
  };
  render() {
    const { number, todos, update, index, text } = this.state;
    return (
      <div>
        <section className="p-5">
          <div className="container">
            <div className="box">
              {' '}
              <button
                onClick={this.onClickPlus}
                className="btn btn-primary btn-plus "
              >
                +
              </button>
              <h1 className="num inline">{number}</h1>
              <button
                onClick={this.onClickMinus}
                className="btn btn-danger btn-plus "
              >
                -
              </button>
              <button
                onClick={() => this.setState({ number: 0 })}
                className="btn btn-success btn-plus ml-5"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        <section className="function">
          <div className="container">
            {update ? (
              <form onSubmit={this.onSubmitEditTodo.bind(this, index)}>
                <div className="form-group">
                  <input
                    name="name"
                    onChange={this.onChange}
                    value={this.state.name}
                    type="text"
                    className="form-control mt-3 mb-3"
                  />
                  <button className="btn btn-primary btn-sm mb-3">
                    Update todo
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={this.onSubmitAddTodo}>
                <div className="form-group">
                  <input
                    name="name"
                    onChange={this.onChange}
                    value={this.state.name}
                    type="text"
                    className="form-control mt-3 mb-3"
                  />
                  <button className="btn btn-primary btn-sm mb-3">
                    Add todo
                  </button>
                </div>
              </form>
            )}
            {text ? (
              <div className="alert alert-success text-center mb-3 ">
                {text} Success
              </div>
            ) : null}
            {todos.map((todo, index) => (
              <ul className="list-group ">
                <li className="list-group-item ">
                  <button
                    onClick={this.upDateTodo.bind(this, index)}
                    className="btn btn-warning btn-sm mr-3"
                  >
                    Update
                  </button>
                  <span className="display-6">
                    <strong>{todo.name}</strong>
                  </span>{' '}
                  <button
                    onClick={this.deleteItem.bind(this, todo.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
