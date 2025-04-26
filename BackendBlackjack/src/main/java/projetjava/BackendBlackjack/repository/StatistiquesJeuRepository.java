package projetjava.BackendBlackjack.repository;

import projetjava.BackendBlackjack.model.StatistiquesJeu;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StatistiquesJeuRepository extends JpaRepository<StatistiquesJeu, Long> {
    Optional<StatistiquesJeu> findByUtilisateurId(Long utilisateurId);
}
