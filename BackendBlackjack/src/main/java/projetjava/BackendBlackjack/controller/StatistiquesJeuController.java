package projetjava.BackendBlackjack.controller;

import projetjava.BackendBlackjack.model.StatistiquesJeu;
import projetjava.BackendBlackjack.model.Utilisateurs;
import projetjava.BackendBlackjack.service.StatistiquesJeuService;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        // Vérifier si l'utilisateur existe
        Optional<Utilisateurs> utilisateurOpt = utilisateurRepository.findById(statistiquesJeu.getUtilisateur().getId());
        if (utilisateurOpt.isPresent()) {
            statistiquesJeu.setUtilisateur(utilisateurOpt.get());
            return statistiquesJeuService.creerStatistiques(statistiquesJeu);
        }
        throw new RuntimeException("Utilisateur non trouvé");
    }

    @PutMapping
public StatistiquesJeu updateStatistiques(@RequestBody StatistiquesJeu stats) {
    // Vérification de l'utilisateur
    Optional<Utilisateurs> user = utilisateurRepository.findById(stats.getUtilisateur().getId());
    if (!user.isPresent()) {
        throw new RuntimeException("Utilisateur non trouvé");
    }
    
    // Mise à jour des stats
    return statistiquesJeuService.updateStatistiques(stats);
}

    @DeleteMapping("/{id}")
    public void deleteStatistiques(@PathVariable Long id) {
        statistiquesJeuService.deleteStatistiques(id);
    }

    @GetMapping("/{id}")
    public StatistiquesJeu getStatistiquesParUtilisateur(@PathVariable Long id) {
        return statistiquesJeuService.getStatistiquesParUtilisateurId(id)
                .orElseThrow(() -> new RuntimeException("Statistiques non trouvées pour l'utilisateur " + id));
    }    

}
