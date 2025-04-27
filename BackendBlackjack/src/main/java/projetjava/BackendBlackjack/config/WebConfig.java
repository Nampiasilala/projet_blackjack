package projetjava.BackendBlackjack.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")  // Autorise CORS sur toutes les routes
            .allowedOrigins("http://localhost:5173")  // Autorise les requêtes de ton frontend
            .allowedMethods("GET", "POST", "PUT", "DELETE")  // Autorise les méthodes HTTP
            .allowedHeaders("*")  // Autorise tous les en-têtes
            .allowCredentials(true);  // Autorise les cookies si nécessaire
    }
}
