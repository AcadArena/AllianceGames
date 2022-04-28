import { PropsWithChildren, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import Login from "../../pages/Login"

const RoomGuard = ({ children }: PropsWithChildren<{}>) => {
  // const { pathname } = useLocation()
  // const [reqLocation, setReqLocation] = useState<string | null>(null)

  // if (!auth) return <Login />
  // if (reqLocation && pathname !== reqLocation) {
  //   setReqLocation(null)
  //   return <Navigate to={reqLocation} />
  // }

  return <>{children}</>
}

export default RoomGuard
