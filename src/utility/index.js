export const excerpt = (str, count) => {
    if(str.length > count) {
        str = str.substring(0, 45) + "..."
    }
    return str
}

export const capitalize = (name) => {
    let fullName = name.split(" ")
    
    let firstName = fullName[0].toLowerCase();
    let capitalFirstName =  firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    let secondName = fullName[1].toLowerCase();
    let capitalSecondName = secondName.charAt(0).toUpperCase() + secondName.slice(1).toLowerCase()

    return capitalFirstName + " " + capitalSecondName
}