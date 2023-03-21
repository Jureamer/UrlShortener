const inputField = document.querySelector('#url-input')
const convertBtn = document.querySelector('#convert-btn')
const convertedUrlSpan = document.querySelector('#converted-url')

convertBtn.addEventListener('click', async (e) => {
    const url = inputField.value
    const API_URL = 'http://localhost:3323/comp'
    const token = grecaptcha.getResponse()

    console.log(`token: ${token}`)

    if (!token) alert('로봇이 아닙니다를 먼저 체크 해주시기 바랍니다.')
    await axios
        .post(API_URL, { url, token })
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
