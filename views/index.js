const inputField = document.querySelector('#url-input')
const convertBtn = document.querySelector('#convert-btn')
const convertedUrlSpan = document.querySelector('#converted-url')

convertBtn.addEventListener('click', (e) => {
    console.log('click!!!')
    const url = inputField.value
    const convertedUrl = encodeURI(url)
    convertedUrlSpan.textContent = convertedUrl
})
