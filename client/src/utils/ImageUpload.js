export const imageUpload =async (images) => {
    let newImages = []


    for(const img of images) {
        const formData = new FormData()
        formData.append('file', img)


        formData.append('cloud_name', "daggokgzh")
        formData.append('upload_preset', "bfna2zf7")


        const res = await fetch("https://api.cloudinary.com/v1_1/daggokgzh/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()

        newImages.push({
            public_id: data.public_id,
            url: data.secure_url
        })
    }


    return newImages
};