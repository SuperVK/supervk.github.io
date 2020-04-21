import React from 'react';
import {Parallax} from 'react-parallax'
import './App.css';
import Home from './pages/Home';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: 'header'
        }
    }
 
    render() {
        let activePage;
        switch(this.state.activePage) {
            default: {
                activePage = <Home></Home>
                break;
            }
        }

        return (
            <div className="App" id="App">
                <Parallax
                    bgImage={process.env.PUBLIC_URL+'/1425.jpg'}
                    bgImageAlt="bgimage"
                    strength={600}
                    className="parallaxHeader"
                >
                    <div style={{ height: window.innerHeight*0.95 }} className="headerContent"> 
                        <div className="titleName">Victor "SuperVK" Klomp</div>
                    </div>
                </Parallax>
                {/* <div className="TopHeader" id="header">
                    <div className="TitleName" id="TitleName">Victor "SuperVK" Klomp</div>
                </div> */}
                <div className="content" style={{ height: window.innerHeight, maxHeight: window.innerHeight}}>
                    <nav className="navbar" style={{height: window.innerHeight*0.05}}>
                        <div className="navbarFlex">
                            <div className="navbarItem">Home</div>
                            <div className="navbarItem">Huetify</div>
                            <div className="navbarItem">Shipulator</div>
                            <div className="navbarItem">Day dreams</div>
                        </div>
                    </nav>
                    {activePage}
                </div>
            </div>
        );
    }
}

export default App;
