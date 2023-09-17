import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import { Suspense, lazy } from "react";
import Loader from './components/loader/loader.tsx';
import { ThemeProvider } from "@/components/theme-provider"


const App= lazy(() =>
  wait(1000).then(() => import("./App.tsx"))
);

const MainPage= lazy(() =>
  wait(1300).then(() => import("./screens/main/MainPage.tsx"))
);

const NotFound= lazy(() =>
  wait(1300).then(() => import("./screens/notFound"))
);

const router = createBrowserRouter([

  {
    path: "/react-vite-supreme/itsy",
    element:  <>
    <Suspense fallback={<Loader />}>
      <MainPage  />
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
    path: "/react-vite-supreme/",
    element:
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>,
    children: [
      {
        path: "/react-vite-supreme/page2",
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
