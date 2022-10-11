import {
  Button,
  Container,
  createStyles,
  Image,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function VerifyOrderPage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      >
        {/* <Image src={image} className={classes.mobileImage} /> */}
        <div>
          <Title className={classes.title}>Coming soon...</Title>
          <Text color="dimmed" size="lg">
            This feature will be available in next version!
          </Text>
          <Link to={'/'}>
            <Button variant="outline" size="md" mt="xl" className={classes.control}>
              Get back to home page
            </Button>
          </Link>
        </div>
        {/* <Image src={image.src} className={classes.desktopImage} /> */}
      </SimpleGrid>
    </Container>
  );
}
