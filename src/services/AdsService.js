export function auth(username, password, callback) {
    fetch('http://localhost:3000/api/auth', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({username, password})
    })
        .then(results => {
            if (results.status == 200) {
                callback(true);
            } else {
                console.log("incorrect username or password" + results.text())
                callback(false)
            }
        })
}

export function updateAd(updatedAd, callback) {
    fetch('http://localhost:3000/api/admin/update', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedAd),
        credentials: 'include',

    })
        .then(results => {
            if (results.status == 200) {
                callback(true);
            } else {
                console.log("error while updating ad" + results.text())
                callback(false)
            }
        })
}

export function removeAd(adMessageName, callback) {
    let url = new URL("http://localhost:3000/api/admin/delete")
    let params = {messageName: adMessageName}
    url.search = new URLSearchParams(params).toString();
    fetch(url,{
        credentials: 'include'
    })
        .then(results => {
            if (results.status == 200) {
                callback(true);
            } else {
                console.log("error while removing ad" + results.text())
                callback(false)
            }
        })
}

export const getMessagesFromServer = (callback) => {
    fetch('http://localhost:3000/api/admin/messages',{
        credentials: 'include',
    })
        .then(results => {
            if(results.redirected){
                callback(results);
            }else{
                results.json()
                    .then(data=> callback(data))
            }
        })
};

export const adNewAd = (ad, callback) => {
    fetch('http://localhost:3000/api/admin/create', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ad),
        credentials: 'include',
    })
        .then(results => {
            if (results.status == 200) {
                callback(true);
            } else {
                console.log("error while adding ad" + results.text())
                callback(false)
            }
        })

}

