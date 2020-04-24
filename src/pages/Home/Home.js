import React, { Component } from 'react'
import './Home.css'

export default class Home extends Component {

    render() {
        return (

            <div className="HomeApp">
                <div className="PageContent">
                    <img src={process.env.PUBLIC_URL+'/imgs/VK-Isaak.png'} className="logo" alt="logo" style={{
                        height: '128px',
                        width: '128px'
                    }}></img>
                    <div className="Paragraph">
                        <div className="Title">About me</div>
                        <div className="ParagraphText">I'm Victor Klomp, also known as SuperVK, I have been coding since 2017 and have worked on various small projects since, 
                        from various bots to Internet of Things applications, you can find my biggest projects above, and various small webapps in day dreams. I also like to take pictures which you can find on my instagram.
                        You can find me and get notified for updates in my discord (linked below) which I run with <a target="_blank" rel="noopener noreferrer" className="BlackLink" href="https://martve.me">Mart</a>. 
                        </div>
                    </div>
                    <div className="Paragraph">
                        <div className="Title">Socials</div>
                        <div className="socials">
                            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/SuperVK_"><img alt="twitter" className="icon" src="https://img.icons8.com/windows/128/000000/twitter.png"/></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/SuperVK"><img alt="github" className="icon" src="https://img.icons8.com/windows/128/000000/github.png"/></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/73wJTPa"><img alt="discord" className="icon" src="https://img.icons8.com/ios-filled/128/000000/discord-logo.png"/></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/supervk_C"><img alt="instagram" className="icon" src="https://img.icons8.com/windows/128/000000/instagram-new.png"/></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://steamcommunity.com/id/SuperVK/"><img alt="steam" className="icon" src="https://img.icons8.com/windows/128/000000/steam-symbol.png"/></a>
                        </div>
                    </div>
                </div>
                
            </div>

        )
    }
}
