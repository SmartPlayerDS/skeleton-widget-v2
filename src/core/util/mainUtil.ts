export const isExist = <T>(val: T): boolean => {
    return val !== undefined && val !== null
}

export const isArray = <T>(checkData: T): boolean => {
    return isExist(checkData) && Array.isArray(checkData)
}

export const isNotEmptyArray = <T>(checkData: T[]): boolean => {
    return isExist(checkData) && isArray(checkData) && checkData.length > 0
}

export const isNotEmptyString = (checkData: string): boolean => {
    return checkData !== ''
}

export const convertValueForEditorFormat = (value: any) => {
    return {
        target: {
            value
        }
    }
}

export const printError = (message: string) => {
    console.error(`ERROR: ${message}`)
}

export const spreadToList = (someData: any): any[] => {
    const arr = []

    if (isExist(someData) && isNotEmptyArray(someData)) {
        arr.push(...someData)
        return arr
    }

    arr.push(someData)
    return arr
}

export const getEnviromentOS = (): string => {
    // window, linux, android clients can rewrite to User Agent.
    if (isExist(window.DetectOS && window.DetectOS.OS)) {
        return window.DetectOS.OS
    }

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'frontend'
    }

    if (isAuthorizationUserExist() || window.location.hostname !== '') {
        return 'frontend'
    }

    return ''
}


export const isAuthorizationUserExist = (): boolean => {
    const auth = localStorage.getItem('authorization__user')
    return !!auth
}