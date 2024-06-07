export const regex = {
    EMAIL:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    WORD: /^[a-zA-Z ]{0,100}$/,
    NUMBER: /^\d*[1-9]\d*$/,
    PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    ONEUPPERCASE: /[A-Z]/,
    ONELOWERCASE: /[a-z]/,
    ONESPECIALCHAR: /[!@#$%^&*]/,
    ONENUMERIC: /[0-9]/,
    URL:/(((https?:\/\/)|(www\.))[^\s]+)/g,
  };