export default {

    request: function (req, token) {
        console.log("FUNCTION: request");
        this.drivers.http.setHeaders.call(this, req, {
            Authorization: 'Bearer ' + token
        });
        
        console.log("AFTER drivers.http.setHeaders, token="+token)
    },

    response: function (res) {
        console.log("FUNCTION: response");
        var headers = this.drivers.http.getHeaders.call(this, res),
            token   = headers.Authorization || headers.authorization;
        
        console.log(headers);
        
        if (token) {
            token = token.split(/Bearer:?\s?/i);
            
            return token[token.length > 1 ? 1 : 0].trim();
        }
    }
};
