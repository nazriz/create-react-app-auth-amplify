import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import handleSubmit from './UploadToS3_imageforimage'

var filename;

function DropzoneImageForImage() {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const test = reader.result;

                // Get name of the file, pass to handle also
                filename = file.name;
                // console.log(filename);
                //push to s3
                handleSubmit(test, filename)

                // const binaryStr = reader.result
                // console.log(binaryStr)

            }
            reader.readAsDataURL(file)
        })

    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    return (
        <div style={
            {
                border: '2px solid purple'
            }
        }{...getRootProps()}>
            <input {...getInputProps()} />
            <p>Upload image here to search by image</p>

        </div>
    )
}


<DropzoneImageForImage />
export default DropzoneImageForImage