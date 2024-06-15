import error from "./assets/error.webp"

export default function Error() {
    return (
        <div>
            <img src={error} alt="error gif" />
            <h4>Sorry, error occured, reload the page!</h4>
</div>
    )
}