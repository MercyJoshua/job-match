const Header = () => {
    return (
      <header className="bg-violet-700 shadow-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">JobMatch</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-white hover:text-gray-50">Home</a></li>
              <li><a href="#" className="text-white hover:text-gray-50">Jobs</a></li>
              <li><a href="#" className="text-white hover:text-gray-50">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  