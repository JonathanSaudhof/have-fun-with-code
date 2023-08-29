export const decodeBase64ToUtf8 = (str: string) => {
    const bufferFromStr = Buffer.from(str, 'base64')

    const utf8String = bufferFromStr.toString('utf8')

    const isValidUtf8 =
        Buffer.from(utf8String, 'utf8').toString('binary') ===
        bufferFromStr.toString('binary')

    if (!isValidUtf8) {
        throw new Error('is no valid utf8 string')
    }

    return utf8String
}

export const encodeUtf8ToBase64 = (str: string) => {
    return Buffer.from(str, 'utf8').toString('base64')
}
