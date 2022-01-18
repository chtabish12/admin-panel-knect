import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

  },
  text: {
    marginBottom: theme.spacing(2),
  },
}));
