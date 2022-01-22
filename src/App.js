import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Carousel, Col, Container, Nav, Row } from 'react-bootstrap';

import './App.scss';

function App() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  const handleLink = endpoint => {
    navigate(endpoint, { replace: true }, [navigate]);
  }

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col lg="6">
            <h1>Pomoc dla bezdomnego</h1>
            <h2>Wersja: beta 0.2</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg="6">
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
        <Row className="justify-content-md-center">
          <Col lg="8">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="pic.png"
                  alt="Background"
                  onClick={() => handleLink('/informations')}
                />
                <Carousel.Caption>
                  <h3>Informacje</h3>
                  <p>Tutaj możesz zarządzać wszystkimi informacjami</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="pic.png"
                  alt="Background"
                  onClick={() => handleLink('/eateries')}
                />
                <Carousel.Caption>
                  <h3>Jadłodajnie</h3>
                  <p>Tutaj możesz zarządzać wszystkimi jadłodajniami</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="pic.png"
                  alt="Background"
                  onClick={() => handleLink('/helpcenters')}
                />
                <Carousel.Caption>
                  <h3>Ośrodki pomocy</h3>
                  <p>Tutaj możesz zarządzać wszystkimi ośrodkami pomocy</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="pic.png"
                  alt="Background"
                  onClick={() => handleLink('/shelters')}
                />
                <Carousel.Caption>
                  <h3>Schroniska</h3>
                  <p>Tutaj możesz zarządzać wszystkimi schroniskami</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="pic.png"
                  alt="Background"
                  onClick={() => handleLink('/users')}
                />
                <Carousel.Caption>
                  <h3>Użytkownicy</h3>
                  <p>Tutaj możesz zarządzać wszystkimi użytkownikami</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
