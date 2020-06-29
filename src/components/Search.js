import React, { Component } from "react";
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: ''
        }
    }

    setKeyWord(e) {
        this.setState({
            keyWord: e.target.value
        })
    }

    search() {
        this.props.search(this.state.keyWord)
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nhập từ khóa..."
                        value={this.state.keyWord}
                        onChange={(e) => this.setKeyWord(e)}
                    />
                    <span className="input-group-btn">
                    <button className="btn btn-primary" type="button"
                        onClick={ () => this.search() }
                    >
                        <span className="fa fa-search mr-5"> </span>Tìm
                    </button>
                    </span>
                </div>
            </div>
        )
    }
}
export default Search;