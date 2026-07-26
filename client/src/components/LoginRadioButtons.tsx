
export default function LoginRadioButtons({ selectedRadioButton, setSelectedRadioButton }) {
    return (
        <>
            <input
                type="radio"
                value="signup"
                id="signup"
                name="options"
                checked={selectedRadioButton === "signup"}
                onChange={(e) => setSelectedRadioButton(e.target.value)}
            />
            <label htmlFor="signup">
                Signup
            </label>

            <input
                type="radio"
                value="login"
                id="login"
                name="options"
                checked={selectedRadioButton === "login"}
                onChange={(e) => setSelectedRadioButton(e.target.value)}
            />
            <label htmlFor="login">
                Login
            </label>

            <input
                type="radio"
                value="guest"
                id="guest"
                name="options"
                checked={selectedRadioButton === "guest"}
                onChange={(e) => setSelectedRadioButton(e.target.value)}
            />
            <label htmlFor="guest">
                Guest
            </label>
        </>
    )
}