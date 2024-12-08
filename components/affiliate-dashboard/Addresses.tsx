import { ExistingAddress, ShippingFormData } from "@/interfaces/user-address";
import { RootState } from "@/store/store";
import { userAddressService } from "@/utils/user-address/userAddressApi";
import { Button } from "@nextui-org/react";
import { Plus, PencilIcon, Trash2Icon, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddressDialog from "./AddressDialog";

const Addresses = () => {
    const [addresses, setAddresses] = useState<ExistingAddress[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<ExistingAddress | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            if (!user?.id) return;
            const data = await userAddressService.getUserAddresses(user.id);
            setAddresses(data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [user?.id]);

    const handleAddAddress = async (formData: ShippingFormData) => {
        try {
            await userAddressService.createAddress(formData);
            fetchAddresses();
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handleUpdateAddress = async (formData: ShippingFormData) => {
        try {
            if (!editingAddress?.id) return;
            await userAddressService.updateAddress(editingAddress.id, formData);
            fetchAddresses();
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleDeleteAddress = async (addressId: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
            try {
                await userAddressService.deleteAddress(addressId);
                fetchAddresses();
            } catch (error) {
                console.error('Error deleting address:', error);
            }
        }
    };

    const handleSubmit = async (formData: ShippingFormData) => {
        if (editingAddress) {
            await handleUpdateAddress(formData);
        } else {
            await handleAddAddress(formData);
        }
        setIsDialogOpen(false);
        setEditingAddress(null);
    };

    const getFullAddress = (address: ShippingFormData) => {
        return `${address.street_address}, ${address.ward}, ${address.district}, ${address.province}`;
    };

    if (isLoading) {
        return <div className="p-4 text-center">Đang tải...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-none border border-gray-300">
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Địa chỉ của tôi</h3>
                <Button
                    variant="flat"
                    onClick={() => {
                        setEditingAddress(null);
                        setIsDialogOpen(true);
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm địa chỉ mới
                </Button>
            </div>
            <div className="p-4">
                {addresses.length > 0 ? (
                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <div key={address.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                                <div className="flex justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{address.receiver_name}</p>
                                            {address.is_default && (
                                                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                                                    Mặc định
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">{address.phone_number}</p>
                                        <p className="text-sm text-gray-600">{getFullAddress(address)}</p>
                                        {address.notes && (
                                            <p className="text-sm text-gray-500">Ghi chú: {address.notes}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="flat"
                                            size="sm"
                                            onClick={() => {
                                                setEditingAddress(address);
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                        {/* <Button
                                            variant="flat"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700"
                                            onClick={() => handleDeleteAddress(address.id)}
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-gray-500">Bạn chưa có địa chỉ nào</p>
                    </div>
                )}
            </div>

            <AddressDialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setEditingAddress(null);
                }}
                onSubmit={handleSubmit}
                initialData={editingAddress || undefined}
            />
        </div>
    );
};

export default Addresses;