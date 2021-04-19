import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    borderRadius: 40,
    padding: '5px 20px 20px 10px',
    height: '3rem',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  postInput: {
    width: '100%',
    fontSize: 30,
    border: 'none',
    color: 'black',
    outline: 'none',
    marginBottom: 20,
    background: 'transparent',
  },
  progressBar: {
    height: 40,
    marginLeft: '0px 20px 0px 20px',
    width: '100%',
  },
  cardUpload: {
    display: 'flex',
    flexDirection: 'column',
    width: 500,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'lightblue',
  },
  postContainer: {
    marginBottom: 50,
    paddingBottom: 5,
    border: '0.5px solid black',
    boxShadow: '5px 10px #888888',
  },
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postImg: {
    padding: 10,
    maxWidth: '100%',
    height: '500px',
  },
  postComment: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentAvatar: {
    height: '20px',
    width: '20px',
    marginRight: 8,
  },
  commentInput: {
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  postFooter: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
  },
  login: {
    marginTop: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useStyles;
