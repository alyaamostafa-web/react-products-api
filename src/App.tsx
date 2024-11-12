import {  RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {

  return (
    <> 
          <RouterProvider router={router} />
      {/* <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<h2>categories</h2>} />
        </Route>
       
          <Route path="/login" element={<LoginPage isAuthenticated={token} />} />
    
      </Routes> */}
    </>
  );
}

export default App;
