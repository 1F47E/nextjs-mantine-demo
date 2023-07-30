import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 55,
    fontWeight: 900,
    letterSpacing: -2,
    padding: 10,
    marginLeft: 24,

    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },
}));
