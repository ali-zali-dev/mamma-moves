import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, Alert } from '@mui/material';
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

export const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/video/${id}`);
        console.log('Fetched video data:', response.data);
        setVideo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch video');
        setLoading(false);
        console.error('Error fetching video:', err);
      }
    };

    fetchVideo();
  }, [id]);

  // Ensure the video URL is properly formatted
  const videoUrl = video?.videoUrl as string

  // Test if the video URL is accessible
  useEffect(() => {
    const testVideoUrl = async () => {
      try {
        const response = await fetch(videoUrl, { method: 'HEAD' });
        console.log('Video URL status:', response.status);
        if (!response.ok) {
          setVideoError(`Video file not found (Status: ${response.status})`);
        }
      } catch (err) {
        console.error('Error testing video URL:', err);
        setVideoError('Could not access video file');
      }
    };

    if (videoUrl) {
      testVideoUrl();
    }
  }, [videoUrl]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.target as HTMLVideoElement;
    if (videoElement.error) {
      const errorMessage = `Video error: ${videoElement.error.message}`;
      console.error(errorMessage);
      setVideoError(errorMessage);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !video) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh">
        <Typography color="error">{error || 'Video not found'}</Typography>
        <Button variant="contained" onClick={() => navigate('/mamma-moves')} sx={{ mt: 2 }}>
          Back to Videos
        </Button>
      </Box>
    );
  }

  console.log('Video URL:', videoUrl);
  console.log('Video data:', video);

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => navigate('/mamma-moves')} sx={{ mb: 3 }}>
        Back to Videos
      </Button>
      
      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        {videoError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {videoError}
          </Alert>
        )}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%', // 16:9 aspect ratio
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#000',
          }}
        >
          <video
            ref={videoRef}
            controls
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            poster={video.thumbnailUrl}
            onError={handleVideoError}
            onCanPlay={() => console.log('Video can play')}
            onLoadStart={() => console.log('Video load started')}
            onLoadedMetadata={() => console.log('Video metadata loaded')}
            onStalled={() => console.log('Video stalled')}
            onWaiting={() => console.log('Video waiting')}
            onProgress={(e) => {
              const video = e.target as HTMLVideoElement;
              console.log('Video progress:', video.buffered.length > 0 ? video.buffered.end(0) : 0);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography variant="body1" paragraph>
        {video.description}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Category: {video.category}
      </Typography>
    </Box>
  );
}; 