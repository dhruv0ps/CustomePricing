
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "../src/layout/Home"
import PricingConditions from './features/Customer/CustomePricing'; // Child Component
import CustomerManagement from './features/Customer/PriceManagement';
import CustomerView from './features/Customer/CustomPriceView';
import CreateMachine from './features/Manufactoring/createMachine';
import MachineList from './features/Manufactoring/MachineList';
import ReportMachine from './features/Manufactoring/ReportMachine';
import ViewMachine from './features/Manufactoring/ViewMachine';
import StationForm from './features/Manufactoring/Stationform';


function App() {
  const router = createBrowserRouter([
    {
      path: '/', // Parent route
      element: <Home />, // Parent Component
      children: [
        {
          path: 'customer/customepricing', 
          element: <PricingConditions />, 
        },
        {
          path : "customer/customepricing/:id",
          element : <PricingConditions/>
        },
        {
          path : "customepricing/view/:id",
          element : <CustomerView/>
        },
        {
          path : "customer/pricemanagment",
          element : <CustomerManagement/>
        },

        {
          path: "manufacturer/addmachine",
          element  : <CreateMachine/>
        }
        ,
        {
          path : "manufacturer/listmachine",
          element : <MachineList/>
        },
        {
          path : "manufacturer/reportmachine/:id",
          element : <ReportMachine/>
        },{
          path : "manufacturer/viewmachine/:id",
          element : <ViewMachine/>
        },{
          path : "manufacturer/stationform",
          element : <StationForm/>
        }
      ],
    }
   
  ]);

  return <RouterProvider router={router} />;
}

export default App;
