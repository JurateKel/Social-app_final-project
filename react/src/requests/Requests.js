const serverUrl = "http://localhost:4000/"

const request = {
    post: async (data, url) => {
        const options = {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }

        const res = await fetch(`${serverUrl}${url}`, options)
        return await res.json()
        
    },
    get: async (url) => {
        const options = {
            method: 'GET',
            headers: {
            'content-type': 'application/json'
            },
            credentials: 'include'
        }

        const res = await fetch(`${serverUrl}${url}`, options)
        const data = await res.json()
        return data
    }
}

export default request