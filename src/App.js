import React, {Component} from 'react';
import './App.css';
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import { v4 as uuidv4 } from 'uuid';
import Axios from "axios";
import _ from'lodash/core';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            task: {},
            display: false
        }
    }
    generateData() {
        const that = this;
        Axios.get('https://5e15ea6821f9c90014c3d8a0.mockapi.io/users').then(function (rs) {
            const { data } = rs;
            that.updateState(data);
        }).catch(function (err) {
            console.log(err);
        });
    }

    updateState(tasks) {
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    componentDidMount() {
        if (localStorage.getItem('tasks')) {
            this.setState({
                tasks: JSON.parse(localStorage.getItem('tasks'))
            });
        }
    }

    closeForm() {
        this.setState({
            display: false,
            task: {}
        });
    }

    openForm() {
        this.setState({
            display: true,
            task: {}
        });
    }

    addTask(task) {
        const id = uuidv4();
        task = {id: id, ...task};
        let tasks = [task, ...this.state.tasks];
        this.updateState(tasks);
    }

    toggleStatus(id) {
        let {tasks} = this.state;
        const index = tasks.findIndex(item => (item.id === id));
        tasks[index].status = !tasks[index].status;
        this.updateState(tasks);
    }

    deleteTask(id) {
        let {tasks} = this.state;
        const index = tasks.findIndex(item => (item.id === id));
        tasks.splice(index, 1);
        this.updateState(tasks);
    }

    editTask(id) {
        this.setState({
            display: true
        });
        let {tasks} = this.state;
        const task = tasks.filter(item => (item.id === id));
        this.setState({
            task: task[0]
        })
    }

    updateTask(task) {
        let {tasks} = this.state;
        const index = tasks.findIndex(item => (item.id === task.id));
        tasks[index] = task;
        this.updateState(tasks);
    }

    search(key) {
        let data = [];
        if (!_.isEmpty(localStorage.getItem('tasks'))) {
            data = JSON.parse(localStorage.getItem('tasks'));
        }
        const tasks = data.filter(task => {
            return task.name.toLowerCase().indexOf(key.toLowerCase()) > -1;
        });

        this.setState({
            tasks: tasks
        })
    }

    filterByStatus(status) {
        let data = [];
        if (!_.isEmpty(localStorage.getItem('tasks'))) {
            data = JSON.parse(localStorage.getItem('tasks'));
        }
        let tasks = data;
        if (status !== -1) {
            tasks = data.filter(task => {
                return task.status === (status === 1);
            });
        }

        this.setState({
            tasks: tasks
        })
    }

    sort(sortName, sortBy) {
        let {tasks} = this.state;
        tasks.sort((t1, t2) => {
            return t1[sortName].toLowerCase() > t2[sortName].toLowerCase() ? sortBy : -(sortBy);
        });
        this.setState({
            tasks: tasks
        })
    }

    render() {
        const taskForm = this.state.display ? (
            <TaskForm
                      closeForm={() => this.closeForm()}
                      addTask={(task) => this.addTask(task)}
                      task={ this.state.task }
                      updateTask={(task) => this.updateTask(task)}
            />
        ) : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ this.state.display ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        { taskForm }
                    </div>
                    <div className={ this.state.display ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={ () => this.openForm() }>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button type="button" className="btn btn-success ml-5" onClick={ () => this.generateData() }>
                            <span className="fa fa-plus mr-5"></span> Generate Data
                        </button>
                        <Control
                            search={(key) => this.search(key)}
                            sort={(sortName, sortBy) => this.sort(sortName, sortBy)}
                        />
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList tasks={ this.state.tasks }
                                          toggleStatus={(id) => this.toggleStatus(id)}
                                          deleteTask={(id) => this.deleteTask(id)}
                                          editTask={(id) => this.editTask(id)}
                                          filterByStatus={(status) => this.filterByStatus(status)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
