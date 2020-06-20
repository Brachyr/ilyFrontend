import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            user: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8090/login", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        user: result
                    });
                localStorage.setItem('user', this.state.user.username);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h2>{this.state.user.username}</h2>
                    <form action="http://localhost:8090/login" method="post">
                        Felhasználónév<br/>
                        <input type="text" name="username"/>
                        <br/>Jelszó<br/>
                        <input type="password" name="password" required/>
                        <input type="submit" value="Hozzáad"/>
                    </form>
                </div>
            );
        }
    }
}

export default Login;