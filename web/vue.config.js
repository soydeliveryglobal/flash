/*
    Configuraciones de ambientes
*/

const dev = {
    apiUrl: "https://soydelivery.com.uy​/rest/",
    mercadoPagoUrl: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js',
    marcadoPagoKey: 'TEST-002c9bbc-80af-4dea-91b0-2ab582a97c34',    
    apiPago: 'http://localhost:8000',
    routerMode: false,
    publicPath: "/",
    backend: false
};

/*
    🔬 Test
*/
const test = {
    apiUrl: "https://soydelivery.com.uy​/rest/",
    mercadoPagoUrl: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js',
    marcadoPagoKey: 'TEST-002c9bbc-80af-4dea-91b0-2ab582a97c34',    
    apiPago: 'https://soydeliverytest.us-south.cf.appdomain.cloud', //'https://54.237.69.186:3000',
    routerMode: false,
    publicPath: "/",
    backend: false
};

/*
    🎬 Producción
*/
const prod = {
    apiUrl: "https://soydelivery.com.uy​/rest/",
    mercadoPagoUrl: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js',
    marcadoPagoKey: 'APP_USR-d8c81883-e963-4017-9362-95d27882c1a0',    
    apiPago: 'https://soydeliveryprod.us-south.cf.appdomain.cloud',
    routerMode: false,
    publicPath: "/",
    backend: false
}

/*
    Versión
*/
process.env.VUE_APP_VERSION = require("./package.json").version;
const webpack = require("webpack")

/*
    Declaración de ambiente
*/
const env = require("./package.json").env
const amb = env === "test"
        ? test
        : env === "dev" ? dev: prod;

module.exports = {
    publicPath: amb.publicPath,
    productionSourceMap: false,
        chainWebpack: config => {
        config.module.rule('pdf')
        .test(/\.(pdf)(\?.*)?$/)
        .use('file-loader')
            .loader('file-loader')
            .options({
            name: 'assets/pdf/[name].[hash:8].[ext]'
            })

    },

    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    API_URL: JSON.stringify(amb.apiUrl),
                    MERCADO_PAGO_URL: JSON.stringify(amb.mercadoPagoUrl),
                    MERCADO_PAGO_KEY: JSON.stringify(amb.marcadoPagoKey),
                    API_URL_MERCADO: JSON.stringify(amb.apiPago),
                    ROUTER_MODE: amb.routerMode,
                    BACKEND: amb.backend,

                }
            })
        ],
    }
};
