// package paf.backend.Security;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfiguration implements WebMvcConfigurer {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/api/**") // specify the URL pattern for which CORS should be allowed
//             .allowedOrigins("http://localhost:3000") // specify the allowed origin(s), use "*" to allow from any origin
//             .allowedMethods("GET", "POST", "PUT", "DELETE") // specify the allowed HTTP methods
//             .allowedHeaders("*"); // specify the allowed headers, use "*" to allow any headers
//     }
// }