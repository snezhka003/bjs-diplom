'use strict'

let userForm = new UserForm();

let func = (methodApi, boxMessage) => data => {methodApi(data, response => {
        if(response.success) {
            location.reload();
        } else {
            boxMessage(response.error);
        }
    });
};

userForm.loginFormCallback = func(ApiConnector.login, (data) => userForm.setLoginErrorMessage(data));

userForm.registerFormCallback = func(ApiConnector.register, (data) => userForm.setLoginErrorMessage(data));
