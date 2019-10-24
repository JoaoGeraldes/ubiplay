import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { ubiPost } from '../controller/api';
import Alert from 'react-bootstrap/Alert'

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.global_userInput = {
            email: null,
            password: null,
        }
        this.global_apiData = null;

        this.state = {
            error: null
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleOnChange(event) {
        event.preventDefault();
        let userInput = this.global_userInput;
        let type = event.target.type;
        let value = event.target.value;
        type === "email" ? userInput.email = value : userInput.password = value
    }

    handleSubmit(e) {
        e.preventDefault();
        //const TOKEN = this.props.token;
        const BODY = this.global_userInput;
        const URL = "https://songs-api-ubiwhere.now.sh/api/auth/login";

        ubiPost(URL, null, BODY)
            .then(
                (data) => {
                    this.global_apiData = data
                }
            )
            .then(
                () => this.changeState()
            )
    }

    changeState() {
        let error = null;
        if (this.global_apiData.token) {
            this.props.setUserToken(this.global_apiData.token)
            error = false;
        } else {
            error = true;
        }
        this.setState({
            error: error
        });
    }

    viewError(type) {
        let msg = type === "danger" ? "Email ou password incorrecta" : "Sessão iniciada ✔"
        return <Alert variant={type}>
            {msg}
        </Alert>
    }

    render() {
        let ERROR = this.state.error;
        return (
            <Jumbotron>
                {
                    ERROR === false ? this.viewError("success")
                        :
                        ERROR === true ? this.viewError("danger")
                            :
                            null
                }
                <h2>Iniciar sessão</h2>
                <p></p>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled={ERROR === false} type="email" placeholder="Endereço de Email" onChange={this.handleOnChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control disabled={ERROR === false} type="password" placeholder="Palavra-passe" onChange={this.handleOnChange} />
                    </Form.Group>
                    <Button disabled={ERROR === false} variant="primary" type="submit" onClick={this.handleSubmit}>
                        Entrar
                    </Button>
                </Form>
                {ERROR === false ? <div className="endSession"><a href="/">Terminar sessão</a></div> : null}
            </Jumbotron>
        )
    }
}
