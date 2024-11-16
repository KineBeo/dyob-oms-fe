import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, Pencil, Trash, Eye, Search } from 'lucide-react';

const UserManagement = () => {
    const [users] = useState([
        { id: 1, fullName: 'Alyxia Kelley', phone: '0912345678', dateOfBirth: '06/18/1978' },
        { id: 2, fullName: 'Jaiden Nixon', phone: '0923456789', dateOfBirth: '09/30/1983' },
        { id: 3, fullName: 'Ace Foley', phone: '0934567890', dateOfBirth: '12/09/1985' },
        { id: 4, fullName: 'Nikolai Schmidt', phone: '0945678901', dateOfBirth: '03/22/1956' },
        { id: 5, fullName: 'Clayton Charles', phone: '0956789012', dateOfBirth: '10/14/1971' },
        { id: 6, fullName: 'Prince Chen', phone: '0967890123', dateOfBirth: '07/05/1992' },
        { id: 7, fullName: 'Reece Duran', phone: '0978901234', dateOfBirth: '05/26/1980' },
        { id: 8, fullName: 'Anastasia Mcdaniel', phone: '0989012345', dateOfBirth: '02/11/1988' },
        { id: 9, fullName: 'Melvin Boyle', phone: '0990123456', dateOfBirth: '08/03/1974' },
        { id: 10, fullName: 'Kailee Thomas', phone: '0901234567', dateOfBirth: '11/28/1954' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    return (
        <div className="bg-white shadow p-6 rounded-lg w-full">
            {/* Header with New Customer button and Search */}
            <div className="flex justify-between items-center mb-6">
                {/* New Customer Button */}
                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium text-sm text-white transition-colors">
                    + NEW CUSTOMER
                </button>

                {/* Search Input */}
                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-gray-300 focus:border-gray-400 py-2 pr-4 pl-10 border rounded-lg focus:ring-0 w-full text-sm focus:outline-none"
                    />
                    <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-gray-200 border-y">
                            <th className="p-4 w-16 font-medium text-gray-600 text-left text-sm">#</th>
                            <th className="p-4 font-medium text-gray-600 text-left text-sm">
                                <div className="flex items-center gap-2">
                                    Full Name
                                    <ArrowUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="p-4 font-medium text-gray-600 text-left text-sm">
                                <div className="flex items-center gap-2">
                                    Số điện thoại
                                    <ArrowUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="p-4 font-medium text-gray-600 text-left text-sm">
                                <div className="flex items-center gap-2">
                                    Date of Birth
                                    <ArrowUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="text-right p-4 w-32 font-medium text-gray-600 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-gray-200 hover:bg-gray-50 border-b">
                                <td className="p-4 text-gray-600 text-sm">{user.id}</td>
                                <td className="p-4 text-gray-900 text-sm">{user.fullName}</td>
                                <td className="p-4 text-gray-600 text-sm">{user.phone}</td>
                                <td className="p-4 text-gray-600 text-sm">{user.dateOfBirth}</td>
                                <td className="p-4">
                                    <div className="flex justify-end gap-1">
                                        <button className="hover:bg-gray-100 p-1 rounded">
                                            <Eye size={16} className="text-gray-600" />
                                        </button>
                                        <button className="hover:bg-gray-100 p-1 rounded">
                                            <Pencil size={16} className="text-gray-600" />
                                        </button>
                                        <button className="hover:bg-gray-100 p-1 rounded">
                                            <Trash size={16} className="text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div className="text-gray-500 text-sm">
                    Showing page {currentPage} of 10
                </div>

                <div className="flex items-center gap-2">
                    {/* Previous Page Button */}
                    <button
                        className="hover:bg-gray-50 disabled:opacity-50 p-1 border rounded"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    >
                        <ChevronLeft size={16} className="text-gray-600" />
                    </button>

                    {/* Page Numbers */}
                    {[1, 2, 3, 4].map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded text-sm font-medium ${currentPage === page
                                ? 'bg-gray-900 text-white'
                                : 'border hover:bg-gray-50 text-gray-600'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Page Input */}
                    <input
                        type="number"
                        className="px-2 border rounded w-16 h-8 text-center text-sm"
                        placeholder="10"
                    />

                    {/* Next Page Button */}
                    <button
                        className="hover:bg-gray-50 p-1 border rounded"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;