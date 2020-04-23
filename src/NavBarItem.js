import React, { Component } from 'react'

export default class NavBarItem extends Component {
    render() {
        let style = {};

        if(this.props.selected) {
            style = {
                backgroundColor: this.props.bgColorTheme,
                color: this.props.colorTheme ? this.props.colorTheme : 'white'
            }
        }

        return (
            <div onClick={this.props.onClick} className={`navbarItem ${this.props.selected ? 'fade-in': ''}`} style={style}>
                <div className="navbarTitle">{this.props.name}</div>
            </div>
        )
    }
}
