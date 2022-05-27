


const handleSubmit = async (files, filename) => {




    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }


    // need to find a way to change the name of the image, doesn't work in the same way as before
    // const url = 'https://bjrz9uwf0k.execute-api.us-east-1.amazonaws.com/prod/itagimages/test.jpg';
    var url = 'https://ev3z7vr1oe.execute-api.us-east-1.amazonaws.com/test/itagimagesbucket/'



    const uploadToS3Bucket = async () => {
        var imgBlob = dataURItoBlob(files)
        const response = await fetch(url + filename, {
            method: 'PUT',
            body: imgBlob,
            headers: {
                'Content-Type': 'image/jpeg'
            }
        })
        const data = await response.text();
        console.log(data)

    }

    // function uploadToS3Bucket() {
    //     var imgBlob = dataURItoBlob(files)
    //     let response = fetch(url, {
    //         method: 'PUT',
    //         body: imgBlob,
    //         headers: {
    //             'Content-Type': 'image/jpeg'
    //         }
    //     })

    // }

    uploadToS3Bucket();
}
export default handleSubmit