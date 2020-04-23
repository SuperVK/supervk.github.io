import React, { Component } from 'react'
import DayDreamsList from './DayDreamsList.js'
import './DayDreams.css'

export default class DayDreams extends Component {
    render() {
        return (
            <div className="DayDreamsApp PageContent">
                <div className="ddtitle">Day Dreams</div>
                <div className="ddDescription">Day dreams are small projects usually consisting of one page and a canvas, and often very bare bones. The source code for these are available <a className="BlackLink" target="_blank" rel="noopener noreferrer" href="https://github.com/SuperVK/supervk.github.io/tree/source/public/daydreams">here</a>.</div>
                <div className="DDGrid">
                    {DayDreamsList.map(DayDream => {
                        return (
                            <div className="DayDreamWrap" key={DayDream.name}>
                                <a href={`/daydreams/${DayDream.name}`} className="DayDream" style={{
                                        backgroundImage: `url(${process.env.PUBLIC_URL}/daydreams/${DayDream.name}/thumbnail.png)`,
                                        backgroundSize: 'cover'
                                    }}>
                                    <div className="DDBuffer"></div>
                                    <div className="DDTitle">{DayDream.name}</div>
                                    <div className="DDContent">
                                        <div className="DDDesc">{DayDream.description}</div>
                                        <div className="DDDate">{DayDream.date.toLocaleDateString(
                                            undefined,
                                            {
                                                year: 'numeric',
                                                month: 'short',

                                            }
                                        )}</div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
