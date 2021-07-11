async function loadShaderFromFile(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let request: XMLHttpRequest = new XMLHttpRequest();
        const onError = (err) => { reject(JSON.stringify(err)) };
        request.onreadystatechange = () => {
            if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
                console.log(request.responseText)
                resolve(request.responseText);
            }
        }
        request.onerror = (err) => {
            onError(err);
        }
        request.open('GET', filename, true);
        request.send();
    })
}