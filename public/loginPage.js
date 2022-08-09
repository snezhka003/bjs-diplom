'use strict'

let userForm = new UserForm();

// let callback = (methodApi, boxMessage) => data => {methodApi(data, response => {
//         if(response.success) {
//             location.reload();
//         } else {
//             boxMessage(response.error);
//         }
//     });
// };

// userForm.loginFormCallback = callback(ApiConnector.login, userForm.setLoginErrorMessage);

// userForm.registerFormCallback = callback(ApiConnector.register, userForm.setRegisterErrorMessage);

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if(response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if(response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    });
};