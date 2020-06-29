import React, { Component } from "react";
import _ from'lodash/core';
class TaskForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
            lastRow: {}
        };
    }

    componentDidMount() {
        if (!_.isEmpty(this.props.task)) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        }
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     //     console.log(nextProps, this.props);
    //     // }

    static getDerivedStateFromProps(props, state) {
        if (JSON.stringify(props.task) !== JSON.stringify(state.lastRow)) {
            return {
                id: props.task.id ?? '',
                name: props.task.name ?? '',
                status: props.task.status ?? false,
                lastRow: props.task
            }
        }
        return state;
    }


    closeForm() {
        this.props.closeForm(true);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.name === 'status' ? (e.target.value === "1") : e.target.value
        })
    }

    submitForm(e) {
        e.preventDefault();
        if (this.state.id === '') {
            this.props.addTask({name: this.state.name, status: this.state.status});
            this.setState({
                id: '',
                name: '',
                status: false,
                lastRow: {}
            })
        }
        else {
            this.props.updateTask({id: this.state.id, name: this.state.name, status: this.state.status})
        }
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading" style={{position: 'relative'}}>
                    <h3 className="panel-title">{ this.state.id ? 'Cập Nhật Công Việc' : 'Thêm Công Việc' }</h3>
                    <span type="button" className={`fa fa-times-circle close-task-form btn`} onClick={ () => this.closeForm() }> </span>
                </div>
                <div className="panel-body">
                    <form onSubmit={ (e) => this.submitForm(e) }>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" name="name" className="form-control" value={ this.state.name } onChange={ (e) => this.change(e) }/>
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" name="status" required="required" value={ this.state.status ? 1 : 0 } onChange={ (e) => this.change(e)}>
                            <option value={1}>Kích Hoạt</option>
                            <option value={0}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">{ this.state.id ? 'Cập nhật' : 'Thêm'}</button>
                            &nbsp;
                            <button type="reset" onClick={ () => this.closeForm() } className="btn btn-danger">Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default TaskForm