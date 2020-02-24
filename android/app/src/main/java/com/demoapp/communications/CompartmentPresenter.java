package com.demoapp.communications;

/*
 * Created by Zubair Akber on 22/07/2019
 * zubair.akber@outlook.com
 */

import com.demoapp.communications.dataModels.DataModelCompartments;
import com.demoapp.communications.retrofit.ApiClient;
import com.demoapp.communications.retrofit.ApiService;

import io.reactivex.Observable;
import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;

public class CompartmentPresenter {

    private CompartmentInterface compartmentInterface;

    public CompartmentPresenter(CompartmentInterface compartmentInterface) {
        this.compartmentInterface = compartmentInterface;
    }

    public void getCompartments(String uid) {

        Observable<DataModelCompartments> observable = ApiClient.getRetrofitClient().create(ApiService.class).getCompartments(uid);

        observable
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe(new Observer<DataModelCompartments>() {
                    @Override
                    public void onSubscribe(Disposable d) {

                    }

                    @Override
                    public void onNext(DataModelCompartments dataModelCompartments) {
                        compartmentInterface.onDataAvailable(dataModelCompartments);
                    }

                    @Override
                    public void onError(Throwable e) {
                        compartmentInterface.onError();
                    }

                    @Override
                    public void onComplete() {

                    }
                });


    }
}
