import React, { useState } from 'react';
import axios from 'axios';

interface FormProps {
    onResult: (result: string) => void;
}

const EncryptDecryptForm: React.FC<FormProps> = ({ onResult }) => {
    const [message, setMessage] = useState('');
    const [algo, setAlgo] = useState('AES256');
    const [action, setAction] = useState('encrypt');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = action === 'encrypt' ? '/api/v1/messages/encrypt' : '/api/v1/messages/decrypt';
            const response = await axios.post(endpoint, { message, algo });
            onResult(response.data.newMessage);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
            <div>
                <label className="block text-gray-200 font-semibold mb-2">Message</label>
                <textarea
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Enter the message you want to encrypt/decrypt"
                />
            </div>
            <div>
                <label className="block text-gray-200 font-semibold mb-2">Algorithm</label>
                <select
                    className="w-full p-3 bg-gray-900 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={algo}
                    onChange={(e) => setAlgo(e.target.value)}
                >
                    <option value="AES256">AES256</option>
                </select>
            </div>
            <div className="flex justify-between space-x-4">
                <button
                    type="button"
                    onClick={() => setAction('encrypt')}
                    className={`flex-1 py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${action === 'encrypt' ? 'ring ring-teal-300' : ''}`}
                >
                    Encrypt
                </button>
                <button
                    type="button"
                    onClick={() => setAction('decrypt')}
                    className={`flex-1 py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 ${action === 'decrypt' ? 'ring ring-red-300' : ''}`}
                >
                    Decrypt
                </button>
            </div>
        </form>
    );
};

export default EncryptDecryptForm;
