package projetjava.BackendBlackjack.service;

import jakarta.transaction.Transactional;
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

    // ✅ Méthode pour mettre à jour des statistiques avec flush et transaction
    @Transactional
    public StatistiquesJeu updateStatistiques(StatistiquesJeu statistiquesJeu) {
        StatistiquesJeu updatedStats = statistiquesJeuRepository.save(statistiquesJeu);
        statistiquesJeuRepository.flush(); // force la persistance en base
        return updatedStats;
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
