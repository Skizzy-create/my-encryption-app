// src/components/Header/UserMenu.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
    user: { id: string; firstName: string } | null;
    onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: UserMenuProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="relative ml-auto">
            <button
                className={`${user
                    ? 'bg-gradient-to-br from-purple-600 to-blue-500'
                    : 'bg-gray-400 hover:bg-gray-500'
                    } text-white p-3 rounded-full transition-all text-xl font-bold h-14 w-14`}
                onClick={() => setShowMenu(!showMenu)}
            >
                {user ? user.firstName.charAt(0).toUpperCase() : '?'}
            </button>
            {showMenu && (
                <div className="absolute top-16 right-0 bg-white bg-opacity-80 p-2 rounded shadow-lg w-32" style={{ top: "60px", right: "0px" }}>
                    {user ? (
                        <button onClick={onLogout} className="block w-full text-left p-2 hover:bg-red-100">
                            Logout
                        </button>
                    ) : (
                        <>
                            <button onClick={() => navigate("/SignIn")} className="block w-full text-left p-2 hover:bg-blue-100">
                                Sign In
                            </button>
                            <button onClick={() => navigate("/SignUp")} className="block w-full text-left p-2 hover:bg-green-100">
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
