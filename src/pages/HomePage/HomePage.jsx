import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import welcome from "./assets/welcome.webp";

export default function HomePage() {
    return (
        <div>
        <DocumentTitle>Home</DocumentTitle>
            <h1>Welcome to your Personal Contact Assitant Page</h1>
            <img src={welcome} alt="Penguin sayin' welcome" />
            </div>
    )
}