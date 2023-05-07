package paf.backend.Security;

//defines the security configuration for the server
import paf.backend.Service.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity

public class WebSecurityConfig {
    @Autowired
    private CustomUserDetailsService userService;
    @Autowired
    private AccessTokenEntryPoint accessTokenEntryPoint;

    @Bean
    public AccessTokenFilter accessTokenFilter() {
        return new AccessTokenFilter();
    }

    // @Bean
    // protected AuthenticationManager authenticationManager() throws Exception {
    // return authenticationManager();
    // }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
                .passwordEncoder(passwordEncoder());
    }

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http.csrf().disable()
    //             .exceptionHandling().authenticationEntryPoint(accessTokenEntryPoint).and()
    //             .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
    //             .authorizeHttpRequests()
    //             // .requestMatchers("/api/reviews/welcome").authenticated()
    //             // .requestMatchers("/api/login/loginUser").authenticated()
    //             .requestMatchers("/api/login/**").permitAll()
    //             .anyRequest().authenticated()
    //             .and()
    //             .httpBasic()
    //             .and().formLogin();

    //     http.addFilterBefore(accessTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    //     return http.build();
    // }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http,
                                            AuthenticationManagerBuilder auth,
                                            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        // // set the authentication provider
        // auth.authenticationProvider(daoAuthenticationProvider());

        // set the authorization and authentication rules
        http.csrf().disable()
                .exceptionHandling().authenticationEntryPoint(accessTokenEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests()
                .requestMatchers("/api/login/**").permitAll()
                .requestMatchers("/api/users/**").permitAll()
                .requestMatchers("/api/user/**").permitAll()
                .requestMatchers("/api/reviews/**").permitAll()
                .requestMatchers("/api/comment/**").permitAll()
                .requestMatchers("/api/notification/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and().formLogin();

        http.addFilterBefore(accessTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
}
}
