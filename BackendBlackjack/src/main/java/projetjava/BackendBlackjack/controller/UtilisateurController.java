package projetjava.BackendBlackjack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import projetjava.BackendBlackjack.dto.UserCreationDTO;
import projetjava.BackendBlackjack.model.Utilisateurs;
import projetjava.BackendBlackjack.service.UtilisateursService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "http://localhost:5173")
public class UtilisateurController {

    private final UtilisateursService utilisateursService;

    public UtilisateurController(UtilisateursService utilisateursService) {
        this.utilisateursService = utilisateursService;
    }

    @PostMapping
    public ResponseEntity<Utilisateurs> creerUtilisateur(
            @Valid @RequestBody UserCreationDTO userDTO) {
        Utilisateurs nouvelUtilisateur = utilisateursService.ajouterUtilisateur(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouvelUtilisateur);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateurs> getUtilisateurById(@PathVariable Long id) {
        Utilisateurs utilisateur = utilisateursService.getUtilisateurById(id);
        return ResponseEntity.ok(utilisateur);
    }

    @GetMapping
    public ResponseEntity<List<Utilisateurs>> getAllUtilisateurs() {
        List<Utilisateurs> utilisateurs = utilisateursService.getAllUtilisateurs();
        return ResponseEntity.ok(utilisateurs);
    }

    @PutMapping("/{id}/balance")
    public ResponseEntity<Utilisateurs> updateUserBalance(
            @PathVariable Long id,
            @RequestBody Map<String, Double> balanceMap) {

        Double newBalance = balanceMap.get("balance");
        if (newBalance == null) {
            return ResponseEntity.badRequest().build();
        }

        Utilisateurs utilisateur = utilisateursService.updateUserBalance(id, newBalance);
        return ResponseEntity.ok(utilisateur);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerUtilisateur(@PathVariable Long id) {
        utilisateursService.supprimerUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}
