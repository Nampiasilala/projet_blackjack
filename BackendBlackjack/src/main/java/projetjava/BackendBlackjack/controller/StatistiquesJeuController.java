package projetjava.BackendBlackjack.controller;

import projetjava.BackendBlackjack.model.StatistiquesJeu;
import projetjava.BackendBlackjack.model.Utilisateurs;
import projetjava.BackendBlackjack.service.StatistiquesJeuService;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api/statistiques")
@CrossOrigin(origins = "http://localhost:5173")
public class StatistiquesJeuController {

    @Autowired
    private StatistiquesJeuService statistiquesJeuService;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @PostMapping
    public StatistiquesJeu creerStatistiques(@RequestBody StatistiquesJeu statistiquesJeu) {
        Optional<Utilisateurs> utilisateurOpt = utilisateurRepository
                .findById(statistiquesJeu.getUtilisateur().getId());
        if (utilisateurOpt.isPresent()) {
            statistiquesJeu.setUtilisateur(utilisateurOpt.get());
            return statistiquesJeuService.creerStatistiques(statistiquesJeu);
        }
        throw new RuntimeException("Utilisateur non trouvé");
    }

    @PutMapping("/{userId}")
    public ResponseEntity<StatistiquesJeu> updateStatistiques(
            @PathVariable Long userId,
            @RequestBody StatistiquesJeu newStats) {

        // 1. Vérifier que l'utilisateur existe
        Utilisateurs user = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));

        // 2. Récupérer ou créer les stats
        StatistiquesJeu existingStats = statistiquesJeuService
                .getStatistiquesParUtilisateurId(userId)
                .orElse(new StatistiquesJeu());

        // 3. Mettre à jour TOUS les champs sans exception
        existingStats.setPartiesJouees(newStats.getPartiesJouees());
        existingStats.setPartiesGagnees(newStats.getPartiesGagnees());
        existingStats.setPartiesPerdues(newStats.getPartiesPerdues());
        existingStats.setJetonsGagnes(newStats.getJetonsGagnes());
        existingStats.setMeilleureSerieVictoires(newStats.getMeilleureSerieVictoires());

        // 4. Toujours maintenir la relation utilisateur
        existingStats.setUtilisateur(user);

        // 5. Sauvegarder
        StatistiquesJeu updatedStats = statistiquesJeuService.updateStatistiques(existingStats);

        return ResponseEntity.ok(updatedStats);
    }

    @DeleteMapping("/{id}")
    public void deleteStatistiques(@PathVariable Long id) {
        statistiquesJeuService.deleteStatistiques(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatistiquesJeu> getStatsByUserId(@PathVariable Long id) {
        StatistiquesJeu stats = statistiquesJeuService.getStatistiquesParUtilisateurId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Statistiques non trouvées pour l'utilisateur : " + id));
        return ResponseEntity.ok(stats);
    }
}
