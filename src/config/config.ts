const dev = {
    SERVER_URL: process.env.REACT_APP_API_URL || ''
}

const prod = {
    SERVER_URL: process.env.REACT_APP_API_URL || ''
}

export const config = process.env.NODE_ENV === 'production' ? prod : dev;