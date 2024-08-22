
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PagenotFound from './pages/PagenotFound';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './user/Dashboard';
import Privateroute from './Routes/Privateroute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './Routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import UpdateProduct from './pages/Admin/UpdateProduct';
import CreateProduct from './pages/Admin/CreateProduct';
import User from './pages/Admin/User';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile';
import { Product } from './pages/Admin/Product';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryList from './pages/CategoryList';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';



function App() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/product/:slug' element={<ProductDetails></ProductDetails>}></Route>
      <Route path='/categories' element={<Categories></Categories>}></Route>
      <Route path='/cart' element={<CartPage></CartPage>}></Route>
      <Route path='/category/:slug' element={<CategoryList></CategoryList>}></Route>
      <Route path='/search' element={<Search></Search>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>

      <Route path='/dashboard' element={<Privateroute></Privateroute>}>
         <Route path='user' element={<Dashboard></Dashboard>}></Route>
         <Route path='user/orders' element={<Orders></Orders>}></Route>
         <Route path='user/profile' element={<Profile></Profile>}></Route>
      </Route>
      
      <Route path='/dashboard' element={<AdminRoute></AdminRoute>}>
        <Route path='admin' element ={<AdminDashboard></AdminDashboard>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        <Route path="admin/product" element={<Product/>}/>
        <Route path="admin/users" element={<User/>}/>
        <Route path="admin/orders" element={<AdminOrders/>}/>
        
      </Route>

      <Route path='/about' element={<About></About>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>

      <Route path='/*' element={<PagenotFound></PagenotFound>}></Route>
      <Route path='/policy' element={<Policy></Policy>}></Route>
      
    </Routes>
    
    
  
    </>
    
    
  )
}

export default App;
