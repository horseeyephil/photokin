function canvasCompression(file, quality){

        const image = new Image()
        image.src = URL.createObjectURL(file)
                
        return new Promise((resolve, reject)=>{

            image.onload = async function(){

                const resized = new Promise((res, rej)=>{
                    performResize(image, quality).toBlob(fullBlob=>{
                        res(fullBlob)
                    }, 'image/jpeg', quality)
                })
                const thumb = new Promise((res, rej)=>{
                    generateThumbnail(image).toBlob(thumbnailBlob=>{
                        res(thumbnailBlob)
                    }, 'image/jpeg', .7)
                })
                try{
                  const bundle = await Promise.all([thumb, resized])
                  resolve(bundle)
                } catch(err){
                  reject(err)
                }
            }
        })
}


function generateThumbnail(image){

    const canvas = document.createElement('canvas')
    canvas.height= 150
    canvas.width= 150
    canvas.style.border='1px solid black'

    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, image.naturalWidth*.2, image.naturalHeight*.2, image.naturalWidth*.6, image.naturalHeight*.6, 0, 0, 150, 150);

    return canvas
}


function performResize(image, quality){

        const canvas = document.createElement('canvas')
        canvas.height= image.naturalHeight
        canvas.width= image.naturalWidth

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        return canvas
}

export default canvasCompression