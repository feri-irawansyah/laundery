export class GenericService {
    static async generateRandomString(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from(crypto.getRandomValues(new Uint8Array(length)))
                    .map(x => chars[x % chars.length])
                    .join('');
        }
}