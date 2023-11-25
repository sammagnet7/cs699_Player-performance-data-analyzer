/**
 * Package declaration with a clear domain indication
 */
package iitb.cs699.playerStatAnalyser;

/**
 * Import necessary classes from the Spring Boot framework
 */
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Main class annotated as a Spring Boot application
 */
@EnableTransactionManagement
@SpringBootApplication
public class PlayerStatAnalyserApplication {

    /**
     * Main method as the entry point for the Spring Boot application
     * @param args Command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(PlayerStatAnalyserApplication.class, args);
    }

    /**
     * CORS configuration bean method
     * @return WebMvcConfigurer instance for CORS configuration
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            /**
             * Configure CORS allowing all origins
             * @param registry CORS registry for mapping and allowed origins
             */
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }

}
