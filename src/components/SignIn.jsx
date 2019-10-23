import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { ubiPost, ubiGet } from '../controller/api';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleOnChange(event) {
        event.preventDefault();
        let type = event.target.type;
        let value = event.target.value;
        this.setState({
            [type]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const SET_TOKEN_METHOD = this.props.setUserToken;
        const BODY = this.state;
        const URL = "https://songs-api-ubiwhere.now.sh/api/auth/login";

        ubiPost(URL, null, BODY).then(
            data => {
                console.log(data)
                SET_TOKEN_METHOD(data.token);
            }
        )
    }

    render() {
        return (
            <Jumbotron>
                <h2>Iniciar sessão</h2>
                <p></p>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Endereço de Email" onChange={this.handleOnChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Palavra-passe" onChange={this.handleOnChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Entrar
                    </Button>
                </Form>
            </Jumbotron>
        )
    }
}
