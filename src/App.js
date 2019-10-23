import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';


// Componentes intrínsecos da App
import MusicList from './components/MusicList';
import FavoriteMusicList from './components/FavoriteMusicList';
import MusicInfo from './components/MusicInfo';
import SignIn from './components/SignIn';
import UserInfo from './components/UserInfo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
    }
    this.setUserToken = this.setUserToken.bind(this);
  }

  // Este método é chamado pelos componentes descendentes (child components) 
  // para atualizar o state {userToken} da App, sempre que necessário
  setUserToken(token) {
    this.setState({
      userToken: token
    })
  }

  setUserName(name) {
    this.setState({
      userName: name
    })
  }

  // Objeto com as routes públicas e privadas
  routes() {
    return {
      public: [
        { link: "/", linkText: "Listagem de músicas", path: "/" },
        { link: "/auth", linkText: "Entrar", path: "/auth" },
      ],
      private: [
        { link: "/", linkText: "Listagem de músicas", path: "/" },
        { link: "/favorites", linkText: "Favoritas", path: "/favorites" },
        { link: "/user", linkText: "Perfil", path: "/user" },
      ]
    }
  }

  render() {
    // Constante que determina se vamos ler as routes privadas ou públicas do método routes()
    // Se o state não incluir um TOKEN, mostramos as routes públicas  
    const USER_ROUTES = this.state.userToken === null ? this.routes().public : this.routes().private

    return (
      <Router>
        <div className="container">
          <Nav className="justify-content-end">
            {
              USER_ROUTES.map((item, index) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link><Link to={item.link}>{item.linkText}</Link></Nav.Link>
                  </Nav.Item>
                )
              })
            }
          </Nav>
          <Switch>
            { /* Paths disponíveis para utilizadores não autenticados (public) */}
            <Route exact path="/"> <MusicList token={this.state.userToken} /> </Route>
            <Route path="/auth"> <SignIn setUserToken={this.setUserToken} /> </Route>
            <Route path="/music/:id"> <MusicInfo /> </Route>
            {

              this.state.userToken != null ?
                <>
                  { /* Paths disponíveis apenas quando o utilizador está autenticado */}
                  <Route path="/favorites"> <FavoriteMusicList token={this.state.userToken} /> </Route>
                  <Route path="/user"> <UserInfo token={this.state.userToken} setUserName={this.setUserName} /> </Route>
                </>
                :
                null
            }

          </Switch>
        </div>
      </Router>
    );
  }
}