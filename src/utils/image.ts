let _defaultImage = '';

export function convertImgToBase64Async(imageUrl) {
    return new Promise((resolve, reject) => {
        if (!imageUrl) {
            reject();
            return;
        }
        if (imageUrl.startsWith('base64')) {
            resolve(imageUrl);
            return;
        }
        convertImgToBase64(imageUrl, (base64) => {
            if (base64) {
                resolve(base64)
            } else {
                reject();
            }
        });
    })
}

export function convertImgToBase64(imgUrl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", imgUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            var reader = new FileReader();
            reader.onload = function (e: any) {
                try {
                    callback && callback(e.target.result);
                } catch (error) {
                    callback && callback(_defaultImage);
                }
            }
            reader.readAsDataURL(this.response);
        } else {
            callback && callback(_defaultImage);
        }
    }
    xhr.send();
}

