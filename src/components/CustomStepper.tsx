// src/components/CustomStepper.tsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PetsIcon from '@mui/icons-material/Pets';

interface CustomStepperProps {
  steps: string[];
  currentStep: number;
}

const CustomStepper: React.FC<CustomStepperProps> = ({ steps, currentStep }) => {
  const getVisibleSteps = () => {
    const prevStep = currentStep > 0 ? steps[currentStep - 1] : null;
    const currentStepLabel = steps[currentStep];
    const nextStep = currentStep < steps.length - 1 ? steps[currentStep + 1] : null;
    return [prevStep, currentStepLabel, nextStep];
  };

  const visibleSteps = getVisibleSteps();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        bgcolor: 'primary.main', 
        borderRadius: 4,
        py: 2,
        px: 3,
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <AnimatePresence mode="popLayout">
          {visibleSteps.map((step, index) => (
            step && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}
              >
                {index === 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PetsIcon sx={{ color: 'white', fontSize: 40, mr: 1 }} />
                  </motion.div>
                )}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    fontWeight: index === 1 ? 'bold' : 'normal',
                    fontSize: index === 1 ? '1.2rem' : '0.9rem',
                    textAlign: 'center',
                    maxWidth: '100px',
                  }}
                >
                  {step}
                </Typography>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </Box>
      <Box 
        component={motion.div}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          zIndex: 0
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </Paper>
  );
};

export default CustomStepper;