import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { orderService } from '@/utils/order/orderApi';
import toast from 'react-hot-toast';
const StrapiControls = () => {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL_ADMIN;

  const navigateToStrapi = () => {
    window.open(STRAPI_URL, '_blank');
  };

  const handleSyncProducts = async () => {
    try {
        const response = orderService.handleSyncProducts();
        toast.promise(response, {
          loading: 'Đang đồng bộ sản phẩm...',
          success: 'Sync thành công!',
          error: 'Đồng bộ sản phẩm thất bại!'
        })
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="flex gap-4 mb-6">
      <Button 
        variant="outline"
        onClick={navigateToStrapi}
        className="flex items-center gap-2"
      >
        <ExternalLink className="w-4 h-4" />
        Truy cập Strapi
      </Button>
      
      <Button 
        onClick={handleSyncProducts}
        className="flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Đồng bộ sản phẩm
      </Button>
    </div>
  );
};

export default StrapiControls;