
export function Landing() {
    return (
        <>
            <div className="container">
                <div className="landing-left">
                    <section className="welcome">
                         <img height={200} width={300} className="logo-image"/>
                         <div>
                            <p>
                                The first step to getting on track financially 
                                is keeping track of your spending, 
                                oberving behavior, then adjusting 
                            </p>
                            <h3>Spend Aware</h3>
                         </div>
                    </section>
                </div>
                 <div className="landing-right">
                    <section className="login">
                        <form className="login-form">
                            <div className="btn-group">
                                <input
                                    type="radio"
                                    value="login"
                                    id="login"
                                    name="options"
                                    checked
                                />
                                <label htmlFor="login"> 
                                Login
                                </label>
                                <label htmlFor="signup">
                                <input
                                    type="radio"
                                    value="signup"
                                    id="signup"
                                    name="options"
                                />
                                Signup
                                </label>
                            </div>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" required/>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" required />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required />
                            <button type="submit">Submit</button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    ) 
}