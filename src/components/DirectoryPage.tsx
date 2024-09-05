// src/components/DirectoryPage.tsx

"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Typography, 
  Container, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  Fade,
  LinearProgress,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BrushIcon from '@mui/icons-material/Brush';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import { styled } from '@mui/system';
import DogBreedDetail from './DogBreedDetail';

interface DogBreed {
  id: string;
  'Dog Name': string;
  Temperament: string;
  Adaptability: string;
  'All-around friendliness': string;
  'Exercise needs': string;
  'Health And Grooming Needs': string;
  Trainability: string;
  FeaturedImageURL: string;
  'Officially Recognized': string;
}

interface ApiResponse {
  dogBreeds: DogBreed[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const GridContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '16px',
  padding: '16px',
});

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '75%', // 4:3 aspect ratio
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
});

const TraitBar = ({ trait, value, icon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    {icon}
    <Typography variant="body2" noWrap sx={{ width: '30%', ml: 1 }}>{trait}</Typography>
    <LinearProgress 
      variant="determinate" 
      value={Number(value) * 20} 
      sx={{ flexGrow: 1, mr: 1 }} 
    />
    <Typography variant="body2">{value}/5</Typography>
  </Box>
);

const traits = [
  { name: 'Adapt', key: 'Adaptability', icon: <PetsIcon sx={{ mr: 1 }} /> },
  { name: 'Friendly', key: 'All-around friendliness', icon: <FavoriteIcon sx={{ mr: 1 }} /> },
  { name: 'Exercise', key: 'Exercise needs', icon: <FitnessCenterIcon sx={{ mr: 1 }} /> },
  { name: 'Groom', key: 'Health And Grooming Needs', icon: <BrushIcon sx={{ mr: 1 }} /> },
  { name: 'Train', key: 'Trainability', icon: <SchoolIcon sx={{ mr: 1 }} /> },
];

export default function DirectoryPage() {
  const [dogs, setDogs] = useState<DogBreed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDog, setSelectedDog] = useState<DogBreed | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDogs = useCallback(async (pageNum: number, resetDogs: boolean = false) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pageNum.toString(),
        limit: '12',
        search: searchTerm
      });
      const response = await fetch(`/api/dogBreeds?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      if (resetDogs) {
        setDogs(data.dogBreeds.map(dog => ({ ...dog, id: dog._id })));
      } else {
        setDogs(prevDogs => [...prevDogs, ...data.dogBreeds.map(dog => ({ ...dog, id: dog._id }))]);
      }
      setTotalPages(data.totalPages);
    } catch (e) {
      console.error('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDogs(1, true);
  }, [fetchDogs]);

  const handleOpenDetail = (dog: DogBreed) => {
    setSelectedDog(dog);
  };

  const handleCloseDetail = () => {
    setSelectedDog(null);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDogs(nextPage, false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  return (
    <Box sx={{ maxWidth: 'xl', margin: 'auto', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
        Dog Breed Directory
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search breeds..."
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          onChange={handleSearch}
          value={searchTerm}
        />
      </Box>

      {loading && dogs.length === 0 ? (
        <CircularProgress />
      ) : (
        <GridContainer>
          {dogs.map((dog) => (
            <StyledCard key={dog.id} onClick={() => handleOpenDetail(dog)}>
              <StyledCardMedia
                image={dog.FeaturedImageURL}
                title={dog['Dog Name']}
              />
              <StyledCardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
                    {dog['Dog Name']}
                    {dog['Officially Recognized'] === 'Yes' && (
                      <Tooltip title="Officially Recognized">
                        <VerifiedIcon color="primary" sx={{ ml: 1, verticalAlign: 'middle' }} />
                      </Tooltip>
                    )}
                  </Typography>
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleOpenDetail(dog); }}>
                    <InfoIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {dog.Temperament}
                </Typography>
                {traits.map(trait => (
                  <TraitBar 
                    key={trait.key} 
                    trait={trait.name} 
                    value={dog[trait.key]} 
                    icon={trait.icon} 
                  />
                ))}
              </StyledCardContent>
            </StyledCard>
          ))}
        </GridContainer>
      )}

      {page < totalPages && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button variant="contained" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}

      <DogBreedDetail 
        dog={selectedDog} 
        open={!!selectedDog} 
        onClose={handleCloseDetail} 
      />
    </Box>
  );
}