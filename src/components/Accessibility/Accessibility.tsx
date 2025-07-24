import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/TextIncrease';
import RemoveIcon from '@mui/icons-material/TextDecrease';
import TextIcon from '@mui/icons-material/FormatSize';
import { useAnswerData } from '../../reducers/AnswerDataProvider';

const settings = {
  fontSizeLowerBound: 12,
  fontSizeUpperBound: 24,
  fontSizeDefault: 16,
}

const Accessibility: React.FC = () => {
  const { state, dispatch } = useAnswerData();
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 2);
  };

  const resetFontSize = () => {
    setFontSize(settings.fontSizeDefault);
  }

  useEffect(() => {
    setFontSize(state.fontSize || settings.fontSizeDefault);
  }, []);

  useEffect(() => {
    if (fontSize < settings.fontSizeLowerBound) {
      setFontSize(settings.fontSizeLowerBound);
      return;
    } else if (fontSize > settings.fontSizeUpperBound) {
      setFontSize(settings.fontSizeUpperBound);
      return;
    }

    dispatch({ type: 'set_font_size', payload: fontSize });
  }, [fontSize]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        backgroundColor: 'white',
        padding: 1,
        borderRadius: 1,
        boxShadow: 3,
        zIndex: 9000,
      }}
      id="accessibility-toolbar"
    >
      <Tooltip title="Increase Font Size">
        <IconButton onClick={increaseFontSize}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Decrease Font Size">
        <IconButton onClick={decreaseFontSize}>
          <RemoveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset Font Size">
        <IconButton onClick={resetFontSize}>
          <TextIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Accessibility;