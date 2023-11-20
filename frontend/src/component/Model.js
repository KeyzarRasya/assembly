import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import * as tf from '@tensorflow/tfjs'


function Model() {
    const [isPredicting, setIsPredicting] = useState(false);
    const [macet, setMacet] = useState('');
    const [notMacet, setNotMacet] = useState('');
    const webcamRef = useRef(null);
    let net;
  
    const startPredicting = () => {
      setIsPredicting(true);
      app();
    };
  
    const stopPredicting = () => {
      setIsPredicting(false);
    };
  
    const app = async () => {
      const webcamElement = webcamRef.current;
      console.log('Loading model..');
      let net = await tf.loadGraphModel('http://localhost:1001/model.json');
      console.log('Successfully loaded model');
  
      const webcam = await tf.data.webcam(webcamElement);
      while (isPredicting) {
        const img = await webcam.capture();
        const result = await net.classify(img);
  
        console.log(result);
  
        console.log(result['0']['label'] + ': ' + Math.round(result['0']['prob'] * 100) + '%');
        console.log(result['1']['label'] + ': ' + Math.round(result['1']['prob'] * 100) + '%');
        img.dispose();
  
        await tf.nextFrame();
      }
    };
  
    useEffect(() => {
      // Cleanup function when the component unmounts
      return () => {
        if (isPredicting) {
          setIsPredicting(false);
        }
      };
    }, [isPredicting]);
  
    return (
      <Container style={{
        width: '100%',
        height: '100vh',
      }}>
        <div>
          <video
            ref={webcamRef}
            style={{
              width: '640px',
              height: '480px',
            }}
            autoPlay
          ></video>
          <button onClick={startPredicting}>Start</button>
          <button onClick={stopPredicting}>Stop</button>
          <canvas id="canvas" width="640" height="480"></canvas>
          <p style={{ color: 'red', backgroundColor: 'blue' }} id="result"></p>
          <p style={{color:'white'}}>{macet}</p>
          <p style={{color:'white'}}>{notMacet}</p>
        </div>
      </Container>
    );
  }
  
  export default Model;