import { Outlet } from 'react-router-dom';

function App() {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
    //   {/* <Header />
    //   <main className="container mx-auto px-6 py-16">
    //     <Hero />
    //     <Features />
    //   </main>
    //   <Footer /> */}
    // </div>
    <Outlet />
  );
}

export default App;