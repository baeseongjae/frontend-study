import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.Header}>
      <h3>Today is</h3>
      <h2>{new Date().toDateString()}</h2>
      <h1>To Do List</h1>
    </header>
  );
};

export default Header;
