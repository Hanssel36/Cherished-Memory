const validateForm = (input) => {
    for (const key in input) {
        if (!input[key]) return false;
    }
    return true;
}

export {
    validateForm
}