import { useState } from "react";
import { Auth } from 'aws-amplify';

var accessToken = ""
var jwt = ""

Auth.currentSession().then(res => {
    accessToken = res.getAccessToken()
    jwt = accessToken.getJwtToken()
})




const DeleteItem = () => {
    const [inputURL, setInputURL] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = inputURL;

        const deleteURL = { url };
        console.log(deleteURL)
        let response = await fetch('https://ev3z7vr1oe.execute-api.us-east-1.amazonaws.com/test/delete_image', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteURL)
        })

        let data = await response.text();
        console.log(data);
        if (data == "Image Successfully Deleted")
            setIsComplete(true);
        console.log(isComplete);
    }


    return (
        <div>
            {/* <h2> Delete Item</h2> */}
            <form onSubmit={handleSubmit}>
                <label> Submit URL to delete </label>
                <input
                    type="text"
                    value={inputURL}
                    onChange={(e) => setInputURL(e.target.value)} />
                <button>Submit </button>
                <p>{inputURL}</p>
            </form>
            {isComplete && <p>This URL is no longer in the database</p>}
        </div>
    );
};

export default DeleteItem