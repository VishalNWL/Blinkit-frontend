import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import SearchPage from "../Pages/SearchPage";
import Register from "../Pages/Register";
import Login from '../Pages/Login'
import ForgotPassword from "../Pages/ForgotPassword";
import Verifyotp from "../Pages/Verifyotp";
import ResetPassword from "../Pages/ResetPassword";
import UserMenueMobile from "../Pages/UserMenueMobile";
import Profile from "../Pages/Profile";
import Dashboard from "../layout/Dashboard";
import MyOrders from "../Pages/MyOrders";
import Address from "../Pages/Address";
import CategoryPage from "../Pages/CategoryPage";
import SubCategoryPage from "../Pages/SubCategoryPage";
import UploadProduct from "../Pages/UploadProduct";
import ProductAdmin from "../Pages/ProductAdmin";
import AdminPermision from "../layout/AdminPermision";
import ProductListPage from "../Pages/ProductListPage";
import ProductDisplayPage from "../Pages/ProductDisplayPage";
import CartMobile from "../Pages/CartMobile";
import CheckoutPage from "../Pages/CheckoutPage";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";

const router = createBrowserRouter([
    {
        path: '/',
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"search",
                element:<SearchPage/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'verifyotp',
                element:<Verifyotp/>
            },
            {
                path:'reset-password',
                element:<ResetPassword/>
            },
            {
                path:"user",
                element:<UserMenueMobile/>
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    },
                    {
                        path:"myorders",
                        element:<MyOrders/>
                    },
                    {
                        path:"address",
                        element:<Address/>
                    },
                    {
                        path:'category',
                        element:<AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path:"subcategory",
                        element:<AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                    {
                        path:"upload-product",
                        element:<AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path: "product",
                        element:<AdminPermision><ProductAdmin/></AdminPermision>
                    }

                ]
            },
            {
                path:":category",
                children:[
                    {
                        path:':subCategory',
                        element:<ProductListPage/>
                    }
                ]
            },
            {
                path:"product/:product",
                element:<ProductDisplayPage/>
            },
            {
                path:'cart',
                element:<CartMobile/>
            },
            {
                path:'checkout',
                element:<CheckoutPage/>
            },
            {
                path:'success',
                element:<Success/>
            },
            {
                path:'cancel',
                element:<Cancel/>
            }
        ]
    }
])

export default router;