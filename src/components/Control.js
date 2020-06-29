import React, { Component } from "react";
import Sort from "./Sort";
import Search from "./Search";

class Control extends Component{
    search(key) {
        this.props.search(key);
    }

    sort(sortName, sortBy) {
        this.props.sort(sortName, sortBy)
    }

    render() {
        return(
            <div className="row mt-15">
                <Search search={(key) => this.search(key)} />
                <Sort sort={(sortName, sortBy) => this.sort(sortName, sortBy)} />
            </div>
        )
    }
}

export default Control;