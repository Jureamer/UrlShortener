const inputField = document.querySelector('#url-input')
const convertBtn = document.querySelector('#convert-btn')
const convertedUrl = document.querySelector('#converted-url')
const expirationDate = document.querySelector('#expiration-date')
const copyBtn = document.querySelector('#copy-btn')

const SERVER_HOST = 'shortener.shop'
const COMP_API_URL = `${SERVER_HOST}/comp`
const EXPIRATION_INFORM = '(생성된 URL은 30일간 유효합니다.)'

let convertedUrlData = ''

convertBtn.addEventListener('click', async (e) => {
    const url = inputField.value
    const token = grecaptcha.getResponse()

    if (!token) alert('로봇이 아닙니다를 먼저 체크 해주시기 바랍니다.')

    await axios
        .post(COMP_API_URL, { url, token })
        .then((res) => {
            if (res.data.data) {
                // 복사 값 저장
                convertedUrlData = res.data.data.shortUrl

                convertedUrl.textContent = `변환된 URL:  ${res.data.data.shortUrl}`
                expirationDate.textContent = `만료일: ${res.data.data.expirationAt} ${EXPIRATION_INFORM}`
                convertedUrl.classList.remove('hide')
                expirationDate.classList.remove('hide')
                // copy 버튼 추가
                convertedUrl.appendChild(copyBtn)
            } else {
                convertedUrl.textContent = res.data.message
            }
            grecaptcha.reset()
        })
        .catch((err) => {
            console.log(`err: ${err}`)
            convertedUrl.textContent = '에러입니다.'
            convertedUrl.classList.remove('hide')
            grecaptcha.reset()
        })
})

copyBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.navigator.clipboard.writeText(convertedUrlData).then(() => alert('복사되었습니다, 감사합니다.'))
})
