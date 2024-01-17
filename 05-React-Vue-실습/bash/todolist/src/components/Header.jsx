import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.Header}>
      <h1>마부작침... 형설지공...</h1>
      <h2>{new Date().toDateString()}</h2>
      {/* <h1>To Do List</h1> */}
    </header>
  );
};

export default Header;
