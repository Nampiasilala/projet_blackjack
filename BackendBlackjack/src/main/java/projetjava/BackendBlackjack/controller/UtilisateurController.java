package projetjava.BackendBlackjack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import projetjava.BackendBlackjack.dto.UserCreationDTO;
import projetjava.BackendBlackjack.model.Utilisateurs;
import projetjava.BackendBlackjack.service.UtilisateursService;

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
}
