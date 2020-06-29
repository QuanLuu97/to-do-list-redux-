import React, { Component } from "react";
class TaskItem extends Component{
    toggleStatus(id) {
        this.props.toggleStatus(id);
    }

    deleteTask(id) {
        this.props.deleteTask(id);
    }

    editTask(id) {
        this.props.editTask(id);
    }

    render() {
        let task_item = null;
        if (this.props.tasks) {
            task_item = this.props.tasks.map((item, index) => {
                return(
                    <tr key={ index }>
                        <td>{ index + 1 }</td>
                        <td>{ item.name }</td>
                        <td className="text-center">
                        <span className={`btn label label-${item.status ? 'success' :'danger'} `}
                            type="button" onClick={() => this.toggleStatus(item.id)}>
                            { item.status ? 'Kích Hoạt' : 'Ẩn'}
                        </span>
                        </td>
                        <td className="text-center">
                            <button type="button" className="btn btn-warning" onClick={() => this.editTask(item.id)}>
                                <span className="fa fa-pencil mr-5"></span> Sửa
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-danger" onClick={() => this.deleteTask(item.id)}>
                                <span className="fa fa-trash mr-5"></span> Xóa
                            </button>
                        </td>
                    </tr>
                );
            });
        }
        return task_item;
    }
}
export default TaskItem