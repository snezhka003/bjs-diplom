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

// НИЖЕ ИЗНАЧАЛЬНЫЙ ВАРИАНТ, ЕЩЕ НЕ СОКРАЩЕННЫЙ (сохранила на всякий случай)

// userForm.loginFormCallback = data => {
//     ApiConnector.login(data, response => {
//         if(response.success) {
//             location.reload();
//         } else {
//             userForm.setLoginErrorMessage(response.error);
//         }
//     });
// };

// userForm.registerFormCallback = data => {
//     ApiConnector.register(data, response => {
//         if(response.success) {
//             location.reload();
//         } else {
//             userForm.setRegisterErrorMessage(response.error);
//         }
//     });
// };