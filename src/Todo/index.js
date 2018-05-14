import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Input from '../components/uielements/input';
import todoAction from "../redux/todos/actions.js";
import TodoList from "./TodoList";
import { TodoWrapper } from "./todo.style";

const {
  addTodo,
  editTodo,
  deleteTodo,
  allCompleted,
  deleteCompleted
} = todoAction;
const { Header, Content } = Layout;

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ""
    };
  }
  render() {
    const {
      todos,
      colors,
      addTodo,
      editTodo,
      deleteTodo,
      allCompleted,
      deleteCompleted
    } = this.props;
    return (
      <Layout style={{ background: "none" }}>
        <TodoWrapper>
          <Header className="todoHeader">
            <Input
              placeholder={"Type here for add a new todo"}
              value={this.state.newTodo}
              className="todoInput"
              onChange={event => this.setState({ newTodo: event.target.value })}
              onPressEnter={event => {
                this.setState({ newTodo: "" });
                addTodo(event.target.value);
              }}
            />
          </Header>
          <Content className="todoContentBody">
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              colors={colors}
              allCompleted={allCompleted}
              deleteCompleted={deleteCompleted}
            />
          </Content>
        </TodoWrapper>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { todos, colors } = state.Todos.toJS();
  return {
    todos,
    colors
  };
}
export default connect(mapStateToProps, {
  addTodo,
  editTodo,
  deleteTodo,
  deleteCompleted,
  allCompleted
})(ToDo);
