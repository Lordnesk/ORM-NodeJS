"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const server_1 = require("../server");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: server_1.sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
});
server_1.sequelize
    .sync()
    .then(() => {
    console.log("La tabla de usuarios ha sido sincronizada.");
})
    .catch((error) => {
    console.error("Error al sincronizar la tabla de usuarios:", error);
});
