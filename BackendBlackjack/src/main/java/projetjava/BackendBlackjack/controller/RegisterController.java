package projetjava.BackendBlackjack.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projetjava.BackendBlackjack.dto.RegistrationRequest;
import projetjava.BackendBlackjack.service.CustomUserDetailsService;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    private final CustomUserDetailsService regService;

    public RegisterController(CustomUserDetailsService regService) {
        this.regService = regService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegistrationRequest req) {
        try {
            regService.register(req);
            return ResponseEntity.ok("Inscription réussie !");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(500)
                                 .body("Erreur serveur, réessayez plus tard.");
        }
    }
}
