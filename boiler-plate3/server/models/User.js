'use strict';

module.exports = function(sequelize, DataTypes){
    const user = sequelize.define("User2",{
        userID:{
            field: "email",
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password: {
            field: "password",
            type: DataTypes.STRING(255),
            allowNull:false
        },
        salt:{
            field:"salt",
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name:{
            field:"name",
            type: DataTypes.STRING(30),
            allowNull: false
        },
        image_profile:{
            filed:"image_profile",
            type: DataTypes.STRING(255)
        }
    }, {
        underscored: true,
        freezeTalbeName:true,
        tableName: "users"
    });

    return user;
}