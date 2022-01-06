import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    width: "160px",
    display: "flex",
    flexDirection: "row",

  },
  text: {
    marginBottom: theme.spacing(2),
  },
}));
