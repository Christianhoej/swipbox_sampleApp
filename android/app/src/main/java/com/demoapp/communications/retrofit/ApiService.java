package com.demoapp.communications.retrofit;

/*
 * Created by Zubair Akber on 22/07/2019
 * zubair.akber@outlook.com
 */

import com.demoapp.communications.dataModels.DataModelCompartments;

import io.reactivex.Observable;
import retrofit2.http.*;

public interface ApiService {

    @Headers({
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Authorization: Basic YXRraW5zQHN3aXBib3g6OTJmNmM1NDYtMjBiMy0xMWVhLWJjYWQtMzRlNmQ3MDIxNzg1",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Content-Type: application/json",
            "Host: test.infinity.swipbox.com",
            "Postman-Token: d29bf2d7-7725-4335-9c1b-dfe3b6db6834,801a7433-35ad-46c3-9ef7-dc9a74910cd7",
            "User-Agent: PostmanRuntime/7.20.1",
            "cache-control: no-cache",
            "x-api-key: de184407-20ac-11ea-bcad-34e6d7021785"
    })
    @GET("get_atkins_compartment_tokens")
    Observable<DataModelCompartments> getCompartments(@Query("uid") String uid);
}
