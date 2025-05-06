package projetjava.BackendBlackjack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projetjava.BackendBlackjack.model.StatistiquesJeu;
import projetjava.BackendBlackjack.repository.StatistiquesJeuRepository;

import java.util.Optional;

@Service
public class StatistiquesJeuService {

    @Autowired
    private StatistiquesJeuRepository statistiquesJeuRepository;

    // Méthode pour créer des statistiques
    public StatistiquesJeu creerStatistiques(StatistiquesJeu statistiquesJeu) {
        return statistiquesJeuRepository.save(statistiquesJeu);
    }

    // Méthode pour mettre à jour des statistiques
    public StatistiquesJeu updateStatistiques(StatistiquesJeu statistiquesJeu) {
        return statistiquesJeuRepository.save(statistiquesJeu);
    }

    // Méthode pour supprimer des statistiques par ID
    public void deleteStatistiques(Long id) {
        statistiquesJeuRepository.deleteById(id);
    }

    // Méthode pour récupérer les statistiques d'un utilisateur par ID
    public Optional<StatistiquesJeu> getStatistiquesParUtilisateurId(Long id) {
        return statistiquesJeuRepository.findByUtilisateurId(id);
    }
}
