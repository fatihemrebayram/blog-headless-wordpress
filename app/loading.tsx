export default function Loading() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-base-100 bg-opacity-100 z-50">
        <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
          <p className="text-base-content">Yükleniyor</p>
        </div>
      </div>
    );
  }
  