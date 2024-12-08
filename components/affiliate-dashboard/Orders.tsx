const Orders = () => (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Đơn hàng của tôi</h3>
      </div>
      <div className="divide-y">
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            // <div key={order.id} className="hover:bg-gray-50 p-4">
            //   <div className="flex justify-between items-start mb-2">
            //     <div>
            //       <p className="font-medium">Đơn hàng #{order.id}</p>
            //       <p className="text-gray-600 text-sm">
            //         {new Date(order.createdAt).toLocaleDateString('vi-VN')}
            //       </p>
            //     </div>
            //     <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm">
            //       {translateOrderStatus(order.status)}
            //     </span>
            //   </div>
            //   <p className="text-gray-600 text-sm">{order.snapshot_full_address}</p>
            // </div>
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="py-8 font-bold text-center text-gray-700 text-lg laptop:text-xl desktop:text-xl">Bạn chưa có đơn hàng nào</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 p-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? 'default' : 'outline'}
              size="sm"
              onClick={() => paginate(number)}
            >
              {number}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );

  export default Orders;