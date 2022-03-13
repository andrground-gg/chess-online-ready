import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    login(session: Record<string, any>): any;
    logout(req: any): any;
    getAuthSessions(session: Record<string, any>): any;
}
