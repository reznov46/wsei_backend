import { DEFAULT_PADDING_RIGHT, FONT_FAMILY } from '../utils/consts';

export const usersListStyles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: DEFAULT_PADDING_RIGHT,
  },
  subHeader: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: DEFAULT_PADDING_RIGHT,
  },
  id: {
    marginLeft: 'auto',
  },
  button: {
    marginRight: '10px',
  },
  card: {
    padding: '8px',
    maxWidth: '100%',
    cursor: 'pointer',
  },
  userItem: {
    marginTop: '1rem',
  },
  avatar: {
    display: 'inline-block',
  },
  description: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '10px',
    fontFamily: FONT_FAMILY,
  },
  name: {
    fontSize: 20,
  },
};
