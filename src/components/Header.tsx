import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
    const navigate = useNavigate();
    const handleHome = () => navigate('/');


    return (
        <header className="p-5 text-text-color flex items-start w-full bg-white">
            <div className='flex  items-center space-x-2'>
                <div className=''>
                   <img src={logo} className='size-10' alt="test" />
                </div>
                <div>
                    <h1 onClick={handleHome} className="text-2xl cursor-pointer font-medium max-sm:text-lg">HPI Showdown 2025</h1>
                </div>

            </div>
        </header>
    );
}

export default Header;