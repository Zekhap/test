import { AuthService } from '../services';

export function appInitializer(authService: AuthService) {
    return () => new Promise(resolve => {
        // Refresh token on startup
        authService.refreshToken().subscribe().add(resolve);
    });
}