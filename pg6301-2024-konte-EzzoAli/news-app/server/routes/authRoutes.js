// authRoutes.js

// Import dependencies
import express from "express";

import {Issuer} from "openid-client";

import config from "../config";
// Create router
const router = express.Router();

// Initialize OpenID client
let client;
Issuer.discover(config.googleOpenIDIssuer) // Discover OpenID configuration
    .then((issuer) => {
        client = new issuer.Client({
            client_id: config.googleOpenIDClientId,
            client_secret: config.googleOpenIDClientSecret,
            redirect_uris: [config.googleOpenIDRedirectUri],
        });
    })
    .catch((err) => {
        console.error("Error initializing OpenID client:", err);
    });

// Route: POST /api/auth/login
// Description: Authenticate user using OpenID (Google)
router.post('/login', async (req, res) => {
    try {
        if (!client) {
            return res.status(500).json({ error: 'OpenID client not initialized' });
        }


        const authUrl = client.authorizationUrl({
            redirect_uri: config.googleOpenIDRedirectUri,
            scope: 'openid profile email', // Requested scopes
            response_type: 'code',
        });

        res.redirect(authUrl);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
