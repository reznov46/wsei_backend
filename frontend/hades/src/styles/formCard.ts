import { FONT_FAMILY, MARGIN_TOP_CONTENT } from "../utils/consts";

export const formStyles = {
  div: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: MARGIN_TOP_CONTENT,
  },
  card: {
    width: '400px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    width: '100%'
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    marginTop: '10px',
    color: 'error',
  },
  button: {
    marginLeft: 'auto'
  },
};