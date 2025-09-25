import React from 'react';
import { User } from '../App';
// Fix: Replaced non-existent 'UsersIcon' with 'UserIcon' as suggested by the compilation error.
import { UserIcon } from './icons';

interface AdminViewProps {
    users: User[];
    translations: {
        title: string;
        subtitle: string;
        totalUsers: string;
        table: {
            email: string;
            registeredAt: string;
        };
        noUsers: string;
    };
}

const AdminView: React.FC<AdminViewProps> = ({ users, translations }) => {

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Sort users by most recent first
    const sortedUsers = [...users].sort((a, b) => b.createdAt - a.createdAt);

    return (
        <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{translations.title}</h1>
                <p className="text-gray-400 mb-8">{translations.subtitle}</p>

                <div className="mb-6 bg-gray-800/50 border border-gray-700 p-4 rounded-lg flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                        {/* Fix: Replaced non-existent 'UsersIcon' with 'UserIcon'. */}
                        <UserIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{translations.totalUsers}</p>
                        <p className="text-2xl font-bold text-white">{users.length}</p>
                    </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                    {sortedUsers.length === 0 ? (
                        <div className="text-center py-20">
                            {/* Fix: Replaced non-existent 'UsersIcon' with 'UserIcon'. */}
                            <UserIcon className="mx-auto h-12 w-12 text-gray-500" />
                            <p className="mt-4 text-lg text-white">{translations.noUsers}</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            {translations.table.email}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            {translations.table.registeredAt}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-900 divide-y divide-gray-700">
                                    {sortedUsers.map((user) => (
                                        <tr key={user.email} className="hover:bg-gray-800/50 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(user.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminView;