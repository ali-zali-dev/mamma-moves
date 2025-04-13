import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import axios from 'axios';
import { config } from '../config';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: 'PREGNANCY' | 'POSTPARTUM' | 'GENERAL' | 'SPECIALIZED';
}

export const MammaMoves = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        margin: '0 auto'
      }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
          Pregnancy
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          {videos
            .filter((video) => video.category === 'PREGNANCY')
            .map((video) => (
              <Box key={video.id}>
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
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          {videos
            .filter((video) => video.category === 'POSTPARTUM')
            .map((video) => (
              <Box key={video.id}>
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
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          {videos
            .filter((video) => video.category === 'GENERAL')
            .map((video) => (
              <Box key={video.id}>
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
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          {videos
            .filter((video) => video.category === 'SPECIALIZED')
            .map((video) => (
              <Box key={video.id}>
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