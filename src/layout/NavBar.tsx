import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="p-3 text-sm tracking-widest border-solid border-b-2 border-gray-300 font-roboto font-medium">
      <NavLink to="/" className="navbutton" exact activeClassName="bg-gray-300">
        Quiz
      </NavLink>
      <NavLink to="/editor" className="ml-2 navbutton" activeClassName="bg-gray-300">
        Editor
      </NavLink>
      <NavLink to="/history" className="ml-2 navbutton" activeClassName="bg-gray-300">
        History
      </NavLink>
    </div>
  );
};

export default NavBar;
