import React, { Component } from "react";
class Sort extends Component {
    sort(sortName, sortBy) {
        this.props.sort(sortName, sortBy)
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"> </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li>
                            <p className={`pl-15`} role="button"
                                onClick={() => this.sort('name', 1)}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                            </p>
                        </li>
                        <li>
                            <p className={`pl-15`} role="button"
                               onClick={() => this.sort('name', -1)}
                            >
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                </span>
                            </p>
                        </li>
                        <li role="separator" className="divider"> </li>
                        <li><p className={`pl-15`} role="button">Trạng Thái Kích Hoạt</p></li>
                        <li><p className={`pl-15`} role="button">Trạng Thái Ẩn</p></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Sort;