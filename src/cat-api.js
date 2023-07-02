const url1 = 'https://api.thecatapi.com/v1/breeds';
const url2 = "https://api.thecatapi.com/v1/images/search";
const key = 'live_vuK47daOYCBQZauB6OZcP9dgOZjIt5XQPlbiloOFesKzCJLMlsICMXcwdC0Oc347';


export function fetchBreeds() {
    return fetch(`${url1}?api_key=${key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}

export function fetchCatByBreed(breedId){
    return fetch(`${url2}?api_key=${key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}