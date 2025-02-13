import { useState } from "react";
import { Auth } from 'aws-amplify';

var accessToken = ""
var jwt = ""

Auth.currentSession().then(res => {
    accessToken = res.getAccessToken()
    jwt = accessToken.getJwtToken()
})




const RemoveImageTags = () => {
    const [isComplete, setIsComplete] = useState(false);


    const [targetURL, setTargetURL] = useState('');
    const [userTags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = targetURL;
        const stringTags = userTags;
        const tags = stringTags.split(" ");
        const type = 0;
        const payload = { url, type, tags };
        console.log(payload)

        let response = await fetch('https://ev3z7vr1oe.execute-api.us-east-1.amazonaws.com/test/update_tags/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        let data = await response.text();
        console.log(data);
        if (data === "Tags Successfully Updated")
            setIsComplete(true);

    }


    return (
        <div>
            {/* <h2> Remove tags from image</h2> */}
            <form onSubmit={handleSubmit}>
                <label> URL: </label>
                <input
                    type="text"
                    value={targetURL}
                    onChange={(e) => setTargetURL(e.target.value)} />
                <label> Tags: </label>
                <input
                    type="text"
                    value={userTags}
                    onChange={(e) => setTags(e.target.value)} />
                <button>Remove Tags</button>
            </form>
            {isComplete && <p>Tag has been removed</p>}
            {/* {!isComplete && <p>Unable to remove tag</p>} */}
        </div>
    );
};

export default RemoveImageTags