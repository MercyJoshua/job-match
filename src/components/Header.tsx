import Link from "next/link";

const Header = () => {
    return (
      <header className="bg-violet-700 shadow-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">JobMatch</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-white hover:text-gray-50">Home</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-50">Jobs</Link></li>
              <li><Link href="#" className="text-white hover:text-gray-50">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  