import React, { Component } from 'react'

export default class Home extends Component {

    render() {
        return (
            <div className="page">
                <div className="text">
                    <img src={process.env.PUBLIC_URL+'/VK-Isaak.png'} style={{
                        height: '128px',
                        width: '128px'
                    }}></img>
                    <div className="Paragraph">
                        <div className="Title">About me</div>
                        <div className="ParagraphText">I'm Victor Klomp, also known as SuperVK, I have been coding since 2017 and have worked on various small projects since, 
                        from various bots to IoT applications, you can find my biggest projects above, and various small webapps in day dreams. I also like to take pictures which you can find on my instagram.
                        You can find me in my discord (linked below) which I run with <a href="https://martve.me">Mart</a>, a friend of mine. 
                        </div>
                    </div>
                    <div className="Paragraph">
                        <div className="Title">Socials/Contact</div>
                        <div className="socials">
                            <img src="https://img.icons8.com/windows/64/000000/twitter.png"/>
                            <img src="https://img.icons8.com/windows/64/000000/github.png"/>
                            <img src="https://img.icons8.com/ios-filled/64/000000/discord-logo.png"/>
                            <img src="https://img.icons8.com/windows/64/000000/instagram-new.png"/>
                            <img src="https://img.icons8.com/windows/64/000000/steam-symbol.png"/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
