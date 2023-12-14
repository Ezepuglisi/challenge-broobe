import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

export function ProtectedRoute({ children }) {

    const { user, loadingUser } = useAuth();



    if (loadingUser) {
        return <section className='form-component'><Loader /></section>
    }




    if (!user) {
        return <Navigate to="/login" />
    }

    return <> {children} </>
}