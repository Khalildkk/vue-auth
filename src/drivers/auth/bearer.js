export default {

    request: function (req, token) {
        console.log("bearer: " + token)
        this.drivers.http.setHeaders.call(this, req, {
            Authorization: 'Bearer ' + token
        });
    },

    response: function (res) {
        console.log("bearer: " + JSON.stringify(header))
        var headers = this.drivers.http.getHeaders.call(this, res),
            token   = headers.Authorization || headers.authorization;
            
        if (token) {
            console.log("token: " + token)
            token = token.split(/Bearer:?\s?/i);

            return token[token.length > 1 ? 1 : 0].trim();
        }
    }
};
