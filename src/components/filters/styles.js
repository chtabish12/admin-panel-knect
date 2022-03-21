import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    width: "160px",
    display: "flex",
    flexDirection: "row",

  },
  text: {
    marginBottom: theme.spacing(2),
  },
}));
