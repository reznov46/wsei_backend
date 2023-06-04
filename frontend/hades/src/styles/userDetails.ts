import { FONT_FAMILY, MARGIN_TOP_CONTENT } from "../utils/consts";

export const userDetailsStyles = {
  div: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: MARGIN_TOP_CONTENT,
  },
  avatar: {
    height: '80px',
    width: '80px',
    marginBottom: '1rem',
  },
  username: {
    fontFamily: FONT_FAMILY,
  },
  card: {
    width: '400px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailsDiv: {
    width: '100%',
    marginTop: '15px'
  },
  level: {
    display: 'flex',
  },
  button: {
    marginLeft: 'auto'
  }
};