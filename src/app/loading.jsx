const LoadingPage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="relative flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-12 w-12 text-black"
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
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="ml-4 text-lg font-semibold text-black">Loading...</p>
    </div>
  </div>
);

export default LoadingPage;
