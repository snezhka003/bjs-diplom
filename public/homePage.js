'use strict'

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();

let callback = method => response => {
    if(response.success) {
        method(response.data);
    }
};

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