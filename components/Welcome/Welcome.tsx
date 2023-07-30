import { Title, Text } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title weight={100} className={classes.title} align="left" mt={10}>
        <Text inherit variant="gradient" component="span">
          feesh
        </Text>
      </Title>
    </>
  );
}
