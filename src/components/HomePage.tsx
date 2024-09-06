// src/components/HomePage.tsx

'use client';

import React from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search as SearchIcon, 
  Pets as PetsIcon, 
  Quiz as QuizIcon, 
  Favorite as FavoriteIcon, 
  EmojiNature as EmojiNatureIcon
} from '@mui/icons-material';

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
          {icon}
        </Box>
        <Typography variant="h5" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.primary.main, 
          color: 'white', 
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                  Find Your Perfect Canine Companion
                </Typography>
                <Typography variant="h5" paragraph>
                  Discover the ideal dog breed that matches your lifestyle and preferences.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/quiz"
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'white', 
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.grey[100],
                    }
                  }}
                >
                  Start Quiz
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box 
                  component="img" 
                  src="https://dog-breed-selector-images.s3.ap-northeast-1.amazonaws.com/happy-dog-compressed.png" 
                  alt="Happy dog with owner" 
                  sx={{ 
                    width: '100%', 
                    borderRadius: 2,
                    boxShadow: 0
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Why Choose Our Dog Breed Finder?
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" paragraph>
          Discover the perfect furry friend with our comprehensive and user-friendly tool.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard 
              icon={<QuizIcon fontSize="large" />}
              title="Personalized Quiz"
              description="Answer a few questions about your lifestyle and preferences to find your ideal dog breed match."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard 
              icon={<SearchIcon fontSize="large" />}
              title="Extensive Database"
              description="Access information on over 500 dog breeds to make an informed decision."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard 
              icon={<FavoriteIcon fontSize="large" />}
              title="Expert Recommendations"
              description="Receive tailored suggestions based on vetted data and expert knowledge."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard 
              icon={<EmojiNatureIcon fontSize="large" />}
              title="Breed Compatibility"
              description="Find a dog that not only matches your preferences but also thrives in your environment."
            />
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: theme.palette.grey[100], py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Ready to Meet Your New Best Friend?
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" paragraph>
            Take our quick quiz and discover the perfect dog breed for your lifestyle.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/quiz"
              startIcon={<PetsIcon />}
            >
              Start Your Journey
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              About Our Dog Breed Finder
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to help potential dog owners find their perfect canine companion. We understand that choosing a dog is a significant decision that impacts both your life and the life of your new pet.
            </Typography>
            <Typography variant="body1" paragraph>
              Our comprehensive database and intelligent matching algorithm consider factors such as size, energy level, grooming needs, and temperament to ensure a perfect fit for your lifestyle and preferences.
            </Typography>
            <Typography variant="body1">
              Whether you&apos;re a first-time dog owner or looking to add another furry friend to your family, we&apos;re here to guide you every step of the way.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src="https://dog-breed-selector-images.s3.ap-northeast-1.amazonaws.com/various+dog+breeds+compressed.png" 
              alt="Various dog breeds" 
              sx={{ 
                width: '100%', 
                borderRadius: 2,
                boxShadow: 0
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}