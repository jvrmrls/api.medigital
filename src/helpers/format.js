export const getInitialsFromName = (firstName, lastName) => {
    return firstName.charAt(0) + lastName.charAt(0)
}

export const getShortName = (firstName, lastName) => {
    return firstName.split(' ')[0] + ' ' + lastName.split(' ')[0]
}