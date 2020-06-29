import React, { Component } from "react";
import TaskItem from "./TaskItem";
class TaskList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statusFilter: -1
        }
    }

    toggleStatus(id) {
        this.props.toggleStatus(id);
    }

    deleteTask(id) {
        this.props.deleteTask(id);
    }

    editTask(id) {
        this.props.editTask(id);
    }

    filterByStatus(e) {
        this.setState({
            statusFilter: parseInt(e.target.value)
        });
        this.props.filterByStatus(parseInt(e.target.value));
    }

    render() {
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text" className="form-control"/>
                    </td>
                    <td>
                        <select className="form-control"
                            value={this.state.statusFilter}
                            onChange={(e) => this.filterByStatus(e)}
                        >
                            <option value="-1">Tất Cả</option>
                            <option value="0">Ẩn</option>
                            <option value="1">Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <TaskItem  tasks={ this.props.tasks }
                           toggleStatus={(id) => this.toggleStatus(id)}
                           deleteTask={(id) => this.deleteTask(id)}
                           editTask={(id) => this.editTask(id)}
                />
                </tbody>
            </table>
        )
    }
}

export default TaskList;