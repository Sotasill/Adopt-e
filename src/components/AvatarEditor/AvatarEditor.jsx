import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { Box, Button, Slider, Typography, CircularProgress } from '@mui/material';

const AvatarEditorComponent = ({ image, onSave, onCancel }) => {
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  const handleSave = async () => {
    if (editorRef.current) {
      setLoading(true);
      try {
        const canvas = editorRef.current.getImageScaledToCanvas();
        canvas.toBlob(async (blob) => {
          await onSave(blob);
          setLoading(false);
        }, 'image/jpeg', 0.95);
      } catch (error) {
        setLoading(false);
        console.error('Ошибка при сохранении:', error);
      }
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 2 
    }}>
      <AvatarEditor
        ref={editorRef}
        image={image}
        width={250}
        height={250}
        border={50}
        borderRadius={125}
        color={[255, 255, 255, 0.6]}
        scale={scale}
        rotate={0}
      />
      
      <Box sx={{ width: '80%', maxWidth: 300 }}>
        <Typography gutterBottom>Масштаб</Typography>
        <Slider
          value={scale}
          min={1}
          max={2}
          step={0.01}
          onChange={(_, newValue) => setScale(newValue)}
          disabled={loading}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Сохранить'}
        </Button>
        <Button 
          variant="outlined" 
          onClick={onCancel}
          disabled={loading}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
};

AvatarEditorComponent.propTypes = {
  image: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AvatarEditorComponent;
