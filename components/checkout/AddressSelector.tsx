import React, { useEffect, useState } from 'react';
import { UserAddress } from '@/interfaces/user-address';

interface AddressSelectorProps {
  userId: number;
  addresses: UserAddress[];
  onAddressSelect: (address: UserAddress) => void;
  onCreateNew: () => void;
  onOrder: (referralCode: string) => void;
  isLoading?: boolean;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  userId,
  addresses,
  onAddressSelect,
  onCreateNew,
  onOrder,
  isLoading = false,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState<string>('');

  useEffect(() => {
    const defaultAddress = addresses.find(addr => addr.is_default);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
      onAddressSelect(defaultAddress);
    }
  }, [addresses]);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Địa chỉ giao hàng</h3>
        <button
          onClick={onCreateNew}
          className="text-blue-600 hover:text-blue-800"
        >
          + Thêm địa chỉ mới
        </button>
      </div>
      
      <div className="space-y-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedAddressId === address.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => {
              setSelectedAddressId(address.id);
              onAddressSelect(address);
            }}
          >
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{address.receiver_name}</p>
                <p className="text-gray-600">{address.phone_number}</p>
              </div>
              {address.is_default && (
                <span className="text-blue-600 text-sm">Mặc định</span>
              )}
            </div>
            <p className="text-gray-700 mt-2">
              {`${address.street_address}, ${address.ward}, ${address.district}, ${address.province}`}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 border-t pt-4">
        <div>
          <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
            Mã giới thiệu (không bắt buộc)
          </label>
          <input
            id="referralCode"
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập mã giới thiệu nếu có"
          />
        </div>

        <button
          onClick={() => onOrder(referralCode)}
          disabled={!selectedAddressId || isLoading}
          className={`w-full rounded-md px-4 py-3 text-base font-medium text-white shadow-sm ${
            !selectedAddressId || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang xử lý...
            </div>
          ) : (
            'Đặt hàng'
          )}
        </button>
      </div>
    </div>
  );
};

export default AddressSelector;