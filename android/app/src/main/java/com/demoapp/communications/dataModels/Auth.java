
package com.demoapp.communications.dataModels;

import com.google.gson.annotations.Expose;

@SuppressWarnings("unused")
public class Auth {

    @Expose
    private String challenge;
    @Expose
    private String response;

    public String getChallenge() {
        return challenge;
    }

    public void setChallenge(String challenge) {
        this.challenge = challenge;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

}
