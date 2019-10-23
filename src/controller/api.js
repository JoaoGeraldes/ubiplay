// Request com método GET
export async function ubiGet(url, token, body) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    let data = await response.json()
    console.log(`Response status: ${response.status}`)
    return data;
}

// Request com método POST 
export async function ubiPost(url, token, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });
    let data = await response.json()
    console.log(`Response status: ${response.status}`)
    return data;
}

// Request com método DELETE
export async function ubiDelete(url, token, body) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    let data = await response.json()
    console.log(`Response status: ${response.status}`)
    return data;
}