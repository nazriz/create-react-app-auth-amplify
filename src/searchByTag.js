import { useState } from "react";

const SearchByTag = () => {

    const [userTags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stringTags = userTags;
        const tags = stringTags.split(" ");
        const inputTags = { tags };
        console.log(inputTags)

        let response = await fetch('https://ev3z7vr1oe.execute-api.us-east-1.amazonaws.com/test/searchbytag/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputTags)
        })

        let data = await response.json();
        console.log(data);

    }


    return (
        <div>
            <h2> Search by tag</h2>
            <form onSubmit={handleSubmit}>
                <label> Tags: </label>
                <input
                    type="text"
                    value={userTags}
                    onChange={(e) => setTags(e.target.value)} />
                <button>Submit Tags</button>
                <p>{userTags}</p>
            </form>
        </div>
    );
};

export default SearchByTag