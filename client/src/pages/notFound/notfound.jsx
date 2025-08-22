
export default function Notfound() {
  return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-xl text-gray-600 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
     
      </div>
    </div>
  )
}
