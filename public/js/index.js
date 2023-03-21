const inputField = document.querySelector('#url-input')
const convertBtn = document.querySelector('#convert-btn')
const convertedUrlSpan = document.querySelector('#converted-url')

convertBtn.addEventListener('click', async (e) => {
    const url = inputField.value
    console.log(`url: ${url}`)
    const API_URL = 'http://localhost:3323/comp'
    await axios
        .post(API_URL, { url })
        // .then((res) => res)
        .then((res) => {
            console.log(`res.data: ${JSON.stringify(res.data)}`)
            if (res.data.data) {
                convertedUrlSpan.textContent = res.data.data.shortUrl
            } else {
                convertedUrlSpan.textContent = res.data.message
            }
        })
        .catch((err) => {
            console.log(`err: ${err}`)
            convertedUrlSpan.textContent = '에러입니다.'
        })
})
