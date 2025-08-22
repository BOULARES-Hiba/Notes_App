function Unauth() {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-red-600">Access Denied</h1>
        <p className="text-xl text-gray-600 max-w-md">
          You don't have permission to view this page.
        </p>
      </div>
    </div>
      
      );
}

export default Unauth;