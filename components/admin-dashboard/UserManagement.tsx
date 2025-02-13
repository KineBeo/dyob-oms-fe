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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserManagementProps {
  initialPage?: number;
  onPageChange?: (page: number) => void;
}


const UserManagement = ({
  initialPage = 1,
  onPageChange
}: UserManagementProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
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

  useEffect(() => {
    fetchUsers();
    // Gọi callback để đồng bộ page ở component cha
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, pageSize, search]);



  // Fetch users on component mount
  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users...');
      const response = await userService.getAllPagination({
        page: currentPage,
        pageSize: pageSize,
        search: search
      });
      setUsers(response.data);
      setTotalPages(response.totalPages);
      setTotalUsers(response.totalUsers);
      console.log(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle create user
  const handleCreateUser = async () => {
    try {
      await userService.create(formData as CreateUserDto);
      setIsCreateModalOpen(false);
      setFormData({ fullname: '', phone_number: '', password_hash: '' });
      setShowCreatePassword(false);
      // Reset to first page after creating a user
      setCurrentPage(1);
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
        // Adjust current page if needed
        if (users.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newPageSize = parseInt(value);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setShowUpdatePassword(false);
    setFormData({ fullname: '', phone_number: '', password_hash: '' });
  };


  return (
    <div className="bg-white shadow p-6 rounded-lg w-full">
      {/* Search and Create User Section */}
      <div className="flex justify-end items-center mb-6">
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 hidden"
        >
          + Tạo User Mới
        </Button>

        <div className="relative w-72">
          <Input
            type="text"
            placeholder="Search by phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
          <Search
            className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2"
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">Số người dùng trong một trang:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const newPageSize = parseInt(value);
              setPageSize(newPageSize);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select page size" />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} người
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-gray-600 text-sm">
            Trang {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
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