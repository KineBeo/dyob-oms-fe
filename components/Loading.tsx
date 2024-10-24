// components/Loading.tsx
const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="loader"></div>
      <p className="mt-4 text-xl">Loading...</p> {/* Thêm margin-top cho khoảng cách */}

      <style jsx>{`
        .loader {
          border: 12px solid #d7a444; /* Light grey */
          border-top: 12px solid #3f291b; 
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
