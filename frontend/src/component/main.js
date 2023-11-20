import { Container, Button} from "react-bootstrap";
// import Button from "./Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'


function Main() {

    function buttonLink(link){
        window.location.href = link
    }

    return (
        <Container
            style={{
                backgroundColor: '#1D1D1D',
                width:'100%',
                height: '200vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Container style={{
                height:'100vh',
                display:'flex',
                alignItems:'center'
            }}>
                <div style={{
                    marginLeft: '30px',
                    marginTop: '-40px'
                }}>
                    <p style={{
                        fontSize: '70px'
                    }}>Assembly</p>
                    <p style={{
                        fontSize: '30px'
                    }}>Faster to destination by centralize your traffic condition</p>
                    <div style={{
                        padding: '10px'
                    }}>
                        {/* <Button text={'Register Now'} mr="70px" />
                        <Button text={'Login'} mr="70px" />
                        <Button text={'How it works'}/> */}
                        <Button style={{marginRight:"70px"}} href="http://127.0.0.1:5500/model/web/data.html" variant="outline-warning">Monitoring</Button>
                        <Button style={{marginRight:"70px"}} href="http://127.0.0.1:5500/model/web/index.html" variant="warning">Quickstart</Button>
                        <Button variant="outline-warning" href="#work">How it works</Button>
                    </div>

                </div>
            </Container>
            <Container style={{
                width:'100%',
                height:'100vh'
            }} id="work">
                <h1 style={{textAlign:'center'}}>HOW IT WORKS?</h1>
                <hr style={{color:'white', height:'5px'}}/>
                <p style={{textAlign:'center', marginTop:'150px', fontSize:'20px'}}>Assembly mengumpulkan semua data dari seluruh user terkait traffic diseluruh dunia, dan mengklasifikasikannya menggunakan Model AI Image Classification, kemudian data dikumpulkan menggunakan Database sehingga dan ditampilkan sehingga bisa dilihat oleh siapapun, dimanapun, dan kapanpun</p>
            </Container>


        </Container>
    )
}

export default Main;