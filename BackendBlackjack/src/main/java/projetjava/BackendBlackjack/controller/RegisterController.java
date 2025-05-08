package projetjava.BackendBlackjack.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projetjava.BackendBlackjack.dto.RegistrationRequest;
import projetjava.BackendBlackjack.model.StatistiquesJeu;
import projetjava.BackendBlackjack.model.Utilisateurs;
import projetjava.BackendBlackjack.service.CustomUserDetailsService;
import projetjava.BackendBlackjack.service.StatistiquesJeuService;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    private final CustomUserDetailsService regService;
    private final StatistiquesJeuService statistiquesJeuService;

    public RegisterController(CustomUserDetailsService regService, 
                            StatistiquesJeuService statistiquesJeuService) {
        this.regService = regService;
        this.statistiquesJeuService = statistiquesJeuService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegistrationRequest req) {
        try {
            // 1. Enregistrement de l'utilisateur
            Utilisateurs newUser = regService.register(req);
            
            // 2. Création des statistiques initiales
            StatistiquesJeu stats = new StatistiquesJeu();
            stats.setUtilisateur(newUser);
            // Pas besoin de set les valeurs à 0, c'est fait par défaut dans l'entité
            
            statistiquesJeuService.creerStatistiques(stats);
            
            return ResponseEntity.ok("Inscription réussie ! Statistiques créées.");
            
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError()
                                 .body("Erreur serveur: " + ex.getMessage());
        }
    }
}