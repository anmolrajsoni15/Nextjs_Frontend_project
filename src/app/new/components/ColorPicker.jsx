'use client'

import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import reactCSS from 'reactcss';
import { updateBlocColor } from 'src/app/Redux/features/blocSlice';

const ColorPicker = () => {
    const { blocData } = useSelector((store) => store.newBlocState);
    const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState({
    r: '40',
    g: '161',
    b: '255',
    a: '2',
  });
  const [presetColors, setPresetColors] = useState([
    '#2E90FA',
    '#7F56D9',
    '#5D6B98',
    '#06AED4',
    '#15B79E',
    '#F63D68',
    '#FF00FF',
    '#dd49ff',
    '#808080',
    '#800000',
    '#808000',
    '#008000',
    '#800080',
    '#008080',
    '#000080',
    ]);
  const [hex, setHex] = useState('#28A1FF');
  const [secondaryHex, setSecondaryHex] = useState('28a1ff1a');

  useEffect(() => {
    if (blocData) {
        setHex(blocData.primaryColor);
        setSecondaryHex(blocData.secondaryColor);
    }
    }, [blocData, setHex, setSecondaryHex]);

  const onClick = () => {
    setShowPicker(!showPicker);
  };

  const onClose = () => {
    setShowPicker(false);
  };

  function rgbaToHex(rgbaColor) {
    // Check if the input string is a valid RGBA color code
    const rgbaRegex = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/;
    const match = rgbaColor.match(rgbaRegex);
  
    if (!match) {
      throw new Error('Invalid RGBA color code. Please provide a valid string in the format "rgba(r, g, b, a)".');
    }
  
    // Extract RGBA values from the match
    const red = parseInt(match[1]);
    const green = parseInt(match[2]);
    const blue = parseInt(match[3]);
    const alpha = parseFloat(match[4]);
  
    // Convert RGB values to hex
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');
  
    // Convert alpha to hex
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  
    // Combine RGB and alpha hex values
    const hexColor = `#${redHex}${greenHex}${blueHex}${alphaHex}`;
  
    return hexColor;
  }

  const onChange = (color) => {
    setColor(color.rgb);
    setHex(color.hex);
    const hexColor = rgbaToHex(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.1)`);
    setSecondaryHex(hexColor);
    const colors = {
        primaryColor: color.hex,
        secondaryColor: hexColor,
    }

    dispatch(updateBlocColor(colors));
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '54px',
        height: '35px',
        borderRadius: '5px',
        background: `${hex}`,
      },
      popover: {
        position: 'absolute',
        top: '-600%',
        zIndex: '3',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      swatch: {
        padding: '8px',
        color: '#fff',
        background: '#292929',
        borderRadius: '10px',
        cursor: 'pointer',        
        boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
      },
    },
  });

  return (
    <div className='text-black relative w-full'>
      <div style={styles.swatch} onClick={onClick} className='flex items-center justify-start gap-4 border border-solid border-[#ffffff3b] w-[40%]'>
        <div style={styles.color} ></div>
        <div className="">{hex}</div>
      </div>
      {showPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={onClose} />
          <SketchPicker color={hex} presetColors={presetColors} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
