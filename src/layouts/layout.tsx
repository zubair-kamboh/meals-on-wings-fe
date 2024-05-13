import { ProtectedRouteProps } from "../types/types"

export const Layout =({children}:ProtectedRouteProps)=>{

    return(
        <div>
 {children}
        </div>
    )
}