// src/components/AdvancedQuestionCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { motion, AnimatePresence } from 'framer-motion';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface AdvancedQuestionCardProps {
  question: string;
  answers: string[];
  tooltip?: string;
  onAnswer: (answer: string) => void;
}

const AdvancedQuestionCard: React.FC<AdvancedQuestionCardProps> = ({
  question,
  answers,
  tooltip,
  onAnswer,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={6}
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        borderRadius: 4,
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ position: 'relative', p: 4 }}>
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            left: 20,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme.shadows[4],
          }}
        >
          <AutoAwesomeIcon sx={{ color: 'white' }} />
        </Box>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
            {question}
          </Typography>
          {tooltip && (
            <Tooltip title={tooltip}>
              <IconButton size="small" sx={{ color: 'white' }}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <RadioGroup>
          <AnimatePresence>
            {answers.map((answer, index) => (
              <motion.div
                key={answer}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FormControlLabel
                  value={answer}
                  control={
                    <Radio
                      sx={{
                        color: 'white',
                        '&.Mui-checked': {
                          color: theme.palette.secondary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: 'white' }}>
                      {answer}
                    </Typography>
                  }
                  sx={{
                    my: 1,
                    p: 1,
                    borderRadius: 2,
                    width: '100%',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  onClick={() => onAnswer(answer)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
export default AdvancedQuestionCard;