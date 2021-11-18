module.exports = {
    age: function age(timestamp) {
            const today = new Date()
            const birthdate = new Date(timestamp)

            let age = today.getFullYear() - birthdate.getFullYear()
            const month = today.getMonth() - birthdate.getMonth()
            const day = today.getDate() - birthdate.getDate()

            if (month >= 0 && day >= 0) {
                return age 
            }
            else {
                return age - 1
            }
        },
    date: function date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        // console.log(`${year}-${month}-${day}`)
        return `${year}-${month}-${day}`
    }
}