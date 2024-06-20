import sorryGif from "./assets/sorry.gif";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            <img src={sorryGif} alt="Sorry.." />
            <h3>
                Sorry, requested page was not found. Please, <Link to="/">return to Home Page</Link>
            </h3>
</div>
    )
}