export const loadState = () => {
    try {
        const serializedStorage = localStorage.getItem('state')
        if(serializedStorage == null) {
            return undefined
        }
        return JSON.parse(serializedStorage)
    } catch (err){
        return undefined
    }
};

export const saveState = (state) => {
    try {
        const serializedStorage = JSON.stringify(state)
        localStorage.setItem('state', serializedStorage)
    } catch (err){
        // return undefined
    }
};

