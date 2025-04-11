import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fabric } from 'fabric';

function EditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);
  const imageUrl = location.state?.imageUrl;

  useEffect(() => {
    if (!imageUrl) {
      console.warn("No image URL found, redirecting...");
      navigate('/');
      return;
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      preserveObjectStacking: true,
    });
    canvasInstance.current = canvas;
    canvas._isDisposed = false;

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        if (!img || canvas._isDisposed) {
          console.error("Failed to load image or canvas was disposed.");
          return;
        }

        img.set({ crossOrigin: 'anonymous' });
        img.scaleToWidth(800);
        img.scaleToHeight(600);

        canvas.setBackgroundImage(img, () => {
          canvas.renderAll();
        }, {
          originX: 'left',
          originY: 'top',
        });
      },
      { crossOrigin: 'anonymous' }
    );

    return () => {
      canvas._isDisposed = true;
      canvas.dispose();
    };
  }, [imageUrl, navigate]);

  const addText = () => {
    const canvas = canvasInstance.current;
    const text = new fabric.Textbox('Enter your caption', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: 'white',
      backgroundColor: 'black',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addShape = (type) => {
    const canvas = canvasInstance.current;
    let shape;

    switch (type) {
      case 'circle':
        shape = new fabric.Circle({ radius: 50, fill: 'red', left: 150, top: 150 });
        break;
      case 'rectangle':
        shape = new fabric.Rect({ width: 100, height: 60, fill: 'green', left: 200, top: 200 });
        break;
      case 'triangle':
        shape = new fabric.Triangle({ width: 100, height: 100, fill: 'blue', left: 250, top: 250 });
        break;
      case 'polygon':
        shape = new fabric.Polygon(
          [
            { x: 200, y: 0 },
            { x: 250, y: 100 },
            { x: 150, y: 100 },
          ],
          { fill: 'orange', left: 300, top: 300 }
        );
        break;
      default:
        return;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
  };

  const downloadImage = () => {
    const canvas = canvasInstance.current;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1.0,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited-image.png';
    link.click();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Edit Image</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('triangle')}>Add Triangle</button>
        <button onClick={() => addShape('polygon')}>Add Polygon</button>
        <button
          onClick={downloadImage}
          style={{ marginLeft: '1rem', background: 'green', color: 'white' }}
        >
          Download Image
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid #ccc' }}
      />
    </div>
  );
}

export default EditorPage;
