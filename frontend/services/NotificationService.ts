import { Notyf } from "notyf";

class NotificationService {
    private notification: Notyf | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.notification = new Notyf({
                duration: 60000,
                position: { x: 'center', y: 'top' },
                ripple: true,
                types: [
                    {
                        type: 'success',
                        background: '#88C8BC',
                        icon: false,
                        className: 'custom-notification',
                    },
                    {
                        type: 'error',
                       background: '#FD676A',
                        icon: false,
                        className: 'custom-notification',
                    },
                ],
            });
        }
    }

    public success(message: string): void {
        this.notification?.success(message);
    }

    public error(err: string): void {
        const message = this.extractErrorMessage(err);
        this.notification?.error(message);
    }

    private extractErrorMessage(err: unknown): string {
        if (typeof err === "string") return err;
    
        if (err && typeof err === "object") {
            const errorObj = err as { response?: { data?: string | string[] }; message?: string };
    
            if (typeof errorObj.response?.data === "string") return errorObj.response.data;
            if (Array.isArray(errorObj.response?.data)) return errorObj.response.data[0];
            if (typeof errorObj.message === "string") return errorObj.message;
        }
    
        return "Unknown error";
    }
}

const notificationService = new NotificationService();
export default notificationService;