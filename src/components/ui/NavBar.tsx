import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/userSlice";

const NavBar = () => {
    const currentUser = useAppSelector(
        (state) => state.currentUser.currentUser
    );
    const dispatch = useAppDispatch();

    return (
        <div>
            <Navbar className="bg-body-tertiary" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand href="">ToDo</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/todos">
                                ToDos
                            </Nav.Link>
                            {currentUser.username && (
                                <Nav.Link
                                    as={Link}
                                    to="/"
                                    onClick={() => dispatch(logoutUser())}
                                >
                                    Logout
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
