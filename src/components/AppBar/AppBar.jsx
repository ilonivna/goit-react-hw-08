import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { AuthNav } from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import { useSelector } from "react-redux";
import UserMenu from "../../components/UserMenu/UserMenu"; 




export default function AppBar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
    return (
        <header>
            <Navigation />
            {isLoggedIn ? <UserMenu/> : <AuthNav/>}
        </header>
    )
}