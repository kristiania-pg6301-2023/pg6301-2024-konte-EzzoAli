module.exports = {
    // MongoDB URI
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/news-appDB',

    // JWT secret key
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',

    // Port for the server to listen on
    port: process.env.PORT || 3000,

    // OpenID's configuration for Google
    googleOpenIDIssuer: process.env.GOOGLE_OPENID_ISSUER || 'https://accounts.google.com',
    googleOpenIDClientId: process.env.GOOGLE_OPENID_CLIENT_ID || '643300562607-l1jkv8uqu24l940uti3e3j1l5adkqk0i.apps.googleusercontent.com',
    googleOpenIDClientSecret: process.env.GOOGLE_OPENID_CLIENT_SECRET || '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',
    googleOpenIDRedirectUri: process.env.GOOGLE_OPENID_REDIRECT_URI || 'http://localhost:3000',

    // OpenID's configuration for GitHub
    githubOpenIDIssuer: process.env.GITHUB_OPENID_ISSUER || 'https://github.com',
    githubOpenIDClientId: process.env.GITHUB_OPENID_CLIENT_ID || 'd869423645482f8c0fa2',
    githubOpenIDClientSecret: process.env.GITHUB_OPENID_CLIENT_SECRET || 'e27fc76a0b523403943ce2600aa62d2cf303da44',
    githubOpenIDRedirectUri: process.env.GITHUB_OPENID_REDIRECT_URI || 'http://localhost:3000'

};
