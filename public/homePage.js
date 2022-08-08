'use strict'

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();

let callback = method => response => {if(response.success) method(response.data)};

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if(response.success) {
            location.reload();
        }
    });
};

ApiConnector.current(callback(ProfileWidget.showProfile));

let getRates = () => {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
};

getRates();
setInterval(getRates, 60000);

let updateFavorites = data => {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(data);
    moneyManager.updateUsersList(data);
}

let func = (getFunc, boxMessage, methodApi, textMessage) => data => methodApi(data, response => {
    if(response.success) {
        getFunc(response.data);
        boxMessage.setMessage(response.success, textMessage);
    } else {
        boxMessage.setMessage(response.success, response.error);
    }
});

moneyManager.addMoneyCallback = func(ProfileWidget.showProfile, moneyManager, ApiConnector.addMoney, "Баланс успешно пополнен!");

moneyManager.conversionMoneyCallback = func(ProfileWidget.showProfile, moneyManager, ApiConnector.convertMoney, "Конвертация успешно выполнена!");

moneyManager.sendMoneyCallback = func(ProfileWidget.showProfile, moneyManager, ApiConnector.transferMoney, "Перевод успешно выполнен!");

ApiConnector.getFavorites(callback(updateFavorites));

favoritesWidget.addUserCallback = func(updateFavorites, favoritesWidget, ApiConnector.addUserToFavorites, "Пользователь успешно добавлен!");

favoritesWidget.removeUserCallback = func(updateFavorites, favoritesWidget, ApiConnector.removeUserFromFavorites, "Пользователь удален!");

// НИЖЕ ИЗНАЧАЛЬНЫЙ ВАРИАНТ, ЕЩЕ НЕ СОКРАЩЕННЫЙ (сохранила на всякий случай)
// ApiConnector.current(response => {
//     if(response.success) {
//         ProfileWidget.showProfile(response.data);
//     }
// });

// moneyManager.addMoneyCallback = data => {
//     ApiConnector.addMoney(data, response => {
//         if(response.success) {
//             ProfileWidget.showProfile(response.data);
//             moneyManager.setMessage(response.success, "Баланс успешно пополнен!");
//         } else {
//             moneyManager.setMessage(response.success, response.error);
//         }
//     });
// };

// moneyManager.conversionMoneyCallback = data => {
//     ApiConnector.convertMoney(data, response => {
//         if(response.success) {
//             ProfileWidget.showProfile(response.data);
//             moneyManager.setMessage(response.success, "Конвертация успешно выполнена!");
//         } else {
//             moneyManager.setMessage(response.success, response.error);
//         }
//     });
// };

// moneyManager.sendMoneyCallback = data => {
//     ApiConnector.transferMoney(data, response => {
//         if(response.success) {
//             ProfileWidget.showProfile(response.data);
//             moneyManager.setMessage(response.success, "Перевод успешно выполнен!");
//         } else {
//             moneyManager.setMessage(response.success, response.error);
//         }
//     });
// };

// ApiConnector.getFavorites(response => {
//     if(response.success) {
//         favoritesWidget.clearTable();
//         favoritesWidget.fillTable(response.data);
//         moneyManager.updateUsersList(response.data);
//     }
// });
// ИЛИ
// ApiConnector.getFavorites(response => {
//     if(response.success) {
//         updateFavorites(response.data);
//     }
// });

// favoritesWidget.addUserCallback = data => {
//     ApiConnector.addUserToFavorites(data, response => {
//         if(response.success) {
//             favoritesWidget.clearTable();
//             favoritesWidget.fillTable(response.data);
//             moneyManager.updateUsersList(response.data);
//             favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен!");
//         } else {
//             favoritesWidget.setMessage(response.success, response.error);
//         }
//     });
// };

// favoritesWidget.removeUserCallback = data => {
//     ApiConnector.removeUserFromFavorites(data, response => {
//         if(response.success) {
//             favoritesWidget.clearTable();
//             favoritesWidget.fillTable(response.data);
//             moneyManager.updateUsersList(response.data);
//             favoritesWidget.setMessage(response.success, "Пользователь удален!");
//         } else {
//             favoritesWidget.setMessage(response.success, response.error);
//         }
//     });
// };