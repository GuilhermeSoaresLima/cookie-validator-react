import React from 'react';
import './cookie-container.scss';

class CookieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCookie: false };
    this.genericFunction = this.genericFunction.bind(this);
  }

  // componentWillMount() {
  //   // chama método antes de inicializar o render();
  //   console.log('WillMount'); // é chamado antes

  //   this.setState({ showCookie: this.compareDate() });
  // }

  componentDidMount() {
    // chama método antes de inicializar o render();
    console.log('WillMount'); // é chamado antes

    this.setState({ showCookie: this.compareDate() });
  }

  getLastCookie(cookie) {
    if (cookie.length > 0) {
      const lastCookie = cookie[0].split('=');

      return {
        name: lastCookie[0].trim(),
        hour: lastCookie[1]
      };
    }

    return {
      name: '',
      hour: ''
    };
  }

  createNewCookie() {
    const currentCookieDate = new Date();
    const expirationDate = new Date(
      currentCookieDate.getTime() + 24 * 60 * 60 * 1000
    );
    document.cookie = `expirationDate=${expirationDate}; expires=${expirationDate};`;

    this.setState({
      showCookie: false
    });
  }

  checkCookies() {
    const lastCookie = document.cookie
      .split(';')
      .filter(row => row.includes('expirationDate'));
    console.log(this.getLastCookie(lastCookie));

    return this.getLastCookie(lastCookie);
  }

  compareDate() {
    const dayToTimesTamp = 24 * 60 * 60 * 1000;
    const lastCookie = this.checkCookies();
    const lastCookieToTimestamp = new Date(`${lastCookie.hour}`);
    const currentTime = new Date();
    console.log('Timestamp', lastCookieToTimestamp.getTime());

    if (
      currentTime.getTime() >=
        lastCookieToTimestamp.getTime() + dayToTimesTamp ||
      lastCookie.name === ''
    ) {
      console.log('cookie expirou');
      return true;
    }

    console.log('cookie nao expirou');
    return false;
  }

  closeMessage(isOpen) {
    console.log(isOpen);
    if (isOpen) {
      this.createNewCookie();
    }
  }

  genericFunction() {
    this.closeMessage(this.state.showCookie);
  }

  render() {
    return (
      <>
        {this.state.showCookie ? (
          <div className="main-container">
            <div className="message-container">
              <p>
                Nós e os nossos parceiros utilizamos tecnologias, como cookies,
                e processamos dados pessoais, como endereços IP e
                identificadores de cookies, para personalizar anúncios e
                conteúdos baseados nos seus interesses, avaliar o desempenho
                desses anúncios e conteúdos, bem como para obter informações
                sobre o público que os visualizou. Clique abaixo para consentir
                a utilização desta tecnologia e o processamento dos seus dados
                pessoais para estas finalidades. Pode mudar de ideias e alterar
                as suas opções de consentimento a qualquer momento voltando a
                este site.
              </p>
            </div>
            <div className="container-button">
              <button onClick={this.genericFunction}>Fechar</button>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default CookieContainer;
