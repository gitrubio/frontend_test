import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from './models/routes.model'
import AuthGuard from '@/guards/auth.guard'
import { NotFound } from '@/pages/NotFound'
import { authEnum } from '@/constants/auth.const'
import { useAppSelector } from '@/store/store'
import Login from '@/pages/Login/Login'
import Dashboard from '@/pages/Dashboard/Dashboard';

function App() {
  const { status } = useAppSelector(store => store.auth)
  return (
    <BrowserRouter>
        <Routes>
          <Route path={PublicRoutes.HOME} element={<Navigate to={PublicRoutes.LOGIN} />} />
          <Route path={PublicRoutes.LOGIN} element={status === authEnum.AUTHENTIC ? <Navigate to={PrivateRoutes.DASHBOARD} /> : <Login />} />
          <Route element={<AuthGuard />}>
            <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard/>} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
   
    </BrowserRouter>
  )
}

export default App
