'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import LocalDb from 'localDb';
import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoFooter from './TodoFooter.js';

class App extends React.Component {
    constructor() { //定义App类的构造函数
        super();
        this.db = new LocalDb('ReactDemo','Object');
        this.state = { //定义组件状态
            todos: this.db.get('todos') || [],
            isAllChecked: false
        }
    }
    // 判断是否所有任务的状态都完成，同步底部的全选框
    allChecked() {
        let isAllChecked = false;
        if(this.state.todos.every(todo => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({ // 改变状态，组件重绘
            todos: this.state.todos,
            isAllChecked: isAllChecked
        });
    }
    // 添加任务，是传递给Header组件的方法
    addTodo(todoItem) {
        this.state.todos.push(todoItem); // todo列表
        this.db.set('todos', this.state.todos);
        this.allChecked();
    }
    // 删除当前的任务，传递给TodoItem的方法
    deleteTodo(index) {
        this.state.todos.splice(index, 1);
        this.setState({todos: this.state.todos}); //改变状态
        this.db.set("todos", this.state.todos);
    }
    // 清除已完成的任务，传递给Footer组件的方法
    clearDone(){
        let todos = this.state.todos.filter(todo => !todo.isDone) //过滤掉数组中todo.isDone为true的item.
        this.setState({
            todos: todos,
            isAllChecked: false
        });
        this.db.set('todos', todos);
    }
    // 改变任务状态，传递给TodoItem和Footer组件的方法
    changeTodoState(index, isDone, isChangeAll=false){
        if(isChangeAll){ //全部操作
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            });
        }else{ //操作其中一个todo
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
        this.db.set('todos', this.state.todos);
    }
    //组件渲染方法
    render() {
        let info = {
            isAllChecked: this.state.isAllChecked,
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
        };
        return (
            <div className="todo-wrap">
                <TodoHeader addTodo={this.addTodo.bind(this)} />
                <TodoMain todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)} changeTodoState={this.changeTodoState.bind(this)} />
                <TodoFooter {...info} clearDone={this.clearDone.bind(this)}  changeTodoState={this.changeTodoState.bind(this)}/>
                
           </div>
        );
    }
}

ReactDOM.render(<App></App>, document.getElementById('app'));