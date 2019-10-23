import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Spinner from 'react-bootstrap/Spinner'
import Figure from 'react-bootstrap/Figure'
import Table from 'react-bootstrap/Table'
import { FaHeart, FaTimes } from "react-icons/fa";
import { ubiGet, ubiDelete } from '../controller/api'

export default class FavoriteMusicList extends Component {

    constructor(props) {
        super(props);

        this.global_userFavoriteMusicList = null;
        this.global_userToken = null;

        this.state = {
            userFavoriteMusicList: null,
            userFavoriteMusicInfo: null,
            userToken: null,
        };
    }

    componentDidMount() {
        this.setFreshData()
    }

    setFreshData() {
        this.resetGlobalVariables()
        const TOKEN = this.props.token;
        const URL = "https://songs-api-ubiwhere.now.sh/api/user-favorites/";
        ubiGet(URL, TOKEN)
            .then(
                data => {
                    this.global_userFavoriteMusicList = this.sortUserFavoriteMusicList(data);
                },
            )
            .then(
                () => {
                    this.getFavoriteMusicInfo()
                }
            )
    }

    resetGlobalVariables() {
        this.global_userFavoriteMusicList = null;
        this.global_userFavoriteMusicInfo = null;
    }

    changeState() {
        this.setState({
            userFavoriteMusicList: this.global_userFavoriteMusicList,
            userFavoriteMusicInfo: this.global_userFavoriteMusicInfo,
            userToken: this.props.token,
        });
    }

    getFavoriteMusicInfo() {
        let queryEmpty = "";
        for (let i = 0; i < this.global_userFavoriteMusicList.length; i++) {
            queryEmpty += `id=${this.global_userFavoriteMusicList[i].songId}&`;
        }
        const QUERY = `?${queryEmpty}`;
        const TOKEN = this.props.token;
        const URL = `https://songs-api-ubiwhere.now.sh/api/songs/${QUERY}`;
        ubiGet(URL, TOKEN).then(
            data => {
                this.global_userFavoriteMusicInfo = data;
                this.changeState();
            }
        )
    }

    sortUserFavoriteMusicList(data) {
        data.sort((a, b) => a.songId - b.songId)
        return data;
    }

    deleteFavorite(songId) {
        const TOKEN = this.state.userToken;
        const URL = "https://songs-api-ubiwhere.now.sh/api/user-favorites/";
        const BODY = { songId: songId };
        ubiDelete(URL, TOKEN, BODY)
            .then(
                data => {
                    console.log(data);
                    this.setFreshData();
                }
            )
    }

    artistThumbnail(src, artist) {
        return <Figure>
            <Figure.Image rounded fluid
                width={43}
                height={45}
                alt={artist}
                src={src}
            />
        </Figure>
    }

    tableRow(object) {
        const { index, id, imgUrl, artist, title, year } = object;
        return <tr key={index}>
            <td>{this.artistThumbnail(imgUrl, artist)}</td>
            <td>{title}</td>
            <td>{artist}</td>
            <td>{year}</td>
            <td className="deleteFavorite" onClick={() => this.deleteFavorite(id)}><FaTimes /></td>
        </tr>
    }

    render() {
        const MUSIC_FAV_LIST = this.state.userFavoriteMusicList;
        const MUSIC_FAV_INFO = this.state.userFavoriteMusicInfo;
        return (
            <div className="container">
                <Tabs defaultActiveKey="favoritas" id="uncontrolled-tab-example">

                    <Tab eventKey="favoritas" title="Músicas favoritas">
                        <p></p>
                        {
                            MUSIC_FAV_LIST === null ?
                                <Spinner animation="border" variant="dark" />
                                :
                                MUSIC_FAV_LIST.length === 0 ?
                                    <h3>Sem músicas favoritas</h3>
                                    :
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Avatar</th>
                                                <th>Título</th>
                                                <th>Artista</th>
                                                <th>Ano</th>
                                                <th className="deleteFavorite"><FaHeart /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                MUSIC_FAV_LIST.map((item, index) =>
                                                    this.tableRow(
                                                        {
                                                            index: index,
                                                            id: item.songId,
                                                            imgUrl: MUSIC_FAV_INFO[index].imgUrl,
                                                            artist: MUSIC_FAV_INFO[index].artist,
                                                            title: MUSIC_FAV_INFO[index].title,
                                                            year: MUSIC_FAV_INFO[index].year,
                                                        })
                                                )
                                            }
                                        </tbody>
                                    </Table>
                        }

                    </Tab>
                </Tabs>
            </div >
        )
    }
}