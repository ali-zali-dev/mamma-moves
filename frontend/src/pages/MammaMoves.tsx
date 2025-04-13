import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
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
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Pregnancy
        </Typography>
        <Grid container spacing={3}>
          {videos
            .filter((video) => video.category === 'PREGNANCY')
            .map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card>
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
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Postpartum Section */}
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Postpartum
        </Typography>
        <Grid container spacing={3}>
          {videos
            .filter((video) => video.category === 'POSTPARTUM')
            .map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card>
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
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* General Section */}
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          General
        </Typography>
        <Grid container spacing={3}>
          {videos
            .filter((video) => video.category === 'GENERAL')
            .map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card>
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
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Specialized Section */}
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Specialized
        </Typography>
        <Grid container spacing={3}>
          {videos
            .filter((video) => video.category === 'SPECIALIZED')
            .map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card>
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
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}; 