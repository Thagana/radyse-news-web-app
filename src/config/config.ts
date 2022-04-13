const dev = {
    SERVER_URL: ''
}

const prod = {
    SERVER_URL: ''
}

export const config = process.env.NODE_ENV === 'production' ? prod : dev;