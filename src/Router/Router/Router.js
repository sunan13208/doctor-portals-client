import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import AllDoctor from "../../Pages/AllDoctors/AllDoctor/AllDoctor";
import ManageDoctor from "../../Pages/AllDoctors/ManageDoctor/ManageDoctor";
import Appointment from "../../Pages/Appointment/Appoinment/Appointment";
import AllUser from "../../Pages/Dashboard/AllUser/AllUser";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Payment from "../../Pages/Dashboard/payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisPlayError from "../../Pages/Shared/DisPlayError.js/DisPlayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRouter from "../AdminRouter/AdminRouter";
import PrivateRouter from "../PrivateRouter/PrivateRouter";

const router = createBrowserRouter([
    {
        path: '/', element: <Main></Main>,
        errorElement: <DisPlayError></DisPlayError>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: '/login', element: <Login></Login> },
            { path: '/signup', element: <SignUp></SignUp> },
            { path: '/appointment', element: <PrivateRouter><Appointment></Appointment></PrivateRouter> },
        ]
    },
    {
        path: '/dashboard', element: <PrivateRouter><DashBoardLayout></DashBoardLayout></PrivateRouter>,
        errorElement: <DisPlayError></DisPlayError>
        , children: [
            { path: '/dashboard', element: <Dashboard></Dashboard> },
            { path: '/dashboard/users', element: <AdminRouter><AllUser></AllUser></AdminRouter> },
            { path: '/dashboard/doctors', element: <AdminRouter><AllDoctor></AllDoctor></AdminRouter> },
            { path: '/dashboard/mangedoctors', element: <AdminRouter><ManageDoctor></ManageDoctor></AdminRouter> },
            {
                path: '/dashboard/payment/:id',
                element: <PrivateRouter><Payment></Payment></PrivateRouter>,
                loader: ({ params }) => fetch(`https://doctor-portal-server-lyart.vercel.app/payment/${params.id}`)
            }

        ]
    }
])

export default router