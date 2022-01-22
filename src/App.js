import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Col, Container, Nav, Row } from 'react-bootstrap';

import Login from './components/login/login';
import Logout from './components/logout/logout';
import Footer from './components/footer/footer';

import './App.scss';

function App() {
  let navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      setIsLogged(true);
    }
  }, [isLogged]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  const handleLink = endpoint => {
    navigate(endpoint, { replace: false }, [navigate]);
  }

  if (isLogged) {
    return (
      <div className="app__container">
        <Logout setIsLogged={setIsLogged} />
        <Container fluid className="app__container-body">
          <Row className="app__container-title">
            <Col>
              <h1>Pomoc dla bezdomnego</h1>
              <h2>Wersja: 1.0</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Nav
                activeKey="/"
                onSelect={(selectedKey) => navigate(selectedKey, { replace: true }, [navigate])}
              >
                <Nav.Item>
                  <Nav.Link href='/'>Strona główna</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/informations'>Informacje</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/eateries'>Jadłodajnie</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/helpcenters'>Ośrodki pomocy</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/shelters'>Schroniska</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/users'>Użytkownicy</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" md="8">
              <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="informations.png"
                    alt="Background"
                    onClick={() => handleLink('/informations/form')}
                  />
                  <Carousel.Caption>
                    <h3>Informacje</h3>
                    <p>Tutaj możesz dodać nowe informacje</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="eateries.png"
                    alt="Background"
                    onClick={() => handleLink('/eateries/form')}
                  />
                  <Carousel.Caption>
                    <h3>Jadłodajnie</h3>
                    <p>Tutaj możesz dodać jadłodajnie</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="helpcenters.png"
                    alt="Background"
                    onClick={() => handleLink('/helpcenters/form')}
                  />
                  <Carousel.Caption>
                    <h3>Ośrodki pomocy</h3>
                    <p>Tutaj możesz dodać nowe centra pomocy</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="shelters.png"
                    alt="Background"
                    onClick={() => handleLink('/shelters/form')}
                  />
                  <Carousel.Caption>
                    <h3>Schroniska</h3>
                    <p>Tutaj możesz dodać nowe schroniska</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="users.png"
                    alt="Background"
                    onClick={() => handleLink('/users/form')}
                  />
                  <Carousel.Caption>
                    <h3>Użytkownicy</h3>
                    <p>Tutaj możesz dodać nowych użytkowników</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    )
  } else {
    return (
      <div className="app__container">
        <Container fluid className="app__container-body">
          <Row className="app__container-title">
            <Col>
              <h1>Pomoc dla bezdomnego</h1>
              <h2>Wersja: beta 1.0</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="8" md="4">
              <Login setIsLogged={setIsLogged} />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default App;
