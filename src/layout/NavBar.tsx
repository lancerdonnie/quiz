import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const NavBar = (props: Props) => {
  return (
    <div className="p-2">
      <Link to="/">Quiz</Link>
      <Link to="/editor" className="ml-2">
        Editor
      </Link>
    </div>
  );
};

export default NavBar;
