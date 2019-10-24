import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner'
import { NavLink } from "react-router-dom";
import { ubiGet, ubiPost, ubiDelete } from '../controller/api';
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";


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

    }

    componentDidMount() {
        this.setFreshData();
    }

    resetGlobalVariables() {
        this.musicList = null;
        this.userFavorites = null;
        this.favoriteIndex = 0;
    }


    setFreshData() {
        const URL = "https://songs-api-ubiwhere.now.sh/api/songs";
        ubiGet(URL)
            .then(
                data => this.musicList = data
            )
            .then(
                () => this.props.token ? this.getUserFavorites() : this.changeState()
            )
    }

    getUserFavorites() {
        const TOKEN = this.props.token;
        const URL = "https://songs-api-ubiwhere.now.sh/api/user-favorites/"
        ubiGet(URL, TOKEN)
            .then(
                data => {
                    // Faço sort (ordem ascendente) da array dos favoritos para ser usado mais tarde na pesquisa das músicas favoritas
                    data.sort((a, b) => a.songId - b.songId)
                    this.userFavorites = data;
                    this.changeState();
                }
            );
    }

    changeState() {
        if (this.props.token) this.setFavoriteList();
        this.setState({
            musicList: this.musicList,
            userFavorites: this.userFavorites,
        });
    }

    // Corre antes do changeState()
    setFavoriteList() {
        this.musicList.forEach((item, index) => {
            if (this.favoriteIndex >= this.userFavorites.length) {
                return;
            }
            if (item.id === this.userFavorites[this.favoriteIndex].songId) {
                item.favorite = true;
                this.favoriteIndex = this.favoriteIndex + 1;
            } else {
                item.favorite = false;
            }
        });
    }

    setFavorite(songId) {
        const TOKEN = this.props.token;
        const URL = "https://songs-api-ubiwhere.now.sh/api/user-favorites/";
        const BODY = { songId: songId };
        ubiPost(URL, TOKEN, BODY).then(
            data => {
                console.log(data);
                this.resetGlobalVariables();
                this.setFreshData();
            }

        )
    }

    deleteFavorite(songId) {
        const TOKEN = this.props.token;
        const URL = "https://songs-api-ubiwhere.now.sh/api/user-favorites/";
        const BODY = { songId: songId };
        ubiDelete(URL, TOKEN, BODY).then(
            data => {
                console.log(data);
                this.resetGlobalVariables();
                this.setFreshData();
            }
        )
    }

    render() {
        const TOKEN = this.props.token;
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
                            this.state.musicList.length < 1 ? <Spinner animation="border" variant="light" />
                                :
                                this.state.musicList.map((item, index) =>
                                    <tr key={index}>
                                        <td onClick={() => item.favorite === true ? this.deleteFavorite(item.id) : this.setFavorite(item.id)}>
                                            {
                                                TOKEN === null ? null
                                                    :
                                                    TOKEN !== null && item.favorite === true ? <FaHeart />
                                                        :
                                                        <FaRegHeart />
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.artist}</td>
                                        <td><NavLink to={`music/${index + 1}`} activeClassName="hurray"><FaInfoCircle /></NavLink></td>
                                    </tr>
                                )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
