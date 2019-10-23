import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import { BrowserRouter as useParams } from "react-router-dom";

export default class MusicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: []
        };
    }

    componentDidMount() {
        let CURRENT_PATH = window.location.pathname.split('/');
        let SONG_ID = CURRENT_PATH[CURRENT_PATH.length - 1]
        async function getMusicInfo() {
            const MUSIC_ID = SONG_ID;
            let response = await fetch(`https://songs-api-ubiwhere.now.sh/api/songs/${MUSIC_ID}`);
            let data = await response.json()
            console.log(`Response status: ${response.status}`)
            return data;
        }

        getMusicInfo()
            .then(
                data => this.setState({ info: data })
            )
    }

    render() {

        return (
            <div>
                <Jumbotron thumbnail>
                    <div className="container">
                        <Image src={this.state.info.imgUrl} roundedCircle />
                        <hr></hr>
                        <p><b>Artista:</b> {this.state.info.artist}</p>
                        <p><b>Título:</b> {this.state.info.title}</p>
                        <p><b>Ano de lançamento:</b> {this.state.info.year}</p>
                    </div>
                </Jumbotron>
            </div>
        )
    }
}
