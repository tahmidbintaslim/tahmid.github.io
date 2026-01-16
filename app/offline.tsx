export default function OfflinePage() {
  return (
    <html lang="en">
      <head>
        <title>Offline - Tahmid Ahmed</title>
        <meta name="description" content="You are currently offline" />
      </head>
      <body className="bg-[#030014] text-white flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
          <p className="text-gray-300 mb-8">
            It looks like you don't have an internet connection. Some content
            may not be available.
          </p>
          <p className="text-sm text-gray-500">
            Try checking your connection and refreshing the page.
          </p>
        </div>
      </body>
    </html>
  );
}
