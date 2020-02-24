
package com.demoapp.communications.dataModels;

import com.google.gson.annotations.Expose;

@SuppressWarnings("unused")
public class DataModelCompartments {

    @Expose
    private Data data;
    @Expose
    private Errors errors;
    @Expose
    private Headers headers;

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public Errors getErrors() {
        return errors;
    }

    public void setErrors(Errors errors) {
        this.errors = errors;
    }

    public Headers getHeaders() {
        return headers;
    }

    public void setHeaders(Headers headers) {
        this.headers = headers;
    }

}
