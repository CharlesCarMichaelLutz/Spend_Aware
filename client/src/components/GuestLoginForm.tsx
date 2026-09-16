
export function GuestLoginForm({handleGuestFormSubmit }) {
    return (
        <>
            <form className="login-form" onSubmit={handleGuestFormSubmit}>
                <h3 className="login-text">Visit as guest</h3>
                <button type="submit">Enter</button>
            </form>
        </>
    )
}