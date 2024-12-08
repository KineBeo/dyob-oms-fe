import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, Pencil, Trash, Eye, EyeOff, Search, Loader2 } from 'lucide-react';
import { User, CreateUserDto, UpdateUserDto } from '@/interfaces/user';
import { userService } from '@/utils/user/userApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [formData, setFormData] = useState<CreateUserDto | UpdateUserDto>({
    fullname: '',
    phone_number: '',
    password_hash: ''
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create user
  const handleCreateUser = async () => {
    try {
      await userService.create(formData as CreateUserDto);
      setIsCreateModalOpen(false);
      setFormData({ fullname: '', phone_number: '', password_hash: '' });
      setShowCreatePassword(false);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Handle update user
  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      await userService.adminUpdate(selectedUser.id, formData as UpdateUserDto);
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
      setFormData({ fullname: '', phone_number: '', password_hash: '' });
      setShowUpdatePassword(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá user này không?')) {
      try {
        await userService.remove(id);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!search) {
      fetchUsers();
      return;
    }
    try {
      const user = await userService.findByPhone(search);
      setUsers(user ? [user] : []);
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  const openUpdateModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      fullname: user.fullname,
      phone_number: user.phone_number
    });
    setIsUpdateModalOpen(true);
  };

  // Reset modal states when closing
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setShowCreatePassword(false);
    setFormData({ fullname: '', phone_number: '', password_hash: '' });
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setShowUpdatePassword(false);
    setFormData({ fullname: '', phone_number: '', password_hash: '' });
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg w-full">
      {/* Header with New Customer button and Search */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          + Tạo User Mới
        </Button>

        <div className="relative w-72">
          <Input
            type="text"
            placeholder="Search by phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
          <Search
            className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2"
            onClick={handleSearch}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-gray-200 border-y">
              <th className="p-4 w-16 font-medium text-gray-600 text-left text-sm">ID</th>
              <th className="p-4 font-medium text-gray-600 text-left text-sm">
                <div className="flex items-center gap-2">
                  Họ và Tên
                  <ArrowUpDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="p-4 font-medium text-gray-600 text-left text-sm">
                <div className="flex items-center gap-2">
                  Số điện thoại
                  <ArrowUpDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="p-4 font-medium text-gray-600 text-left text-sm">Được tạo vào</th>
              <th className="text-right p-4 w-32 font-medium text-gray-600 text-sm">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  <Loader2 className="mx-auto w-6 h-6 animate-spin" />
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-gray-200 hover:bg-gray-50 border-b">
                  <td className="p-4 text-gray-600 text-sm">{user.id}</td>
                  <td className="p-4 text-gray-900 text-sm">{user.fullname}</td>
                  <td className="p-4 text-gray-600 text-sm">{user.phone_number}</td>
                  <td className="p-4 text-gray-600 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-1">
                      <button
                        className="hover:bg-gray-100 p-1 rounded"
                        onClick={() => openUpdateModal(user)}
                      >
                        <Pencil size={16} className="text-gray-600" />
                      </button>
                      {/* <button
                        className="hover:bg-gray-100 p-1 rounded"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create User Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
            <Input
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            />
            <div className="relative">
              <Input
                type={showCreatePassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password_hash || ''}
                onChange={(e) => setFormData({ ...formData, password_hash: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowCreatePassword(!showCreatePassword)}
                className="top-1/2 right-3 absolute text-gray-500 hover:text-gray-700 -translate-y-1/2"
              >
                {showCreatePassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseCreateModal}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update User Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={handleCloseUpdateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
            <Input
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            />
            <div className="relative">
              <Input
                type={showUpdatePassword ? "text" : "password"}
                placeholder="New Password (optional)"
                value={formData.password_hash || ''}
                onChange={(e) => setFormData({ ...formData, password_hash: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                className="top-1/2 right-3 absolute text-gray-500 hover:text-gray-700 -translate-y-1/2"
              >
                {showUpdatePassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseUpdateModal}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;