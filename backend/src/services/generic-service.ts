export class GenericService {
    static async generateRandomString(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from(crypto.getRandomValues(new Uint8Array(length)))
                    .map(x => chars[x % chars.length])
                    .join('');
    }

    static async getLayanan(): Promise<{ id: number, name: string }> {

        const data: any = [
            {
                id: 1,
                name: 'Daily Kiloan'
            },
            {
                id: 2,
                name: 'Cuci & Setrika'
            },
            {
                id: 3,
                name: 'Laundry Karpet'
            },
            {
                id: 4,
                name: 'Laundry Bed Cover'
            },
            {
                id: 5,
                name: 'Setrika'
            },
            {
                id: 6,
                name: 'Express'
            }
        ]

        const response = data;
        return response
    }
}