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

    public StatistiquesJeu creerStatistiques(StatistiquesJeu statistiquesJeu) {
        return statistiquesJeuRepository.save(statistiquesJeu);
    }

    @Transactional
    public StatistiquesJeu updateStatistiques(StatistiquesJeu statistiquesJeu) {
        StatistiquesJeu updatedStats = statistiquesJeuRepository.save(statistiquesJeu);
        statistiquesJeuRepository.flush(); // force la persistance en base
        return updatedStats;
    }

    public void deleteStatistiques(Long id) {
        statistiquesJeuRepository.deleteById(id);
    }

    public Optional<StatistiquesJeu> getStatistiquesParUtilisateurId(Long id) {
        return statistiquesJeuRepository.findByUtilisateurId(id);
    }
}
