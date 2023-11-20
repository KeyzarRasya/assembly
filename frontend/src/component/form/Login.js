import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {
    return (
        <Container style={{width:'100vh', display:'flex',flexDirection:'column', justifyContent:'center',alignContent:'center', alignItems:'center'}}>
            <div style={{
                width:'70%',
                height:'75%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                marginTop:'100px'
            }}>
                <Form.Label htmlFor="inputusername5">username</Form.Label>
                <Form.Control
                    type="username"
                    id="inputusername5"
                    placeholder="username"
                    aria-describedby="usernameHelpBlock"
                />

                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword5"
                    placeholder="password"
                    aria-describedby="passwordHelpBlock"
                />
            

            <Button variant="outline-warning" style={{marginTop:'30px'}}>Login</Button>
            </div>
        </Container>
    )
}

export default Login