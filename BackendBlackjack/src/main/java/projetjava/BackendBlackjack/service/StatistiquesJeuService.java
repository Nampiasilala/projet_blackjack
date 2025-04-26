package projetjava.BackendBlackjack.service;

import projetjava.BackendBlackjack.model.StatistiquesJeu;
import projetjava.BackendBlackjack.repository.StatistiquesJeuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StatistiquesJeuService {

    @Autowired
    private StatistiquesJeuRepository statistiquesJeuRepository;

    public StatistiquesJeu creerStatistiques(StatistiquesJeu statistiquesJeu) {
        return statistiquesJeuRepository.save(statistiquesJeu);
    }

    public Optional<StatistiquesJeu> getStatistiquesParUtilisateurId(Long utilisateurId) {
        return statistiquesJeuRepository.findByUtilisateurId(utilisateurId);
    }

    public StatistiquesJeu updateStatistiques(StatistiquesJeu statistiquesJeu) {
        return statistiquesJeuRepository.save(statistiquesJeu);
    }

    public void deleteStatistiques(Long id) {
        statistiquesJeuRepository.deleteById(id);
    }
}
