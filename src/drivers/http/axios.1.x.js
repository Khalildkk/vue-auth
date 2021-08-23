export default {

    init: function () {
        console.log("http 1")
        if ( ! this.plugins.http) {
            return 'drivers/http/axios.js: http plugin has not been set.'
        }
    },

    interceptor: function (req, res) {
        console.log("http 2")
        var _this = this;

        if (req) {
            this.plugins.http.interceptors.request.use(function (request) {
                req.call(_this, request);
                
                return request;
            }, function (error) {
                req.call(_this, error.request);
            
                return Promise.reject(error);
            });
        }

        if (res) {
            this.plugins.http.interceptors.response.use(function (response) {
                res.call(_this, response);
        
                return response;
            }, function (error) {
                if (error && error.response) {
                    res.call(_this, error.response);
                }

                return Promise.reject(error);
            });
        }
    },

    invalidToken: function (res) {
        console.log("http 3")
        if (res.status === 401) {
            return true;
        }
    },

    httpData: function (res) {
        console.log("http data: " + res.data)
        return res.data || {};
    },

    http: function (data) {
        return this.plugins.http(data);
    },

    getHeaders: function (res) {
        console.log("http getHeader: " + res.headers)
        return res.headers;
    },

    setHeaders: function (req, headers) {
        console.log("http setHeaders")
        req.headers.common = Object.assign({}, req.headers.common, headers);
    }
}
