const video = document.getElementById('video');
    const images = [];

    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => {
        alert("Camera access denied.");
        console.error(err);
      });

    // Capture current frame
    function capture() {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imgData = canvas.toDataURL('image/jpeg');
      images.push(imgData);

      const img = document.createElement('img');
      img.src = imgData;
      const container = document.createElement('div');
      container.className = 'image-container';
      container.appendChild(img);
      document.getElementById('images').appendChild(container);
    }

    // Download PDF from images
    async function downloadPDF() {
      const { jsPDF } = window.jspdf;
      if (images.length === 0) {
        alert("No images captured!");
        return;
      }

      const pdf = new jsPDF();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        pdf.addImage(images[i], 'JPEG', 10, 10, 190, 0); // fit width
      }

      pdf.save("scanned_document.pdf");
    }