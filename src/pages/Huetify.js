import React, { Component } from 'react'
import './Huetify.css'

export default class Huetify extends Component {
    render() {
        return (
            <div className="HuetifyApp">
                <div id="buffer0"></div>
                <img src={corner} id="corner0" alt="fancy graphic"></img>
                <div className="Title">Huetify</div>
                <img src={corner} id="corner1" alt="fancy graphic"></img>
                <div id="buffer1"></div>
                <div className="Subtitle">
                    Immerse yourself in your music,<br/>
                    by combining your Philips Hue lamps with Spotify
                </div>
                <div id="buffer2"></div>
                <a className="DownloadButton" href="https://github.com/SuperVK/Huetify/releases/latest">DOWNLOAD</a>
                <div className="antivirus">*Click on advanced options and continue when windows defender comes up (I swear it's not a virus)</div>
                <div id="buffer3"></div>

                <footer className="footer">
                    © 2019 Victor Klomp | Built using <a href="https://developer.spotify.com/">Spotify API</a>, <a href="https://developers.meethue.com/">Hue API</a> and <a href="https://reactjs.org/">ReactJS</a>
                </footer>
            </div>
        )
    }
}
