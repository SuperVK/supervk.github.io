import React from 'react';
import {Parallax} from 'react-parallax'
import './App.css';
import './Animations.css'
import Home from './pages/Home/Home';
import Huetify from './pages/Huetify/Huetify';
import NavBarItem from './NavBarItem';
import Shipulator from './pages/Shipulator/Shipulator';
import DayDreams from './pages/DayDreams/DayDreams';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: 'HOME'
        }
    }
    updatePage(location) {
        window.scrollBy(0, 1000)
        this.setState({ activePage: location })
    }
    render() {
        let activePage;
        switch(this.state.activePage) {
            case 'HUETIFY': {
                activePage = <Huetify></Huetify>
                break;
            }
            case 'SHIPULATOR': {
                activePage = <Shipulator></Shipulator>
                break;
            }
            case 'DAYDREAMS': {
                activePage = <DayDreams></DayDreams>
                break;
            }
            default: {
                activePage = <Home></Home>
                break;
            }
        }
        
        return (
            <div className="App" id="App">
                <Parallax
                    style={{backgroundColor: 'black'}}
                    bgImage={process.env.PUBLIC_URL+'/imgs/1425.jpg'}
                    bgImageAlt="bgimage"
                    strength={600}
                    bgImageStyle={{opacity: '.8'}}
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
                            <NavBarItem 
                                name={'Home'}
                                selected={this.state.activePage === 'HOME'} 
                                onClick={this.updatePage.bind(this, 'HOME')}
                                bgColorTheme={'rgb(235, 235, 235)'}
                                colorTheme={'black'}
                            />
                            <NavBarItem 
                                name={'Huetify'}
                                selected={this.state.activePage === 'HUETIFY'} 
                                onClick={this.updatePage.bind(this, 'HUETIFY')}
                                bgColorTheme={'#212121'}
                                colorTheme={'white'}
                            />
                            <NavBarItem 
                                name={'Shipulator'}
                                selected={this.state.activePage === 'SHIPULATOR'} 
                                onClick={this.updatePage.bind(this, 'SHIPULATOR')}
                                bgColorTheme={'#333C40'}
                                colorTheme={'white'}
                            />
                            <NavBarItem 
                                name={'Day Dreams'}
                                selected={this.state.activePage === 'DAYDREAMS'} 
                                onClick={this.updatePage.bind(this, 'DAYDREAMS')}
                                bgColorTheme={'rgb(255, 239, 241)'}
                                colorTheme={'black'}
                            />
                        </div>
                    </nav>
                    <div className="page" style={{height: window.innerHeight*0.95}}>{activePage}</div>
                </div>
            </div>
        );
    }
}

export default App;
