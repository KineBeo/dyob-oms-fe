import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import { ShippingFormData } from "@/interfaces/user-address";

interface Location {
  code: string;
  name: string;
}

interface AddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShippingFormData) => Promise<void>;
  initialData?: Partial<ShippingFormData>;
}

const AddressDialog = ({ isOpen, onClose, onSubmit, initialData = {} }: AddressDialogProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  
  // Thay đổi state để lưu cả code và name
  const [selectedProvince, setSelectedProvince] = useState<{ code: string; name: string } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{ code: string; name: string } | null>(null);
  
  const [formData, setFormData] = useState<ShippingFormData>({
    user_id: user?.id || 0,
    receiver_name: '',
    phone_number: '',
    province: '',
    district: '',
    ward: '',
    street_address: '',
    is_default: false,
    notes: '',
    ...initialData,
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://provinces.open-api.vn/api/p/');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince?.code) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`);
          const data = await response.json();
          setDistricts(data.districts);
          setSelectedDistrict(null);
          setFormData(prev => ({
            ...prev,
            district: '',
            ward: ''
          }));
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict?.code) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
          const data = await response.json();
          setWards(data.wards);
          setFormData(prev => ({
            ...prev,
            ward: ''
          }));
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Họ và tên người nhận hàng</label>
            <Input
              required
              value={formData.receiver_name}
              onChange={(e) => setFormData({ ...formData, receiver_name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Số điện thoại</label>
            <Input
              required
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tỉnh/Thành phố</label>
            <Select 
              value={selectedProvince?.code || ''}
              onValueChange={(value) => {
                const province = provinces.find(p => p.code === value);
                if (province) {
                  setSelectedProvince({ code: province.code, name: province.name });
                  setFormData(prev => ({ ...prev, province: province.name }));
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tỉnh/thành phố">
                  {selectedProvince?.name || "Chọn tỉnh/thành phố"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.code} value={province.code}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quận/Huyện</label>
            <Select
              value={selectedDistrict?.code || ''}
              onValueChange={(value) => {
                const district = districts.find(d => d.code === value);
                if (district) {
                  setSelectedDistrict({ code: district.code, name: district.name });
                  setFormData(prev => ({ ...prev, district: district.name }));
                }
              }}
              disabled={!selectedProvince}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn quận/huyện">
                  {selectedDistrict?.name || "Chọn quận/huyện"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.code} value={district.code}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phường/Xã</label>
            <Select
              value={formData.ward}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, ward: value }));
              }}
              disabled={!selectedDistrict}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phường/xã" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((ward) => (
                  <SelectItem key={ward.code} value={ward.name}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Địa chỉ cụ thể</label>
            <Input
              required
              value={formData.street_address}
              onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ghi chú</label>
            <Input
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.is_default}
              onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="isDefault" className="text-sm font-medium">
              Đặt làm địa chỉ mặc định
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="flat" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              {initialData ? 'Lưu' : 'Thêm địa chỉ'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;