// src/components/DirectoryPage.tsx

'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
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
  Pagination,
  Skeleton,
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
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { DogBreed, PaginatedDogBreeds } from '@/types';  // Import both types

const DogBreedDetail = dynamic(() => import('./DogBreedDetail'), {
  loading: () => <CircularProgress />,
});

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
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
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

interface TraitBarProps {
  trait: string;
  value: string | undefined;
  icon: React.ReactNode;
}

const TraitBar: React.FC<TraitBarProps> = ({ trait, value, icon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    {icon}
    <Typography variant="body2" noWrap sx={{ width: '30%', ml: 1 }}>{trait}</Typography>
    <LinearProgress
      variant="determinate"
      value={Number(value) * 20}
      sx={{ flexGrow: 1, mr: 1 }}
    />
    <Typography variant="body2">{value ? `${value}/5` : 'N/A'}</Typography>
  </Box>
);

const traits = [
  { name: 'Adaptability', key: 'Adaptability', icon: <PetsIcon sx={{ mr: 1 }} /> },
  { name: 'Friendliness', key: 'All-around friendliness', icon: <FavoriteIcon sx={{ mr: 1 }} /> },
  { name: 'Exercise Needs', key: 'Exercise Needs', icon: <FitnessCenterIcon sx={{ mr: 1 }} /> },
  { name: 'Grooming Needs', key: 'Health And Grooming Needs', icon: <BrushIcon sx={{ mr: 1 }} /> },
  { name: 'Trainability', key: 'Trainability', icon: <SchoolIcon sx={{ mr: 1 }} /> },
];

const LoadingSkeleton = () => (
  <Card>
    <Skeleton variant="rectangular" height={200} />
    <CardContent>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      {[1, 2, 3, 4, 5].map((item) => (
        <Skeleton key={item} variant="text" width="100%" />
      ))}
    </CardContent>
  </Card>
);

export default function DirectoryPage({ initialDogBreeds }: { initialDogBreeds: PaginatedDogBreeds }) {
  const [dogs, setDogs] = useState<DogBreed[]>(initialDogBreeds.dogBreeds);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDog, setSelectedDog] = useState<DogBreed | null>(null);
  const [page, setPage] = useState(initialDogBreeds.page);
  const [totalPages, setTotalPages] = useState(initialDogBreeds.totalPages);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fetchDogs = useCallback(async (pageNum: number, search: string) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.set('page', pageNum.toString());
      queryParams.set('limit', '12');
      if (search) queryParams.set('search', search);

      const response = await fetch(`/api/dogBreeds?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PaginatedDogBreeds = await response.json();
      setDogs(data.dogBreeds);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (e) {
      console.error('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentPage = Number(searchParams.get('page')) || 1;
    const currentSearch = searchParams.get('search') || '';
    if (currentPage !== page || currentSearch !== searchTerm) {
      fetchDogs(currentPage, currentSearch);
    }
  }, [fetchDogs, searchParams, page, searchTerm]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('page', value.toString());
    router.push(`${pathname}?${queryParams.toString()}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('page', '1');
    if (newSearchTerm) queryParams.set('search', newSearchTerm);
    else queryParams.delete('search');
    router.push(`${pathname}?${queryParams.toString()}`);
  };

  const handleOpenDetail = (dog: DogBreed) => {
    setSelectedDog(dog);
  };

  const handleCloseDetail = () => {
    setSelectedDog(null);
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

      <GridContainer>
        {dogs.map((dog) => (
          <Fade key={dog._id} in={true} timeout={500}>
            <StyledCard onClick={() => handleOpenDetail(dog)}>
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
    value={dog[trait.key as keyof DogBreed] ?? 'N/A'} // Correct dynamic indexing with keyof
    icon={trait.icon} 
  />
))}
              </StyledCardContent>
            </StyledCard>
          </Fade>
        ))}
        {loading && Array.from(new Array(4)).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </GridContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination  
          count={totalPages} 
          page={page} 
          onChange={handlePageChange}
          color="primary"
          size="large"
          disabled={loading}
        />
      </Box>

      <Suspense fallback={<CircularProgress />}>
        {selectedDog && (
          <DogBreedDetail 
            dog={selectedDog} 
            open={!!selectedDog} 
            onClose={handleCloseDetail} 
          />
        )}
      </Suspense>
    </Box>
  );
}
