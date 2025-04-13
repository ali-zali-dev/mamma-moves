import { Box, Typography, Card, CardContent, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface PricingOption {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  recommended?: boolean;
}

const pricingOptions: PricingOption[] = [
  {
    title: 'Monthly Plan',
    price: '€14.99',
    period: 'month',
    features: [
      'Access to all premium videos',
      'New content weekly',
      'Personalized workout plans',
      'Cancel anytime'
    ],
    buttonText: 'Start Monthly Plan',
  },
  {
    title: 'Annual Plan',
    price: '€149.99',
    period: 'year',
    features: [
      'All Monthly Plan features',
      'Save 17% compared to monthly',
      'Exclusive seasonal content',
      'Priority support'
    ],
    buttonText: 'Start Annual Plan',
    recommended: true,
  }
];

export const PricingPage = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: string) => {
    // TODO: Implement subscription logic
    console.log(`Subscribing to ${plan}`);
  };

  return (
    <Container maxWidth="lg">
      <Box py={8} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Premium Membership
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Get unlimited access to all Mamma Moves content
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="stretch"
          gap={4}
          mt={8}
          sx={{
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          {pricingOptions.map((option) => (
            <Card
              key={option.title}
              sx={{
                maxWidth: 400,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: option.recommended ? '2px solid #2196f3' : '1px solid #e0e0e0',
                transform: option.recommended ? 'scale(1.05)' : 'none',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: option.recommended ? 'scale(1.07)' : 'scale(1.02)',
                  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
                }
              }}
            >
              {option.recommended && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: '#2196f3',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                  }}
                >
                  Best Value
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {option.title}
                </Typography>
                <Box my={2}>
                  <Typography variant="h3" component="p" gutterBottom>
                    {option.price}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    per {option.period}
                  </Typography>
                </Box>
                <Box my={4}>
                  {option.features.map((feature) => (
                    <Typography
                      key={feature}
                      paragraph
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                      }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={() => handleSubscribe(option.title)}
                  sx={{
                    mt: 'auto',
                    py: 1.5,
                    backgroundColor: option.recommended ? '#2196f3' : undefined,
                  }}
                >
                  {option.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box mt={6}>
          <Typography variant="body2" color="textSecondary">
            All plans include a 14-day money-back guarantee
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};