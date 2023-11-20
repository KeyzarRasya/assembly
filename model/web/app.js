let isPredicting = false;
function startPredicting() {
  isPredicting = true;
  app();
}

function stopPredicting() {
  isPredicting = false;
  app();
}

async function app() {
  const webcamElement = document.getElementById('video');
  const address = document.getElementById('address')
  console.log('Loading model..');
  net = await tf.automl.loadImageClassification('http://localhost:1001/model.json');
  console.log('Successfully loaded model');
  let img;

  const webcam = await tf.data.webcam(webcamElement);
  while (isPredicting) {
    img = await webcam.capture();
    const result = await net.classify(img);

    console.log(result);

    let notMacet = document.getElementById("not_macet");
    let traffic = result['1']['label'] + ": " + Math.round(result['1']['prob'] * 100)
    let trafficPercentage = (traffic.replace(/\D/g, ''))
    if (parseInt(trafficPercentage) > 70) {
      notMacet.innerHTML = `TRAFFIC LEVEL IS ${trafficPercentage}% WE RECOMMEND TO REPORT`;


    } else {
      notMacet.innerHTML = `TRAFFIC LEVEL IS ${trafficPercentage}% SEEMS NORMAL`;
    }

    if (!isPredicting) {
      const canvas = document.createElement('canvas');
      canvas.width = img.shape[1];
      canvas.height = img.shape[0];
      const ctx = canvas.getContext('2d');
    
      const imageData = await tf.browser.toPixels(img, canvas);
      const imageDataArray = new Uint8ClampedArray(imageData);
    
      
      const imageDataObj = new ImageData(imageDataArray, img.shape[1], img.shape[0]);
    
      ctx.putImageData(imageDataObj, 0, 0);
    
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, 'captured_image.jpg');
        formData.append("address", address.value)
    
        try {
          // Send FormData to the server
          const response = await fetch('http://localhost:1000/upload', {
            method: 'POST',
            body: formData
          });
    
          if (response.ok) {
            console.log('Image sent successfully');
          } else {
            console.error('Failed to send image to the server');
          }
        } catch (err) {
          console.error('Error sending image to the server', err);
        }
      }, 'image/jpeg');
    }
    
    

    img.dispose();
    await tf.nextFrame();
  }
}



startPredicting();

