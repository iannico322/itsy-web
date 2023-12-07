import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import { Suspense, lazy } from "react";
import Loader from './components/loader/loader.tsx';
import { ThemeProvider } from "@/components/theme-provider"


const App= lazy(() =>
  wait(2000).then(() => import("./App.tsx"))
);
const Activation= lazy(() =>
  wait(2000).then(() => import("./screens/authentication/activation.tsx"))
);

const MainPage= lazy(() =>
  wait(1300).then(() => import("./screens/main/MainPage.tsx"))
);

const MainPageAcc= lazy(() =>
  wait(1300).then(() => import("./screens/main/MainPageAcc.tsx"))
);

const NotFound= lazy(() =>
  wait(1300).then(() => import("./screens/notFound"))
);

const router = createBrowserRouter([

  {
    path: "/itsy-web/itsy",
    element:  <>
    <Suspense fallback={<Loader />}>
      <MainPage  />
    </Suspense>
  </>,
  },
  {
    path: "/itsy-web/main",
    element:  <>
    <Suspense fallback={<Loader />}>
      <MainPageAcc/>
    </Suspense>
  </>,
  },
  {
    path: "/itsy-web/activation/:uid/:token",
    element:  <>
    <Suspense fallback={<Loader />}>
      <Activation  />
    </Suspense>
  </>,
  },
  {
    path: "*",
    element: 
    <Suspense fallback={<Loader />}>
      <NotFound />
    </Suspense>
  },
  {
    path: "/itsy-web/",
    element:
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>,
    children: [
      {
        path: "/itsy-web/page2",
        element: 
        <Suspense fallback={<Loader />}>
          <NotFound />
        </Suspense>
      },



     
    ],
  },
]);

function wait( time:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <div className=' fixed  flex items-end w-full h-full  pointer-events-none '>
      <Toaster />
      
    </div> */}
    
  </React.StrictMode>
  </ThemeProvider>,
)
