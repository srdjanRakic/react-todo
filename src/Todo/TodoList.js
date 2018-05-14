import React, { Component } from 'react';
import Button from '../components/uielements/button';
import Checkbox from '../components/uielements/checkbox';
import { RadioButton, RadioGroup } from '../components/uielements/radio';
import { timeDifference } from '../helpers/utility';
import {
  notification,
  ColorChoser,
  EditableComponent,
} from '../components/';
import { TodoListWrapper } from './todo.style';

function filterTodos(todos, search) {
  const selectedTodos =
    search === 'All'
      ? todos
      : todos.filter(todo => todo.completed === (search === 'Completed'));
  let completed = 0;
  selectedTodos.forEach(todo => {
    if (todo.completed) {
      completed += 1;
    }
  });
  return { selectedTodos, completed };
}
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.singleTodo = this.singleTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: 'All',
    };
  }
  singleTodo(todo) {
    const { deleteTodo, colors } = this.props;
    const onDelete = () => deleteTodo(todo.id);
    const updateTodo = (key, value) => {
      todo[key] = value;
      this.props.editTodo(todo);
    };
    return (
      <div className="todoList" key={todo.id}>
        <ColorChoser
          colors={colors}
          changeColor={value => updateTodo('color', value)}
          seectedColor={todo.color}
        />
        <Checkbox
          className="todoCheck"
          checked={todo.completed}
          onChange={event => updateTodo('completed', !todo.completed)}
        />
        <div className="todoContentWrapper">
          <span className="isoTodoDate">{timeDifference(todo.createTime)}</span>
          <EditableComponent
            value={todo.todo}
            itemKey="todo"
            onChange={updateTodo}
          />
        </div>
        <Button
          className="todoDelete"
          icon="close"
          type="button"
          onClick={onDelete}
        />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const { selectedTodos, completed } = filterTodos(this.props.todos, search);
    return (
      <TodoListWrapper className="todoContent">
        <div className="todoStatusTab">
          <RadioGroup
            value={this.state.search}
            onChange={this.onChange}
            className="isoTodoStatus"
          >
            <RadioButton value="All">All</RadioButton>
            <RadioButton value="Uncompleted">Uncompleted</RadioButton>
            <RadioButton value="Completed">Completed</RadioButton>
          </RadioGroup>
        </div>

        <div className="todoListWrapper">
          {selectedTodos.length > 0 ? (
            selectedTodos.map(note => this.singleTodo(note))
          ) : (
            <h3 className="isoNoTodoFound">No todo found</h3>
          )}
        </div>

        <div className="todoFooter">
          <Checkbox
            className="todoCheckAll"
            checked={completed === selectedTodos.length}
            disabled={completed === selectedTodos.length}
            onChange={event => {
              notification('success', 'All Todos are Completed!!!', '');
              this.props.allCompleted();
            }}
          >
            Mark all as completed
          </Checkbox>

          {selectedTodos.length > 0 && completed === selectedTodos.length ? (
            <Button
              type="button"
              className="deleteAll"
              onClick={event => {
                notification('success', 'All Completed Todos are Deleted', '');
                this.props.deleteCompleted();
              }}
            >
              {`Delete Completed (${completed})`}
            </Button>
          ) : (
            ''
          )}
        </div>
      </TodoListWrapper>
    );
  }
}
