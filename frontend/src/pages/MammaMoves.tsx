import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress, Chip } from '@mui/material';
import axios from 'axios';
import { config } from '../config';
import { useAuth } from '../contexts/AuthContext';
import { createAuthInterceptor } from '../services/authService';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: 'PREGNANCY' | 'POSTPARTUM' | 'GENERAL' | 'SPECIALIZED';
  accessLevel: 'FREE' | 'PREMIUM';

}

export const MammaMoves = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      createAuthInterceptor(token);
    }
  }, [token]);

  const handleVideoClick = (video: Video) => {
    if (video.accessLevel !== 'FREE') {
      navigate('/pricing');
    } else {
      navigate(`/video/${video.id}`);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/video`);
        setVideos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch videos');
        setLoading(false);
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Mamma Moves Videos
      </Typography>
      
      {/* Pregnancy Section */}
      <Box mb={4} sx={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: 2, 
        p: 3, 
        backgroundColor: '#fafafa',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
          Pregnancy
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          overflowX: 'auto',
          gap: 3,
          pb: 2,
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          }
        }}>
          {videos
            .filter((video) => video.category === 'PREGNANCY')
            .map((video) => (
              <Box key={video.id} sx={{ minWidth: '300px' }}>
                <Card 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleVideoClick(video)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={video.thumbnailUrl}
                      alt={video.title}
                      sx={{
                        filter: video.accessLevel === 'PREMIUM' ? 'blur(4px)' : 'none',
                        transition: 'filter 0.3s ease-in-out',
                        '&:hover': {
                          filter: video.accessLevel === 'PREMIUM' ? 'blur(2px)' : 'none'
                        }
                      }}
                    />
                    {video.accessLevel === 'PREMIUM' && (
                      <Chip
                        label="PREMIUM"
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(25, 118, 210, 0.9)',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    )}
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
        </Box>
      </Box>

{/* Postpartum Section */}
<Box mb={4} sx={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: 2, 
        p: 3, 
        backgroundColor: '#fafafa',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
          Postpartum
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          overflowX: 'auto',
          gap: 3,
          pb: 2,
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          }
        }}>
          {videos
            .filter((video) => video.category === 'POSTPARTUM')
            .map((video) => (
              <Box key={video.id} sx={{ minWidth: '300px' }}>
                <Card 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/video/${video.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnailUrl}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
        </Box>
      </Box>

      {/* General Section */}
      <Box mb={4} sx={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: 2, 
        p: 3, 
        backgroundColor: '#fafafa',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
          General
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          overflowX: 'auto',
          gap: 3,
          pb: 2,
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          }
        }}>
          {videos
            .filter((video) => video.category === 'GENERAL')
            .map((video) => (
              <Box key={video.id} sx={{ minWidth: '300px' }}>
                <Card 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/video/${video.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnailUrl}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
        </Box>
      </Box>

      {/* Specialized Section */}
      <Box mb={4} sx={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: 2, 
        p: 3, 
        backgroundColor: '#fafafa',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
          Specialized
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          overflowX: 'auto',
          gap: 3,
          pb: 2,
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          }
        }}>
          {videos
            .filter((video) => video.category === 'SPECIALIZED')
            .map((video) => (
              <Box key={video.id} sx={{ minWidth: '300px' }}>
                <Card 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/video/${video.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnailUrl}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}; 