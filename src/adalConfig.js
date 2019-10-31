import { AuthenticationContext, adalFetch } from "react-adal";

export const adalConfig = {
    instance: "https://login.microsoftonline.com/",
    clientId: "896ec286-dba5-48da-9f58-4855dfaea7ad",
    extraQueryParameter: "nux=1",
    endpoints: {
        graphApi: "https://graph.microsoft.com"
    },
    postLogoutRedirectUri: window.location.origin,
    redirectUrl: window.location.origin,
    cacheLocation: "localStorage"
};

export const getGraphToken = () => {
    return authContext.getCachedToken("https://graph.microsoft.com");
};

export const acquireGraphToken = () => {
    authContext.acquireToken(adalConfig.endpoints.graphApi, (message, token, msg) => {
        console.log("token", token);
        return token;
    });

    return null;
};

export const authContext = new AuthenticationContext(adalConfig);
