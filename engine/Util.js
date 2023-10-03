;(function() {

    const delayCollection = {}
    const uids = []
    const Util = {}

    Util.delay = function delay (name, timeoff = 0) {
        if (!delayCollection[name]) {
            delayCollection[name] = Date.now()
            return true
        }

        if(delayCollection[name] + timeoff > Date.now()) {
            return false
        }
        delayCollection[name] = Date.now()

        return true
    }

    Util.generateUid = function generateUid (size = 10) {
        let uid = getRandomString()

         while (uids.includes(uid)) {
            uid = getRandomString()
         }
         return uid
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Util = Util

    const alphabet = 'qwerrtyahsgdfvzbxncmjiuk12345678939487hstdjkufjdtzthf545w6765'
    function getRandomLetter () {
        return alphabet[Math.floor(Math.random() * alphabet.length)] 
    }

    function getRandomString (size = 10) {
        let str = ''

        while (str.length < size) {
            str += getRandomLetter()
        }
        return str
    }
})();