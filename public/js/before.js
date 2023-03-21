const testSubmit = (token) => {
    console.log(`token: ${token}`)
    const result = grecaptcha.getResponse()
    console.log(`result: ${result}`)
}
