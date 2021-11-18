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
        }
}