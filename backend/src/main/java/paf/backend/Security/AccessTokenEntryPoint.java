package paf.backend.Security;

import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Log4j2
public class AccessTokenEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
                log.error("unauthorized", authException);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}

// THis is an unauthorized error handler that will send an unauthorized response to the client when the authorization fails