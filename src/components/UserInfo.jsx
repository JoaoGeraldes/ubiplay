import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Spinner from 'react-bootstrap/Spinner'
import { ubiGet } from '../controller/api'

export default class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        };
    }

    componentDidMount() {
        const TOKEN = this.props.token;
        const URL = "https://songs-api-ubiwhere.now.sh/api/users/me";
        ubiGet(URL, TOKEN).then(
            data => {
                console.log(data);
                this.setState({
                    userInfo: data
                });
            }
        )
    }

    render() {
        return (
            <div className="container">
                <Tabs defaultActiveKey="perfil" id="uncontrolled-tab-example">
                    <Tab eventKey="perfil" title="Perfil">
                        {
                            this.state.userInfo === null ? <Spinner animation="border" variant="dark" />
                                :
                                <div>
                                    <h5> {`ID: ${this.state.userInfo.id}`} </h5>
                                    <h4> {`Nome: ${this.state.userInfo.name}`} </h4>
                                    <h4> {`Email: ${this.state.userInfo.email}`} </h4>
                                </div>
                        }
                    </Tab>

                </Tabs>
            </div>
        )
    }
}
