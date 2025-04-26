package projetjava.BackendBlackjack.controller;

import projetjava.BackendBlackjack.model.StatistiquesJeu;
import projetjava.BackendBlackjack.service.StatistiquesJeuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/statistiques")
@CrossOrigin(origins = "http://localhost:5173") // Adapter si ton front est ailleurs
public class StatistiquesJeuController {

    @Autowired
    private StatistiquesJeuService statistiquesJeuService;

    // ➔ Créer de nouvelles statistiques
    @PostMapping
    public StatistiquesJeu creerStatistiques(@RequestBody StatistiquesJeu statistiquesJeu) {
        return statistiquesJeuService.creerStatistiques(statistiquesJeu);
    }

    // ➔ Récupérer les statistiques par utilisateurId
    @GetMapping("/{utilisateurId}")
    public Optional<StatistiquesJeu> getStatistiques(@PathVariable Long utilisateurId) {
        return statistiquesJeuService.getStatistiquesParUtilisateurId(utilisateurId);
    }

    // ➔ Mettre à jour les statistiques
    @PutMapping
    public StatistiquesJeu updateStatistiques(@RequestBody StatistiquesJeu statistiquesJeu) {
        return statistiquesJeuService.updateStatistiques(statistiquesJeu);
    }

    // ➔ Supprimer des statistiques
    @DeleteMapping("/{id}")
    public void deleteStatistiques(@PathVariable Long id) {
        statistiquesJeuService.deleteStatistiques(id);
    }
}
