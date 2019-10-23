import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Spinner from 'react-bootstrap/Spinner'
import { ubiGet } from '../controller/api'
import Card from 'react-bootstrap/Card'
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
                                    <p></p>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src="https://picsum.photos/286/180.jpg" />
                                        <Card.Body>
                                            <Card.Title>{this.state.userInfo.name}</Card.Title>
                                            <Card.Text>
                                                {this.state.userInfo.email}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                        }
                    </Tab>

                </Tabs>
            </div>
        )
    }
}
