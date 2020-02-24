
package com.demoapp.communications.dataModels;

import com.google.gson.annotations.SerializedName;

@SuppressWarnings("unused")
public class Headers {

    @SerializedName("Access-Control-Allow-Origin")
    private String accessControlAllowOrigin;
    @SerializedName("X-Requested-With")
    private String xRequestedWith;

    public String getAccessControlAllowOrigin() {
        return accessControlAllowOrigin;
    }

    public void setAccessControlAllowOrigin(String accessControlAllowOrigin) {
        this.accessControlAllowOrigin = accessControlAllowOrigin;
    }

    public String getXRequestedWith() {
        return xRequestedWith;
    }

    public void setXRequestedWith(String xRequestedWith) {
        this.xRequestedWith = xRequestedWith;
    }

}
