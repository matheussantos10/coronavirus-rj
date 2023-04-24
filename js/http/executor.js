const executorRequest = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((response) => resolve(response))
            .catch((err) => reject(err));
    });
};

export { executorRequest };
