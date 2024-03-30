import React from "react";

function NavBar(props) {
  return (
    <div className="bg-white w-full h-16 flex items-center justify-between px-4">
      <div className="text-xl font-bold">Logo</div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-800 hover:text-black">Accueil</a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-black">À propos</a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-black">Services</a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-black">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
