import React, { Component } from 'react'
import './Home.css'

export default class Home extends Component {

    render() {
        return (

            <div className="text">
                <img src={process.env.PUBLIC_URL+'/imgs/VK-Isaak.png'} className="logo" alt="logo" style={{
                    height: '128px',
                    width: '128px'
                }}></img>
                <div className="Paragraph">
                    <div className="Title">About me</div>
                    <div className="ParagraphText">I'm Victor Klomp, also known as SuperVK, I have been coding since 2017 and have worked on various small projects since, 
                    from various bots to Internet of Things applications, you can find my biggest projects above, and various small webapps in day dreams. I also like to take pictures which you can find on my instagram.
                    You can find me in my discord (linked below) which I run with <a href="https://martve.me">Mart</a>, a friend of mine. 
                    </div>
                </div>
                <div className="Paragraph">
                    <div className="Title">Socials/Contact</div>
                    <div className="socials">
                        <img alt="twitter" src="https://img.icons8.com/windows/64/000000/twitter.png"/>
                        <img alt="github" src="https://img.icons8.com/windows/64/000000/github.png"/>
                        <img alt="discord" src="https://img.icons8.com/ios-filled/64/000000/discord-logo.png"/>
                        <img alt="instagram" src="https://img.icons8.com/windows/64/000000/instagram-new.png"/>
                        <img alt="steam" src="https://img.icons8.com/windows/64/000000/steam-symbol.png"/>
                    </div>
                </div>
                
            </div>

        )
    }
}
