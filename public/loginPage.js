'use strict'

let userForm = new UserForm();

let callback = methodApi => data => {methodApi(data, response => {
        if(response.success) {
            location.reload();
        } else {
            alert(response.error);
        }
    });
};

userForm.loginFormCallback = callback(ApiConnector.login);

userForm.registerFormCallback = callback(ApiConnector.register);

// НИЖЕ ИЗНАЧАЛЬНАЯ ВЕРСИЯ, ЕЩЕ НЕ СОКРАЩЕННАЯ (оставила на всякий случай)
// userForm.loginFormCallback = data => {
//     ApiConnector.login(data, response => {
//         if(response.success) {
//             location.reload();
//         } else {
//             alert(response.error);
//         }
//     });
// };

// userForm.registerFormCallback = data => {
//     ApiConnector.register(data, response => {
//         if(response.success) {
//             location.reload();
//         } else {
//             alert(response.error);
//         }
//     });
// };