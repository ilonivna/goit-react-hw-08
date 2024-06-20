import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import welcome from "./assets/welcome.webp";
import css from "./HomePage.module.css";


export default function HomePage() {
    return (
        <div className={css.container}>
        <DocumentTitle>Home</DocumentTitle>
            <h1 className={css.title}>This is Your Personal Contact Assitant</h1>
            <img className={css.image} src={welcome} alt="Penguin sayin' welcome" />
            </div>
    )
}