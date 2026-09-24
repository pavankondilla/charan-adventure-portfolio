/* Measured once from the PNG alpha. Static bounds also work under file://. */
window.characterFrames = function(image, columns, rows) {
 const atlases={
  "3x2": {
    "width": 1536,
    "height": 1024,
    "frames": [
      {
        "x": 146,
        "y": 12,
        "w": 298,
        "h": 500
      },
      {
        "x": 636,
        "y": 13,
        "w": 287,
        "h": 499
      },
      {
        "x": 1123,
        "y": 11,
        "w": 312,
        "h": 501
      },
      {
        "x": 194,
        "y": 512,
        "w": 211,
        "h": 490
      },
      {
        "x": 696,
        "y": 512,
        "w": 210,
        "h": 490
      },
      {
        "x": 1200,
        "y": 512,
        "w": 205,
        "h": 493
      }
    ]
  },
  "5x2": {
    "width": 1619,
    "height": 971,
    "frames": [
      {
        "x": 42,
        "y": 15,
        "w": 231,
        "h": 464
      },
      {
        "x": 345,
        "y": 5,
        "w": 261,
        "h": 478
      },
      {
        "x": 663,
        "y": 16,
        "w": 246,
        "h": 466
      },
      {
        "x": 978,
        "y": 4,
        "w": 256,
        "h": 478
      },
      {
        "x": 1313,
        "y": 5,
        "w": 272,
        "h": 477
      },
      {
        "x": 40,
        "y": 487,
        "w": 238,
        "h": 471
      },
      {
        "x": 345,
        "y": 487,
        "w": 258,
        "h": 474
      },
      {
        "x": 664,
        "y": 503,
        "w": 248,
        "h": 456
      },
      {
        "x": 980,
        "y": 486,
        "w": 257,
        "h": 475
      },
      {
        "x": 1318,
        "y": 491,
        "w": 244,
        "h": 470
      }
    ]
  }
};
 const atlas=atlases[columns+'x'+rows];
 if(!atlas)throw new Error('Unknown character atlas');
 const scaleX=image.naturalWidth/atlas.width,scaleY=image.naturalHeight/atlas.height;
 return atlas.frames.map(frame=>({x:frame.x*scaleX,y:frame.y*scaleY,w:frame.w*scaleX,h:frame.h*scaleY}));
};
