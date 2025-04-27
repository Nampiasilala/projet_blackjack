package projetjava.BackendBlackjack.controller;

import projetjava.BackendBlackjack.model.Utilisateur;
import projetjava.BackendBlackjack.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping
    public Utilisateur creerUtilisateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.ajouterUtilisateur(utilisateur);
    }

    @GetMapping("/{id}")
    public Utilisateur getUtilisateurById(@PathVariable Long id) {
        return utilisateurService.getUtilisateurById(id);
    }
}
