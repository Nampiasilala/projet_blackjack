package projetjava.BackendBlackjack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import projetjava.BackendBlackjack.dto.UserCreationDTO;
import projetjava.BackendBlackjack.model.Utilisateur;
import projetjava.BackendBlackjack.service.UtilisateurService;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping
    public ResponseEntity<Utilisateur> creerUtilisateur(
            @Valid @RequestBody UserCreationDTO userDTO) {
        Utilisateur nouvelUtilisateur = utilisateurService.ajouterUtilisateur(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouvelUtilisateur);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
        return ResponseEntity.ok(utilisateur);
    }
}