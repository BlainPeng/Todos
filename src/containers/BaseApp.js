/**
 * Created by mumuhou on 16/6/15.
 */

import React, { Component } from 'react';

import {
  View,
  ListView,
  TextInput,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicatorIOS,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux'

import { loadTodos, addTodo, toggleTodo } from '../actions';


export default class List extends Component {
  constructor(props) {
    super(props);

    this.handleTouchedRow = this.handleTouchedRow.bind(this);

    this.state = {
      text: null,
      placeholder: '写下你将来要做的事情'
    }
  }
  
  componentDidMount() {
    this.props.loadData();
  }

  appendTodoList() {
    console.log('appendTodoList');
    const text = this.state.text;
    this.props.appendTodo(text);
    this.setState({ text: '' });
  }

  handleTouchedRow(dataRow) {
    console.log('*** touchedRow ***');
    this.props.touchedTodo(dataRow.id);
  }

  renderHeader() {
    return (
      <View style={styles.todoRow}>
        <TextInput
          value={this.state.text}
          placeholder={this.state.placeholder}
          onChangeText={(text) => this.setState({ text })}
          style={styles.inputText} />
        <TouchableOpacity onPress={this.appendTodoList.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>添加</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderRow(dataRow) {
    const { todos } = this.props;
    return (
      <View style={styles.todoRow}>
        <Text style={ dataRow.completed ? styles.todoTextDone : styles.todoText}>{dataRow.text}</Text>
        <TouchableOpacity onPress={() => this.handleTouchedRow(dataRow)}>
          { dataRow.completed ? <Text style={styles.success}>完成</Text> : <Text style={styles.pendding}>待办</Text> }
        </TouchableOpacity>
      </View>
    )
  }

  renderList() {
    console.log('*** renderList ***')
    const { dataSource } = this.props.todos;
    console.log(dataSource);
    return (
      <ListView
        style = { styles.container }
        dataSource = { dataSource }
        renderHeader = { this.renderHeader.bind(this) }
        renderRow = { this.renderRow.bind(this) } />
    );
  }

  renderIndicator() {
    console.log('*** renderIndicator ***')
    return (
      <ActivityIndicatorIOS animating={true} color={'#808080'} size={'small'} />
    );
  }
  
  render() {
    console.log('render todos=');
    console.log(this.props);
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<');
    const { todos } = this.props;
    console.log(todos);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { todos.list && todos.list.length > 0 ? this.renderList() : this.renderIndicator()}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps')
  console.log(state);
  const todos = state.todos;
  return {
    todos: todos
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('mapDispatchToProps')
  return {
    loadData: () => dispatch(loadTodos()),
    appendTodo: (text) => dispatch(addTodo(text)),
    touchedTodo: (id) => dispatch(toggleTodo(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

const fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  todoRow: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: fullWidth,
    height: 40,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#666666',
  },
  todoTextDone: {
    fontSize: 16,
    color: '#999999',
    textDecorationColor: '#999999',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  success: {
    color: 'green',
  },
  pendding: {
    color: 'blue',
  },
  inputText: {
    height: 40,
    width: (fullWidth-20)*0.8,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (fullWidth - 20)*0.2,
    backgroundColor: '#EEEEEE',
    padding: 10,
  }
});