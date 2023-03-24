export const getOneMonthAfterBasedCurrentDate = (): string => {
    let date = new Date()
    date.setDate(date.getMonth() + 1)
    return date.toISOString().slice(0, 19).replace('T', ' ')
}

export const getRandomId = (length: number): string => {
    const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let randomId = ''
    while (randomId.length < length) {
        const num = Math.round(Math.random() * 61)
        randomId += BASE62[num]
    }

    return randomId
}

export const convertYYYYMMDD = (date: Date | String): string => {
    console.log(`typeof date: ${typeof date}, date: ${date} date instanceof Date: ${date instanceof Date}`)
    if (date instanceof Date) {
        return date.toLocaleDateString('ko')
    } else {
        return date.slice(0, 10)
    }
}
