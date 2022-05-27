import { useState } from "react";
import { Auth } from 'aws-amplify';

var accessToken = ""
var jwt = ""

Auth.currentSession().then(res => {
    accessToken = res.getAccessToken()
    jwt = accessToken.getJwtToken()
})




const SearchByTag = () => {
    const [isComplete, setIsComplete] = useState(false);

    var data = ''
    const [userTags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stringTags = userTags;
        const tags = stringTags.split(" ");
        const inputTags = { tags };
        console.log(inputTags)

        let response = await fetch(' https://ev3z7vr1oe.execute-api.us-east-1.amazonaws.com/test/searchbytag', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorisation: "Bearer" + jwt
            },
            body: JSON.stringify(inputTags)
        })
        // console.log(response);
        data = await response.json();
        console.log(data.links[0]);
        console.log(data.links[0] === "No tags match in database");

        var url_ = JSON.stringify(data)
        alert(url_.slice(url_.indexOf("https"), url_.indexOf(".jpg")))

        if (!data.links[0] === "No tags match in database")
            setIsComplete(true);
    }


    return (
        <div>
            {/* <h2> Search by tag</h2> */}
            <form onSubmit={handleSubmit}>
                <label> Tags: </label>
                <input
                    type="text"
                    value={userTags}
                    onChange={(e) => setTags(e.target.value)} />
                <button>Submit Tags</button>
                <p>{userTags}</p>
            {/* {isComplete && <p>This tag has an</p>} */}
            </form>
        </div>
    );
};

export default SearchByTag