import "./AboutPage.css";

function AboutPage(): JSX.Element {
    return (
        <div className="AboutPage">
            <h1>About</h1>
            <div className="aboutSection">
                <h2>The man -test</h2>
                <p>I’m Roey and… I design as you’ve probably already guessed. Professionally I grew up in startups (going on 15 years now holy s#%t)
                    making whatever is needed, but mainly animation and motion design. In the past 2 years the focus has shifted to UI/UX but I love it all,
                    especially when I can combine it all together, including the business side.
                </p>
                <p>Lately I’ve also graduated from a full-stack development course. Don’t know…
                    just wanted to add an extra little something to my creation range. So I also dabble with that lately.</p>
            </div>

            <div className="aboutSection">
                <h2>The name</h2>
                <ul>
                    <li>It’s pronounced Ro-EE (unless you’re American, then it’s probably Raw-EE)</li>
                    <li>It means “My shepherd” in hebrew. It’s not me, it's the bible</li>
                    <li>It’s not special - #5 on the top most common names in Israel of all times</li>
                </ul>
            </div>

            <div className="aboutSection">
                <h2>The mail</h2>
                <p>Feel free to drop me a line - If I’m not hungry I’m usually very nice</p>
                <a href="#" >roeyregev@gmail.com</a>
                <button>Download my CV</button>
            </div>
        </div>
    );
}

export default AboutPage;
