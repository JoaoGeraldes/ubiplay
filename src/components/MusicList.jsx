import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner'
import { NavLink } from "react-router-dom";
import { ubiGet, ubiPost } from '../controller/api';
import { FaHeart, FaRegHeart } from "react-icons/fa";


export default class MusicList extends Component {
    constructor(props) {
        super(props);

        this.musicList = null;
        this.userFavorites = null;
        this.favoriteIndex = 0;

        this.state = {
            musicList: [],
            userFavorites: [],
        };

        this.isUserFavorite = this.isUserFavorite.bind(this);
    }

    componentDidMount() {
        const URL = "https://songs-api-ubiwhere.now.sh/api/songs";
        ubiGet(URL)
            .then(
                data => this.musicList = data
            )
            .then(
                () => this.props.token ? this.getUserFavorites() : this.changeState()
            )

    }

    changeState() {
        this.setState({
            musicList: this.musicList,
            userFavorites: this.userFavorites,
        });
    }

    getUserFavorites() {
        const TOKEN = this.props.token;
        const URL = "https://songs-api-ubiwhere.now.sh/api/user-favorites/"
        ubiGet(URL, TOKEN)
            .then(
                data => {
                    // Faço sort da array dos favoritos para ser usado mais tarde, no método isUserFavorite()
                    data.sort((a, b) => a.songId - b.songId)
                    this.userFavorites = data;
                    this.changeState();
                }
            );
    }

    isUserFavorite(id) {
        if (this.favoriteIndex >= this.state.userFavorites.length) return;
        let match = id === this.state.userFavorites[this.favoriteIndex].songId;
        if (match === true) {
            this.favoriteIndex = this.favoriteIndex + 1;
        }
        return match;
    }

    setFavorite(songId) {
        const TOKEN = this.props.token;
        const URL = "https://songs-api-ubiwhere.now.sh/api/user-favorites/";
        const BODY = { songId: songId };
        ubiPost(URL, TOKEN, BODY).then(
            data => console.log(data)
        )
    }

    deleteFavorite(songId) {
        const TOKEN = this.props.token;
        const URL = "https://songs-api-ubiwhere.now.sh/api/user-favorites/";
        const BODY = { songId: songId };
        ubiPost(URL, TOKEN, BODY).then(
            data => console.log(data)
        )
    }

    render() {
        const TOKEN = this.props.token;
        const isUserFavorite = param => this.isUserFavorite(param);

        return (
            <div>
                <Table striped bordered hover variant="dark" responsive borderless>
                    <thead>
                        <tr>
                            <th><FaRegHeart /></th>
                            <th>Título</th>
                            <th>Artista</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.musicList === null ? <Spinner animation="border" variant="light" />
                                :
                                this.state.musicList.map((item, index) =>
                                    <tr key={index}>
                                        <td onClick={() => TOKEN !== null && this.isUserFavorite(item.id) ? console.log("true") : console.log("false")}>
                                            {
                                                TOKEN === null ? null
                                                    :
                                                    TOKEN !== null && this.isUserFavorite(item.id) === true ? <FaHeart />
                                                        :
                                                        <FaRegHeart />
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.artist}</td>
                                        <td><NavLink to={`music/${index + 1}`} activeClassName="hurray">info</NavLink></td>
                                    </tr>
                                )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
