import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

const NavBar = ({user}) => {
    const [expanded, setExpanded] = useState(false);

    const doItemClick = () => {
        setTimeout(
            () => {setExpanded(false)},
            150
        );
    }

    return (
        <Navbar expanded={expanded} bg="light" expand="sm">
            <Container>
                <Link to='/' className='navbar-brand'>A2Z</Link>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : 'expanded')}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user && (user.role === 'admin') && (
                            <Nav.Link as={NavLink} to='/admin' onClick={doItemClick}>Admin</Nav.Link>
                        )}
                        <Nav.Link as={NavLink} to='/posts' onClick={doItemClick}>Home</Nav.Link>
                        {!user && (
                            <React.Fragment>
                                <Nav.Link as={NavLink} to='/login' onClick={doItemClick}>Login</Nav.Link>
                            </React.Fragment>
                        )}
                        {user && (
                            <React.Fragment>
                                <Nav.Link as={NavLink} to='/chat' onClick={doItemClick}>Chat</Nav.Link>
                                <Nav.Link to='/me' as={NavLink} onClick={doItemClick}>{user.name}</Nav.Link>
                                <Nav.Link to='/logout' as={NavLink} onClick={doItemClick}>Logout</Nav.Link>
                            </React.Fragment>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;